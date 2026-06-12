import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPrice, getLocationBySlug } from '../data/locations';
import { useBookingStore } from '../store/useBookingStore';
import type { DeskType } from '../types';

export default function LocationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = slug ? getLocationBySlug(slug) : undefined;

  const setLocation = useBookingStore((s) => s.setLocation);
  const setDeskType = useBookingStore((s) => s.setDeskType);

  if (!location) {
    return (
      <section className="section container">
        <div className="empty-state card">
          <h2>Location not found</h2>
          <p>The location you are looking for does not exist or has moved.</p>
          <Link to="/locations" className="btn btn--primary">
            Back to locations
          </Link>
        </div>
      </section>
    );
  }

  const startBooking = (deskType?: DeskType) => {
    setLocation(location.id);
    if (deskType) setDeskType(deskType);
    navigate('/booking');
  };

  return (
    <article>
      <section className="detail-hero">
        <div
          className="detail-hero__bg"
          style={{ backgroundImage: `url(${location.image})` }}
        />
        <div className="detail-hero__overlay">
          <div className="container detail-hero__content">
            <Link to="/locations" className="detail-hero__back">
              ← All locations
            </Link>
            <span className="badge">{location.city}</span>
            <h1>{location.name}</h1>
            <p className="detail-hero__meta">
              <span>★ {location.rating.toFixed(1)}</span>
              <span>{location.address}</span>
              <span>{location.openingHours}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section container detail-layout">
        <div className="detail-main">
          <h2>The space</h2>
          <p className="detail-description">{location.description}</p>

          <h3>Included services</h3>
          <div className="amenities-grid">
            {location.amenities.map((a) => (
              <span key={a} className="chip chip--lg">✓ {a}</span>
            ))}
          </div>

          <h3>Available desks and spaces</h3>
          <div className="desk-list">
            {location.desks.map((desk) => (
              <div key={desk.type} className="desk-row card">
                <div className="desk-row__info">
                  <div className="desk-row__head">
                    <h4>{desk.label}</h4>
                    <span
                      className={`pill ${desk.available > 0 ? 'pill--ok' : 'pill--off'}`}
                    >
                      {desk.available > 0
                        ? `${desk.available} available`
                        : 'Sold out'}
                    </span>
                  </div>
                  <p>{desk.description}</p>
                </div>
                <div className="desk-row__action">
                  <span className="desk-row__price">
                    <strong>{formatPrice(desk.pricePerDay)}</strong>/day
                  </span>
                  <button
                    className="btn btn--primary btn--sm"
                    disabled={desk.available === 0}
                    onClick={() => startBooking(desk.type)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="detail-aside">
          <div className="card booking-cta">
            <h3>Book in {location.city}</h3>
            <p>Choose a date and a desk type for this location.</p>
            <button
              className="btn btn--primary btn--lg btn--block"
              onClick={() => startBooking()}
            >
              Start your booking
            </button>
            <Link to="/contact" className="btn btn--ghost btn--block">
              Got questions? Contact us
            </Link>
            <ul className="booking-cta__list">
              <li>✓ Free cancellation up to 24h before</li>
              <li>✓ No hidden fees</li>
              <li>✓ Instant confirmation</li>
            </ul>
          </div>
        </aside>
      </section>
    </article>
  );
}
