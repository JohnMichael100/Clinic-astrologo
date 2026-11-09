import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { clinic, hours } from "../data";

const initial = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    setErrors(e);
    // No backend is connected yet: send `form` to your API here.
    if (Object.keys(e).length === 0) setSent(true);
  };

  // Contact details shown as cards above the form.
  const details = [
    { icon: "pin", title: "Visit us", lines: [clinic.address, clinic.city] },
    { icon: "phone", title: "Call the practice", lines: [clinic.phone] },
    { icon: "mail", title: "Email us", lines: [clinic.email] },
  ];

  return (
    <>
      <PageHeader
        title="Contact the practice"
        text="Get in touch with Dr. Astrologo’s practice about appointments, services, or a question about your visit."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {details.map((d, i) => (
              <Reveal key={d.title} delay={i * 100}>
                <div className="card center-card">
                  <div className="icon-box"><Icon name={d.icon} size={26} /></div>
                  <h3>{d.title}</h3>
                  {d.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container form-layout">
          {sent ? (
            <div className="success-card">
              <div className="success-icon"><Icon name="check" size={32} /></div>
              <h2>Message sent</h2>
              <p>Thank you for reaching out. The practice will be in touch as soon as possible.</p>
            </div>
          ) : (
            <form className="form-card" onSubmit={submit} noValidate>
              <h2>Send a message</h2>
              <div className="form-grid">
                <Field label="Name" name="name" error={errors.name}>
                  <input id="name" name="name" value={form.name} onChange={change} autoComplete="name" />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <input id="email" name="email" type="email" value={form.email} onChange={change} autoComplete="email" />
                </Field>
              </div>
              <Field label="Subject (optional)" name="subject">
                <input id="subject" name="subject" value={form.subject} onChange={change} />
              </Field>
              <Field label="Message" name="message" error={errors.message}>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={change} />
              </Field>
              <button type="submit" className="btn btn-primary">
                Send message <Icon name="arrow" />
              </button>
            </form>
          )}

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
              <h3>Medical emergencies</h3>
              <p>
                This form is not monitored for urgent issues. In an emergency, call your
                local emergency number immediately.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
