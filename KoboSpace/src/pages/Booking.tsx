import { useNavigate } from 'react-router-dom';
import { DESK_TYPE_LABELS, formatPrice, getLocationById, locations } from '../data/locations';
import { useBookingStore } from '../store/useBookingStore';
import type { DeskType } from '../types';
import Select from '../components/Select';
import DatePicker from '../components/DatePicker';

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function Booking() {
  const navigate = useNavigate();

  const locationId = useBookingStore((s) => s.locationId);
  const deskType = useBookingStore((s) => s.deskType);
  const date = useBookingStore((s) => s.date);
  const seats = useBookingStore((s) => s.seats);

  const setLocation = useBookingStore((s) => s.setLocation);
  const setDeskType = useBookingStore((s) => s.setDeskType);
  const setDate = useBookingStore((s) => s.setDate);
  const setSeats = useBookingStore((s) => s.setSeats);

  const selectedLocation = locationId ? getLocationById(locationId) : undefined;
  const availableDesks = selectedLocation?.desks ?? [];
  const selectedDesk = availableDesks.find((d) => d.type === deskType);

  const canContinue = Boolean(locationId && deskType && date);
  const estimate = selectedDesk ? selectedDesk.pricePerDay * seats : 0;

  const onLocationChange = (id: string) => {
    setLocation(id);
    // If the chosen desk type is not offered at the new location, clear it
    const loc = getLocationById(id);
    if (deskType && !loc?.desks.some((d) => d.type === deskType)) {
      setDeskType('' as DeskType);
    }
  };

  return (
    <section className="section container booking-page">
      <div className="section__head">
        <span className="badge">Step 1 of 2</span>
        <h1>Set up your booking</h1>
        <p>Select a location, a date and a desk type.</p>
      </div>

      <div className="booking-grid">
        <div className="booking-form card">
          <div className="form-field">
            <label htmlFor="location">Location</label>
            <Select
              id="location"
              value={locationId ?? ''}
              onChange={onLocationChange}
              placeholder="Choose a location…"
              options={locations.map((loc) => ({
                value: loc.id,
                label: `${loc.name} — ${loc.city}`,
              }))}
            />
          </div>

          <div className="form-field">
            <label htmlFor="date">Date</label>
            <DatePicker
              id="date"
              value={date}
              min={todayISO()}
              onChange={setDate}
            />
          </div>

          <div className="form-field">
            <label>Desk type</label>
            {selectedLocation ? (
              <div className="desk-options">
                {availableDesks.map((desk) => (
                  <button
                    key={desk.type}
                    type="button"
                    className={`desk-option ${deskType === desk.type ? 'is-selected' : ''}`}
                    disabled={desk.available === 0}
                    onClick={() => setDeskType(desk.type)}
                  >
                    <span className="desk-option__title">{desk.label}</span>
                    <span className="desk-option__price">{formatPrice(desk.pricePerDay)}/day</span>
                    <span className="desk-option__avail">
                      {desk.available > 0 ? `${desk.available} free` : 'Sold out'}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="hint">Select a location first to see the available desks.</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="seats">Number of desks</label>
            <div className="stepper">
              <button
                type="button"
                onClick={() => setSeats(seats - 1)}
                disabled={seats <= 1}
                aria-label="Decrease"
              >
                −
              </button>
              <input
                id="seats"
                type="number"
                min={1}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value) || 1)}
              />
              <button
                type="button"
                onClick={() => setSeats(seats + 1)}
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <aside className="booking-summary card">
          <h3>Summary</h3>
          <dl className="summary-list">
            <div>
              <dt>Location</dt>
              <dd>{selectedLocation ? selectedLocation.name : '—'}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{selectedLocation ? selectedLocation.city : '—'}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>
                {date
                  ? new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })
                  : '—'}
              </dd>
            </div>
            <div>
              <dt>Desk</dt>
              <dd>{deskType ? DESK_TYPE_LABELS[deskType] : '—'}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{seats}</dd>
            </div>
          </dl>

          <div className="summary-total">
            <span>Daily estimate</span>
            <strong>{formatPrice(estimate)}</strong>
          </div>

          <button
            className="btn btn--primary btn--lg btn--block"
            disabled={!canContinue}
            onClick={() => navigate('/request')}
          >
            Continue
          </button>
          {!canContinue && (
            <p className="hint hint--center">
              Fill in location, date and desk to continue.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
