import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { locations } from '../data/locations';
import LocationCard from '../components/LocationCard';
import heroHome from '../assets/locations/hero-home.webp';

interface Feature {
  icon: ReactNode;
  title: string;
  text: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Gigabit internet',
    text: 'Dedicated fibre in every location, with a private network for teams.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" strokeLinejoin="round" />
        <path d="M17 9h2a2.5 2.5 0 0 1 0 5h-2M7 3v2M11 3v2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Unlimited coffee',
    text: 'Espresso, filter and tea, all day. The best breaks start right here.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Book in one minute',
    text: 'Pick a location, a date and a desk. Confirm and you are ready to go.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Active community',
    text: 'Events, workshops and meetups to help your network grow.',
  },
];

export default function Home() {
  const featured = locations.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="badge">Coworking across Tokyo</span>
            <h1>
              The right place to <span className="text-accent">do your best work</span>,
              anywhere in the city.
            </h1>
            <p className="hero__lead">
              Kobo Space is the coworking network where a desk, an office or a meeting room is
              always one click away. Flexible, refined, made to measure.
            </p>
            <div className="hero__actions">
              <Link to="/locations" className="btn btn--primary btn--lg">
                Explore locations
              </Link>
              <Link to="/booking" className="btn btn--ghost btn--lg">
                Book a desk
              </Link>
            </div>
            <dl className="hero__stats">
              <div>
                <dt>6</dt>
                <dd>Locations</dd>
              </div>
              <div>
                <dt>1,200+</dt>
                <dd>Desks</dd>
              </div>
              <div>
                <dt>4.7★</dt>
                <dd>Satisfaction</dd>
              </div>
            </dl>
          </div>
          <div className="hero__media">
            <img src={heroHome} alt="Kobo Space coworking" />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <h2>Why Kobo Space</h2>
          <p>Everything included, nothing to worry about. You focus on the work, we handle the rest.</p>
        </div>
        <div className="grid grid--features">
          {features.map((f) => (
            <div key={f.title} className="card feature-card">
              <span className="feature-card__icon" aria-hidden>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section__head section__head--row">
          <div>
            <h2>Featured locations</h2>
            <p>The spaces our community loves most.</p>
          </div>
          <Link to="/locations" className="btn btn--ghost">
            View all locations
          </Link>
        </div>
        <div className="grid grid--cards">
          {featured.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="cta-banner">
          <div>
            <h2>Ready to get started?</h2>
            <p>Find the location nearest you and book your first trial day.</p>
          </div>
          <Link to="/booking" className="btn btn--primary btn--lg">
            Book now
          </Link>
        </div>
      </section>
    </>
  );
}
