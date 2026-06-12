import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DESK_TYPE_LABELS, getLocationById } from '../data/locations';
import { useBookingStore, type SubmittedRequest } from '../store/useBookingStore';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  privacy: boolean;
}

const emptyForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  notes: '',
  privacy: false,
};

export default function BookingRequest() {
  const navigate = useNavigate();

  const locationId = useBookingStore((s) => s.locationId);
  const deskType = useBookingStore((s) => s.deskType);
  const date = useBookingStore((s) => s.date);
  const seats = useBookingStore((s) => s.seats);
  const submitRequest = useBookingStore((s) => s.submitRequest);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [confirmation, setConfirmation] = useState<SubmittedRequest | null>(null);

  const location = locationId ? getLocationById(locationId) : undefined;
  const draftReady = Boolean(locationId && deskType && date);

  // Draft missing: send the user back to step 1
  if (!draftReady && !confirmation) {
    return (
      <section className="section container">
        <div className="empty-state card">
          <h2>A few details are missing</h2>
          <p>Please complete location, date and desk first to send your request.</p>
          <Link to="/booking" className="btn btn--primary">
            Go to booking
          </Link>
        </div>
      </section>
    );
  }

  if (confirmation) {
    const confLoc = getLocationById(confirmation.locationId!);
    return (
      <section className="section container">
        <div className="confirmation card">
          <div className="confirmation__check" aria-hidden>✓</div>
          <h1>Request sent!</h1>
          <p>
            Thanks {confirmation.fullName.split(' ')[0]}, we have received your request.
            We will reach out at <strong>{confirmation.email}</strong> to confirm.
          </p>
          <div className="confirmation__recap">
            <span>Code: <strong>{confirmation.id.slice(0, 8).toUpperCase()}</strong></span>
            <span>{confLoc?.name} — {confLoc?.city}</span>
            <span>
              {confirmation.date &&
                new Date(confirmation.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
            </span>
            <span>
              {DESK_TYPE_LABELS[confirmation.deskType!]} × {confirmation.seats}
            </span>
          </div>
          <div className="confirmation__actions">
            <Link to="/my-bookings" className="btn btn--ghost">View my bookings</Link>
            <Link to="/locations" className="btn btn--primary">Explore more locations</Link>
          </div>
        </div>
      </section>
    );
  }

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Invalid email address';
    if (!form.phone.trim()) next.phone = 'Please enter a phone number';
    if (!form.privacy) next.privacy = 'You must accept the privacy policy';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = submitRequest({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      notes: form.notes.trim(),
    });

    if (result) setConfirmation(result);
  };

  return (
    <section className="section container booking-page">
      <div className="section__head">
        <span className="badge">Step 2 of 2</span>
        <h1>Send your booking request</h1>
        <p>Leave your details: we will confirm availability within a few hours.</p>
      </div>

      <div className="booking-grid">
        <form className="booking-form card" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="fullName">Full name *</label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              className={errors.fullName ? 'has-error' : ''}
              placeholder="John Smith"
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={errors.email ? 'has-error' : ''}
                placeholder="john@company.com"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone *</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={errors.phone ? 'has-error' : ''}
                placeholder="+81 90 1234 5678"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="company">Company (optional)</label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Company name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Special requirements, hours, equipment…"
            />
          </div>

          <div className="form-field">
            <label className={`checkbox ${errors.privacy ? 'has-error' : ''}`}>
              <input
                type="checkbox"
                className="checkbox__input"
                checked={form.privacy}
                onChange={(e) => update('privacy', e.target.checked)}
              />
              <span className="checkbox__box" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="checkbox__label">
                I accept the processing of my data under the privacy policy *
              </span>
            </label>
            {errors.privacy && <span className="field-error">{errors.privacy}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--ghost" onClick={() => navigate('/booking')}>
              ← Back
            </button>
            <button type="submit" className="btn btn--primary btn--lg">
              Send request
            </button>
          </div>
        </form>

        <aside className="booking-summary card">
          <h3>Your booking</h3>
          <dl className="summary-list">
            <div>
              <dt>Location</dt>
              <dd>{location?.name ?? '—'}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{location?.city ?? '—'}</dd>
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
          <Link to="/booking" className="btn btn--text btn--block">
            Edit details
          </Link>
        </aside>
      </div>
    </section>
  );
}
