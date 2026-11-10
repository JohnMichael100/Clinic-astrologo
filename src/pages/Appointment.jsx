import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";
import Icon from "../components/Icon";
import { services, timeSlots, hours, clinic, consultationFee, paymentCurrency } from "../data";

const initial = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  service: "",
  firstVisit: "",
  reason: "",
  symptomDuration: "",
  symptomLocation: "",
  painLevel: "",
  medicalHistory: "",
  medications: "",
  allergies: "",
  paymentMethod: "",
};

const maxAttachments = 5;
const maxFileSize = 8 * 1024 * 1024;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const paymentLabels = {
  gcash: "GCash",
  bank: "Bank transfer",
  clinic: "Pay at the clinic",
};
const formatCurrency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: paymentCurrency,
  maximumFractionDigits: 2,
});

// Today's date in local time (YYYY-MM-DD), used as the minimum selectable date.
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

function AttachmentPreview({ attachment, onRemove }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(attachment.file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [attachment.file]);

  return (
    <li className="attachment-item">
      {previewUrl && <img src={previewUrl} alt={`Preview of ${attachment.file.name}`} />}
      <span title={attachment.file.name}>{attachment.file.name}</span>
      <button type="button" className="attachment-remove" onClick={onRemove} aria-label={`Remove ${attachment.file.name}`}>
        <Icon name="close" size={17} />
      </button>
    </li>
  );
}

