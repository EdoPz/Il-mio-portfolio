import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import logoFull from '../assets/logos/Logo Full.svg';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/locations', label: 'Explore', end: false },
  { to: '/booking', label: 'Booking', end: false },
  { to: '/my-bookings', label: 'My Bookings', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const requestsCount = useBookingStore((s) => s.requests.length);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logoFull} alt="Kobo Space" className="navbar__logo-img" />
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
              {l.to === '/my-bookings' && requestsCount > 0 && (
                <span className="navbar__badge">{requestsCount}</span>
              )}
            </NavLink>
          ))}
          <Link
            to="/booking"
            className="btn btn--primary navbar__cta"
            onClick={() => setOpen(false)}
          >
            Book now
          </Link>
        </nav>
      </div>
    </header>
  );
}
