import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon";
import { clinic } from "../data";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Dr. Astrologo" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu state
  const [scrolled, setScrolled] = useState(false); // adds a shadow after scrolling

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={close}>
          <span className="logo-mark">
            <Icon name="plus" size={18} />
          </span>
          <span className="logo-name">{clinic.name}<small>{clinic.practice}</small></span>
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>

        <nav className={`nav ${open ? "open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="nav-link"
              onClick={close}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/appointment" className="btn btn-primary nav-cta" onClick={close}>
            Book a consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
