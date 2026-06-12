import { Link } from 'react-router-dom';
import { DESK_TYPE_LABELS, formatPrice, getLocationById } from '../data/locations';
import { useBookingStore } from '../store/useBookingStore';

export default function MyBookings() {
  const requests = useBookingStore((s) => s.requests);
  const removeRequest = useBookingStore((s) => s.removeRequest);
  const clearRequests = useBookingStore((s) => s.clearRequests);

  return (
    <section className="section container">
      <div className="section__head section__head--row">
        <div>
          <span className="badge">{requests.length} {requests.length === 1 ? 'request' : 'requests'}</span>
          <h1>My bookings</h1>
          <p>Every request you send is saved here on this device.</p>
        </div>
        {requests.length > 0 && (
          <button className="btn btn--text" onClick={clearRequests}>
            Clear all
          </button>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="empty-state card">
          <h3>No bookings yet</h3>
          <p>When you send a booking request, you’ll find it here.</p>
          <Link to="/booking" className="btn btn--primary">
            Start a booking
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {requests.map((r) => {
            const loc = r.locationId ? getLocationById(r.locationId) : undefined;
            return (
              <article key={r.id} className="card booking-item">
                {loc && (
                  <Link to={`/locations/${loc.slug}`} className="booking-item__media">
                    <img src={loc.image} alt={loc.name} loading="lazy" />
                  </Link>
                )}
                <div className="booking-item__body">
                  <div className="booking-item__top">
                    <div>
                      <span className="booking-item__code">#{r.id.slice(0, 8).toUpperCase()}</span>
                      <h3>{loc?.name ?? 'Location'}</h3>
                      <span className="booking-item__area">{loc?.city}</span>
                    </div>
                    <span className="pill pill--ok">Confirmed</span>
                  </div>

                  <dl className="booking-item__meta">
                    <div>
                      <dt>Date</dt>
                      <dd>
                        {r.date &&
                          new Date(r.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                      </dd>
                    </div>
                    <div>
                      <dt>Desk</dt>
                      <dd>{r.deskType ? DESK_TYPE_LABELS[r.deskType] : '—'} × {r.seats}</dd>
                    </div>
                    <div>
                      <dt>Booked by</dt>
                      <dd>{r.fullName}</dd>
                    </div>
                    <div>
                      <dt>Submitted</dt>
                      <dd>{new Date(r.submittedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
                    </div>
                  </dl>

                  <div className="booking-item__footer">
                    {loc && r.deskType && (
                      <span className="booking-item__price">
                        {formatPrice((loc.desks.find((d) => d.type === r.deskType)?.pricePerDay ?? 0) * r.seats)}
                        <span> / day</span>
                      </span>
                    )}
                    <button className="btn btn--ghost btn--sm" onClick={() => removeRequest(r.id)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
