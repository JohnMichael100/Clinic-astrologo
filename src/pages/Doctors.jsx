import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { doctors } from "../data";

export default function Doctors() {
  const doctor = doctors[0];

  return (
    <>
      <PageHeader
        title="Meet Dr. Astrologo"
        text="Your general surgeon and your direct point of contact throughout your care."
      />

      <section className="section">
        <div className="container doctor-profile">
          <Reveal className="doctor-profile-mark">
            <span className="doctor-feature-monogram">DA</span>
            <span className="badge">{doctor.specialty}</span>
          </Reveal>
          <Reveal className="doctor-profile-copy" delay={100}>
            <span className="eyebrow">Your surgeon</span>
            <h2>{doctor.name}</h2>
            <p className="lead">{doctor.bio}</p>
            <p>
              At your visit, you can talk through your symptoms, medical history, and
              questions directly with Dr. Astrologo. The goal is to help you understand
              your options and make informed decisions about your care.
            </p>
            <ul className="check-list">
              <li><Icon name="check" /> Direct, one-on-one consultation</li>
              <li><Icon name="check" /> Clear explanation of possible options</li>
              <li><Icon name="check" /> Personal follow-up plan</li>
            </ul>
            <Link to="/appointment" className="btn btn-primary">
              Book a consultation <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <Reveal>
            <h2>Have a concern you’d like to discuss?</h2>
            <p>Arrange a one-on-one consultation with Dr. Astrologo.</p>
            <Link to="/appointment" className="btn btn-light">
              Book a consultation <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
