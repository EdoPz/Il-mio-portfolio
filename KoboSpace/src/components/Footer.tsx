import { Link } from 'react-router-dom';
import { locations } from '../data/locations';
import logoWhite from '../assets/logos/Logo Full White.svg';

const socials = [
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h6.9l4.8 6.4L18.9 2Zm-2.4 18h1.9L7.6 3.9H5.6L16.5 20Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.5h3v12h-3v-12Zm5 0h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v7.32h-3v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43v6.61h-3v-12Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={logoWhite} alt="Kobo Space" className="footer__logo-img" />
          </Link>
          <p>Coworking spaces across Tokyo where ideas feel at home. Flexible desks, private offices and meeting rooms, one click away.</p>
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="footer__social">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Locations</h4>
          {locations.slice(0, 5).map((l) => (
            <Link key={l.id} to={`/locations/${l.slug}`}>{l.city}</Link>
          ))}
          <Link to="/locations" className="footer__more">All locations →</Link>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <Link to="/locations">Explore</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/my-bookings">My bookings</Link>
          <Link to="/contact">Contact &amp; Info</Link>
        </div>

        <div className="footer__col footer__col--wide">
          <h4>Stay in the loop</h4>
          <p>Events, new locations and member perks. No spam.</p>
          <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" aria-label="Email" required />
            <button type="submit" className="btn btn--primary btn--sm">Subscribe</button>
          </form>
          <div className="footer__contact">
            <a href="mailto:hello@kobospace.tokyo">hello@kobospace.tokyo</a>
            <a href="tel:+81312345678">+81 3 1234 5678</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Kobo Space — Demo</span>
        <div className="footer__legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
        <span className="footer__credit">made by EdoardoDev</span>
      </div>
    </footer>
  );
}
