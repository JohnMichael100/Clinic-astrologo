import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";

const values = [
  { icon: "heart", title: "Listen first", text: "Understand your concerns, priorities, and what matters to you." },
  { icon: "shield", title: "Explain clearly", text: "Make the choices and next steps easier to understand." },
  { icon: "check", title: "Stay connected", text: "Keep your care personal from the first conversation through follow-up." },
];

export default function About() {
  return (
    <>
      <PageHeader
        title="About the practice"
        text="A personal general surgery practice led by Dr. Astrologo, built around clear conversations and thoughtful care."
      />

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">One doctor, personal care</span>
            <h2>Care should feel like a conversation.</h2>
            <p className="lead">
              Dr. Astrologo’s practice is designed to give you direct, personal attention
              when you have a surgical concern.
            </p>
            <p>
              Every visit starts by listening and understanding your health history.
              Together, you can review possible options, ask questions, and decide on
              appropriate next steps without feeling rushed.
            </p>
            <p>
              Whether you are seeking an initial consultation or follow-up care, the focus
              stays on clear information and a plan that makes sense for you.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="panel about-panel">
              <span className="eyebrow">Our promise</span>
              <h3>You’ll know who is caring for you.</h3>
              <ul className="check-list">
                <li><Icon name="check" /> One-on-one visits with Dr. Astrologo</li>
                <li><Icon name="check" /> Clear answers and open conversation</li>
                <li><Icon name="check" /> Thoughtful discussion of care options</li>
                <li><Icon name="check" /> Personal follow-up and next steps</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">The way we care</span>
            <h2>Guided by what matters to you</h2>
          </Reveal>
          <div className="grid grid-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="card center-card">
                  <div className="icon-box"><Icon name={value.icon} size={26} /></div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <Reveal>
            <h2>Start with a conversation.</h2>
            <p>Book a consultation and talk through your concerns with Dr. Astrologo.</p>
            <Link to="/appointment" className="btn btn-light">
              Book a consultation <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
