import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import { hours, services, doctors } from "../data";

const reasons = [
  { icon: "users", title: "Care from one doctor", text: "Build a familiar relationship with Dr. Astrologo from consultation through follow-up." },
  { icon: "clock", title: "Time to understand", text: "Talk through your concerns and get clear answers about possible next steps." },
  { icon: "shield", title: "A thoughtful plan", text: "Explore your options together, with care tailored to your needs." },
];

export default function Home() {
  const doctor = doctors[0];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-tag"><span className="status-dot" /> Personal general surgery care</span>
            <h1>Thoughtful care.<br /><em>One doctor,</em> by your side.</h1>
            <p>
              Meet Dr. Astrologo for clear, personal guidance at every step of your
              surgical care. Start with a conversation, leave with a plan.
            </p>
            <div className="hero-actions">
              <Link to="/appointment" className="btn btn-light">
                Book a consultation <Icon name="arrow" />
              </Link>
              <Link to="/services" className="btn btn-ghost">
                Explore care
              </Link>
            </div>
            <div className="hero-note">
              <span className="hero-note-mark"><Icon name="check" size={16} /></span>
              Personal care, directly with Dr. Astrologo
            </div>
          </div>

          <aside className="hero-card">
            <div className="hero-card-top">
              <span className="eyebrow">Your surgeon</span>
              <span className="doctor-seal"><Icon name="plus" size={18} /></span>
            </div>
            <div className="hero-doctor">
              <div className="avatar">DA</div>
              <div>
                <h2>{doctor.name}</h2>
                <p>{doctor.specialty}</p>
              </div>
            </div>
            <p className="hero-doctor-bio">{doctor.bio}</p>
            <div className="hero-card-divider" />
            <h3>Practice hours</h3>
            <ul>
              {hours.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <strong>{h.time}</strong>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="hero-card-link">
              Get in touch <Icon name="arrow" size={17} />
            </Link>
          </aside>
        </div>
        <div className="hero-watermark" aria-hidden="true">CARE, WITH CLARITY</div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><strong>One doctor</strong><span>Personal care throughout</span></div>
          <div><strong>General surgery</strong><span>Consultations and follow-up</span></div>
          <div><strong>Clear next steps</strong><span>Guidance shaped around you</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">How we can help</span>
            <h2>Surgical care, made more personal</h2>
            <p>Start with a conversation about what you need. Dr. Astrologo will help you understand your options and what comes next.</p>
          </Reveal>

          <div className="grid grid-4">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 80}>
                <article className="card service-card">
                  <div className="icon-box"><Icon name={service.icon} size={26} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="center-row">
            <Link to="/services" className="btn btn-outline">
              Explore services <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">A different kind of practice</span>
            <h2>Care that keeps you in the conversation</h2>
          </Reveal>
          <div className="grid grid-3">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 90}>
                <article className="reason">
                  <div className="icon-box icon-box-solid"><Icon name={reason.icon} size={24} /></div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container doctor-feature">
          <Reveal className="doctor-feature-mark">
            <span className="doctor-feature-monogram">DA</span>
            <span className="doctor-feature-caption">Your doctor, from the first visit</span>
          </Reveal>
          <Reveal className="doctor-feature-copy" delay={100}>
            <span className="eyebrow">Meet your surgeon</span>
            <h2>{doctor.name}</h2>
            <span className="badge">{doctor.specialty}</span>
            <p className="lead">{doctor.bio}</p>
            <Link to="/doctors" className="text-link">Get to know the practice <Icon name="arrow" size={18} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <Reveal>
            <span className="cta-kicker">Your next step starts here</span>
            <h2>Let’s talk about what’s right for you.</h2>
            <p>Book a consultation with Dr. Astrologo and get clear, personal guidance.</p>
            <Link to="/appointment" className="btn btn-light">
              Book a consultation <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