export default function Appointment() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [stage, setStage] = useState("intake");
  const [paymentAcknowledged, setPaymentAcknowledged] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addAttachments = (files) => {
    const incoming = Array.from(files);
    if (!incoming.length) return;

    const availableSlots = maxAttachments - attachments.length;
    const accepted = [];
    const rejected = [];

    incoming.forEach((file) => {
      if (!allowedImageTypes.includes(file.type)) {
        rejected.push(`${file.name}: use a JPG, PNG, or WEBP image.`);
      } else if (file.size > maxFileSize) {
        rejected.push(`${file.name}: maximum file size is 8 MB.`);
      } else if (accepted.length >= availableSlots) {
        rejected.push(`${file.name}: you can attach up to ${maxAttachments} images.`);
      } else {
        accepted.push({ id: `${Date.now()}-${Math.random()}`, file });
      }
    });

    if (accepted.length) setAttachments((current) => [...current, ...accepted]);
    setAttachmentError(rejected.join(" "));
  };

  const validate = () => {
    const found = {};
    if (!form.name.trim()) found.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = "Please enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) found.phone = "Please enter a valid phone number.";
    if (!form.service) found.service = "Please choose a consultation type.";
    if (!form.date) found.date = "Please choose a preferred date.";
    if (!form.time) found.time = "Please choose a preferred time.";
    if (!form.reason.trim()) found.reason = "Please tell us what you would like to discuss.";
    if (!form.paymentMethod) found.paymentMethod = "Please select a payment method.";
    return found;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length === 0) setStage("receipt");
  };

  const pasteImages = (ev) => {
    const items = Array.from(ev.clipboardData?.items || []);
    const images = items
      .filter((item) => item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter(Boolean);

    if (images.length) {
      ev.preventDefault();
      addAttachments(images);
    }
  };

  return (
    <>
      <PageHeader
        title="Book a consultation"
        text="Share a little about your health concern so Dr. Astrologo can prepare for your visit."
      />

      <section className="section">
        <div className="container form-layout">
          {stage === "confirmed" ? (
            <div className="success-card intake-success">
              <div className="success-icon"><Icon name="check" size={32} /></div>
              <span className="eyebrow">Demo checkout</span>
              <h2>Payment details confirmed</h2>
              <p>
                Your selected method is {paymentLabels[form.paymentMethod]} for{" "}
                {formatCurrency.format(consultationFee)}. This demo does not connect to GCash
                or a bank, and no payment was charged. Contact the practice for official
                payment instructions and appointment confirmation.
              </p>
              <Link to="/contact" className="btn btn-primary">Contact the practice</Link>
              <p className="form-disclaimer">
                Your consultation details and attached images were not sent or saved.
              </p>
            </div>
          ) : stage === "receipt" ? (
            <section className="form-card payment-receipt" aria-labelledby="receipt-title">
              <div className="receipt-heading">
                <span className="eyebrow">Demo checkout · Review before confirming</span>
                <h2 id="receipt-title">Payment summary</h2>
                <p>Check the fixed consultation fee and your selected payment method.</p>
              </div>
              <div className="receipt-paper">
                <div className="receipt-brand">
                  <span>{clinic.name}</span>
                  <small>General Surgery Consultation</small>
                </div>
                <div className="receipt-meta">
                  <span>Patient<strong>{form.name}</strong></span>
                  <span>Preferred visit<strong>{form.date} · {form.time}</strong></span>
                  <span>Payment method<strong>{paymentLabels[form.paymentMethod]}</strong></span>
                </div>
                <div className="receipt-lines">
                  <div><span>{form.service}</span><strong>{formatCurrency.format(consultationFee)}</strong></div>
                  <div><span>Additional charges</span><strong>{formatCurrency.format(0)}</strong></div>
                </div>
                <div className="receipt-total">
                  <span>Total due</span>
                  <strong>{formatCurrency.format(consultationFee)}</strong>
                </div>
                <p className="receipt-reference">Fixed consultation fee · Currency: Philippine peso (PHP)</p>
              </div>
              <div className="demo-payment-alert">
                <strong>Demo only — online payment is not connected.</strong>
                <span>No GCash or bank transaction will be started, and confirming below will not charge you.</span>
              </div>
              <label className="payment-confirmation">
                <input
                  type="checkbox"
                  checked={paymentAcknowledged}
                  onChange={(ev) => setPaymentAcknowledged(ev.target.checked)}
                />
                <span>I confirm the {formatCurrency.format(consultationFee)} total and selected payment method are correct.</span>
              </label>
              <div className="receipt-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStage("intake")}>
                  Edit consultation
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!paymentAcknowledged}
                  onClick={() => setStage("confirmed")}
                >
                  Confirm payment details <Icon name="arrow" />
                </button>
              </div>
            </section>
          ) : (
            <form className="form-card intake-form" onSubmit={submit} noValidate>
              <div className="intake-intro">
                <span className="eyebrow">Consultation request</span>
                <h2>Help us prepare for your visit</h2>
                <p>Fields marked required help us follow up about your request.</p>
              </div>

              <fieldset className="intake-section">
                <legend><span>01</span> Your details</legend>
                <div className="form-grid">
                  <Field label="Full name *" name="name" error={errors.name}>
                    <input id="name" name="name" value={form.name} onChange={change} autoComplete="name" required />
                  </Field>
                  <Field label="Email *" name="email" error={errors.email}>
                    <input id="email" name="email" type="email" value={form.email} onChange={change} autoComplete="email" required />
                  </Field>
                  <Field label="Phone *" name="phone" error={errors.phone}>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" required />
                  </Field>
                  <Field label="Is this your first visit?" name="firstVisit">
                    <select id="firstVisit" name="firstVisit" value={form.firstVisit} onChange={change}>
                      <option value="">Select an answer</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </Field>
                </div>
              </fieldset>

              <fieldset className="intake-section">
                <legend><span>02</span> About your concern</legend>
                <div className="form-grid">
                  <Field label="Consultation type *" name="service" error={errors.service}>
                    <select id="service" name="service" value={form.service} onChange={change} required>
                      <option value="">Select a consultation type</option>
                      {services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                    </select>
                  </Field>
                  <Field label="How long have you had this concern?" name="symptomDuration">
                    <input id="symptomDuration" name="symptomDuration" value={form.symptomDuration} onChange={change} placeholder="For example, 2 days or 3 weeks" />
                  </Field>
                  <Field label="Where is the concern located?" name="symptomLocation">
                    <input id="symptomLocation" name="symptomLocation" value={form.symptomLocation} onChange={change} placeholder="Optional" />
                  </Field>
                  <Field label="Pain level (0 = none, 10 = worst)" name="painLevel">
                    <select id="painLevel" name="painLevel" value={form.painLevel} onChange={change}>
                      <option value="">Select if relevant</option>
                      {Array.from({ length: 11 }, (_, level) => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="What would you like the doctor to know? *" name="reason" error={errors.reason}>
                  <textarea id="reason" name="reason" rows="4" value={form.reason} onChange={change} placeholder="Describe your concern, when it began, and what you would like help with." required />
                </Field>
              </fieldset>

              <fieldset className="intake-section">
                <legend><span>03</span> Health background</legend>
                <Field label="Relevant medical conditions or previous surgeries" name="medicalHistory">
                  <textarea id="medicalHistory" name="medicalHistory" rows="3" value={form.medicalHistory} onChange={change} placeholder="Include anything you think may be relevant (optional)." />
                </Field>
                <div className="form-grid">
                  <Field label="Current medications" name="medications">
                    <textarea id="medications" name="medications" rows="3" value={form.medications} onChange={change} placeholder="Names and doses, if known (optional)." />
                  </Field>
                  <Field label="Allergies or medication reactions" name="allergies">
                    <textarea id="allergies" name="allergies" rows="3" value={form.allergies} onChange={change} placeholder="List any known allergies (optional)." />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="intake-section">
                <legend><span>04</span> Attach images (optional)</legend>
                <p className="section-help">
                  Add photos of relevant documents or your concern. Avoid including unrelated personal information.
                  JPG, PNG, or WEBP only; up to 5 images, 8 MB each.
                </p>
                <label
                  className="upload-zone"
                  htmlFor="attachments"
                  tabIndex={0}
                  onPaste={pasteImages}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      document.getElementById("attachments")?.click();
                    }
                  }}
                  onDragOver={(ev) => ev.preventDefault()}
                  onDrop={(ev) => {
                    ev.preventDefault();
                    addAttachments(ev.dataTransfer.files);
                  }}
                >
                  <input
                    id="attachments"
                    className="visually-hidden"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={(ev) => {
                      addAttachments(ev.target.files);
                      ev.target.value = "";
                    }}
                  />
                  <span className="upload-icon"><Icon name="plus" size={22} /></span>
                  <strong>Choose images, drag them here, or paste</strong>
                  <span>Click here first, then press Ctrl+V to paste an image.</span>
                </label>
                {attachmentError && <p className="upload-error" role="alert">{attachmentError}</p>}
                {attachments.length > 0 && (
                  <ul className="attachment-list" aria-label="Attached images">
                    {attachments.map((attachment) => (
                      <AttachmentPreview
                        key={attachment.id}
                        attachment={attachment}
                        onRemove={() => setAttachments((current) => current.filter((item) => item.id !== attachment.id))}
                      />
                    ))}
                  </ul>
                )}
                <p className="privacy-note">
                  For your privacy, attachments stay in this page only and are not uploaded or saved.
                </p>
              </fieldset>

              <fieldset className="intake-section">
                <legend><span>05</span> Preferred appointment</legend>
                <div className="form-grid">
                  <Field label="Preferred date *" name="date" error={errors.date}>
                    <input id="date" name="date" type="date" min={today} value={form.date} onChange={change} required />
                  </Field>
                  <Field label="Preferred time *" name="time" error={errors.time}>
                    <select id="time" name="time" value={form.time} onChange={change} required>
                      <option value="">Select a time</option>
                      {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
                    </select>
                  </Field>
                </div>
              </fieldset>

              <fieldset className="intake-section payment-section">
                <legend><span>06</span> Payment method</legend>
                <p className="section-help">
                  Fixed consultation fee: <strong>{formatCurrency.format(consultationFee)}</strong>. Choose your preferred method; you will review the receipt before confirming.
                </p>
                <div className="payment-options">
                  {[
                    { value: "gcash", title: "GCash", detail: "Pay using GCash" },
                    { value: "bank", title: "Bank transfer", detail: "Pay by bank transfer" },
                    { value: "clinic", title: "Pay at the clinic", detail: "Arrange payment in person" },
                  ].map((option) => (
                    <label className={`payment-option ${form.paymentMethod === option.value ? "selected" : ""}`} key={option.value}>
                      <input type="radio" name="paymentMethod" value={option.value} checked={form.paymentMethod === option.value} onChange={change} aria-invalid={Boolean(errors.paymentMethod)} />
                      <span className="payment-radio" />
                      <span><strong>{option.title}</strong><small>{option.detail}</small></span>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="error-text" role="alert">{errors.paymentMethod}</p>}
                <p className="payment-notice">Never share your PIN, password, or one-time code. The next step shows an itemized receipt and asks you to confirm the amount.</p>
              </fieldset>

              <p className="urgent-note">
                This form is not for urgent medical problems. If you may be experiencing a medical emergency, call your local emergency number now.
              </p>
              <button type="submit" className="btn btn-primary">
                Review payment breakdown <Icon name="arrow" />
              </button>
              <p className="form-disclaimer">
                Demo checkout only: this website does not submit or store this form or process payment.
              </p>
            </form>
          )}

          <aside className="side-info">
            <div className="panel">
              <h3>Practice hours</h3>
              <ul className="hours-list">
                {hours.map((h) => (
                  <li key={h.day}><span>{h.day}</span><strong>{h.time}</strong></li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Need help booking?</h3>
              <p>Contact the practice and we will help arrange your visit.</p>
              <p className="side-phone"><Icon name="phone" /> {clinic.phone}</p>
            </div>
            <div className="panel">
              <h3>Useful to bring</h3>
              <ul className="check-list small">
                <li><Icon name="check" size={16} /> Photo ID</li>
                <li><Icon name="check" size={16} /> Current medication list</li>
                <li><Icon name="check" size={16} /> Relevant reports or images</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
