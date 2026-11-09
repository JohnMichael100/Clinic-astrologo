import { Link } from "react-router-dom";
import Icon from "./Icon";
import { clinic, hours } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo logo-light">
            <span className="logo-mark">
              <Icon name="plus" size={18} />
            </span>
            <span className="logo-name">{clinic.name}<small>{clinic.practice}</small></span>
          </div>
          <p className="footer-text">
            Personal general surgery consultations and follow-up care with Dr. Astrologo.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul className="footer-list">
            <li><Link to="/about">About the practice</Link></li>
            <li><Link to="/services">Surgical care</Link></li>
            <li><Link to="/doctors">Dr. Astrologo</Link></li>
            <li><Link to="/appointment">Book a consultation</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Opening Hours</h4>
          <ul className="footer-list">
            {hours.map((h) => (
              <li key={h.day}>
                <span>{h.day}</span>
                <br />
                {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-list">
            <li>{clinic.address}</li>
            <li>{clinic.city}</li>
            <li>{clinic.phone}</li>
            <li>{clinic.email}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
          <span>In an emergency, call your local emergency number.</span>
        </div>
      </div>
    </footer>
  );
}
