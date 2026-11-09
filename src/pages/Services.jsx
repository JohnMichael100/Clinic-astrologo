import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { services, faqs } from "../data";

const steps = [
  { n: "01", title: "Book", text: "Choose a time for a one-on-one consultation." },
  { n: "02", title: "Talk it through", text: "Discuss your concerns and questions with Dr. Astrologo." },
  { n: "03", title: "Plan next steps", text: "Understand your options and agree on a follow-up plan." },
];

// One expandable question. Only one is open at a time (controlled by the parent).
function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={open}>
        {item.q}
        <Icon name="chevron" />
      </button>
      <div className="faq-body">
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHeader
        title="General surgery care"
        text="Personal consultations, clear guidance, and follow-up care with Dr. Astrologo."
      />

      {/* Service list */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 100}>
                <article className="card service-card">
                  <div className="icon-box"><Icon name={s.icon} size={26} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul className="check-list small">
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" size={16} /> {p}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">How it works</span>
            <h2>A clear path, one step at a time</h2>
          </Reveal>
          <div className="grid grid-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="step">
                  <span className="step-number">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container narrow">
          <Reveal className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions</h2>
          </Reveal>
          <Reveal>
            <div className="faq">
              {faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  item={f}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <Reveal>
            <h2>Not sure which service you need?</h2>
            <p>Talk through your concerns and find out what next steps may be right for you.</p>
            <Link to="/contact" className="btn btn-light">
              Contact us <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
