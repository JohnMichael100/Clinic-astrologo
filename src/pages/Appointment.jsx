import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";
import Icon from "../components/Icon";
import { services, timeSlots, hours, clinic } from "../data";

const initial = { name: "", email: "", phone: "", service: "", date: "", time: "", notes: "" };

// Today's date in local time (YYYY-MM-DD), used as the minimum selectable date.
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

export default function Appointment() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Returns an object of error messages; empty means the form is valid.
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
    if (!form.service) e.service = "Please choose a service.";
    if (!form.date) e.date = "Please choose a date.";
    if (!form.time) e.time = "Please choose a time.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    // No backend is connected yet: send `form` to your API here.
    if (Object.keys(found).length === 0) setSent(true);
  };

  return (
    <>
      <PageHeader
        title="Book a consultation"
        text="Request a one-on-one visit with Dr. Astrologo to discuss your concerns and possible next steps."
      />

      <section className="section">
        <div className="container form-layout">
          {/* Form or confirmation message */}
          {sent ? (
            <div className="success-card">
              <div className="success-icon"><Icon name="check" size={32} /></div>
              <h2>Request received</h2>
              <p>
                Thank you, {form.name.split(" ")[0]}. Your request for{" "}
                {form.date} at {form.time} has been noted. The practice will contact you at{" "}
                {form.email} to confirm.
              </p>
              <Link to="/" className="btn btn-primary">Back to home</Link>
            </div>
          ) : (
            <form className="form-card" onSubmit={submit} noValidate>
              <h2>Appointment details</h2>
              <div className="form-grid">
                <Field label="Full name" name="name" error={errors.name}>
                  <input id="name" name="name" value={form.name} onChange={change} autoComplete="name" />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <input id="email" name="email" type="email" value={form.email} onChange={change} autoComplete="email" />
                </Field>
                <Field label="Phone" name="phone" error={errors.phone}>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" />
                </Field>
                <Field label="Service" name="service" error={errors.service}>
                  <select id="service" name="service" value={form.service} onChange={change}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </Field>
                <Field label="Date" name="date" error={errors.date}>
                  <input id="date" name="date" type="date" min={today} value={form.date} onChange={change} />
                </Field>
                <Field label="Time" name="time" error={errors.time}>
                  <select id="time" name="time" value={form.time} onChange={change}>
                    <option value="">Select a time</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Reason for visit (optional)" name="notes">
                <textarea id="notes" name="notes" rows="4" value={form.notes} onChange={change} />
              </Field>
              <button type="submit" className="btn btn-primary">
                Request appointment <Icon name="arrow" />
              </button>
            </form>
          )}

          {/* Side information */}
          <aside className="side-info">
            <div className="panel">
              <h3>Opening hours</h3>
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
              <h3>Please bring</h3>
              <ul className="check-list small">
                <li><Icon name="check" size={16} /> Photo ID</li>
                <li><Icon name="check" size={16} /> Insurance card</li>
                <li><Icon name="check" size={16} /> List of medications</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
