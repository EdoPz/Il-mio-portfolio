import { useState } from 'react';
import type { ReactNode } from 'react';

const faqs = [
  {
    q: 'Can I try before I subscribe?',
    a: 'Of course! We offer a free trial day at every location. Book it from the Booking page.',
  },
  {
    q: 'Are the opening hours flexible?',
    a: 'Members with a dedicated desk or private office get 24/7 access. Hot desks follow each location’s opening hours.',
  },
  {
    q: 'Can I cancel a booking?',
    a: 'Yes, cancellation is free up to 24 hours before the booked date.',
  },
  {
    q: 'Are pets allowed?',
    a: 'Small, well-behaved pets are welcome in the common areas.',
  },
];

interface Channel {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}

const channels: Channel[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@kobospace.tokyo',
    href: 'mailto:hello@kobospace.tokyo',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: 'Phone',
    value: '+81 3 1234 5678',
    href: 'tel:+81312345678',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 5h16v11H7l-3 3V5Z" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Live chat',
    value: 'Mon–Fri, 9:00–18:00',
    href: '#',
  },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <section className="section container">
      <div className="section__head">
        <span className="badge">We’re here for you</span>
        <h1>Contact &amp; Info</h1>
        <p>Need help or more information? Pick the channel that works best for you.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-channels">
          {channels.map((c) => (
            <a key={c.label} href={c.href} className="card contact-channel">
              <span className="contact-channel__icon" aria-hidden>{c.icon}</span>
              <div>
                <span className="contact-channel__label">{c.label}</span>
                <strong>{c.value}</strong>
              </div>
            </a>
          ))}

          <div className="card contact-hours">
            <h3>Support hours</h3>
            <ul>
              <li><span>Mon – Fri</span><span>9:00 – 18:00</span></li>
              <li><span>Saturday</span><span>10:00 – 14:00</span></li>
              <li><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>
        </div>

        <div className="card contact-form-card">
          <h3>Send us a message</h3>
          {sent ? (
            <div className="contact-sent">
              <div className="confirmation__check" aria-hidden>✓</div>
              <p>Message sent! We’ll get back to you shortly.</p>
              <button className="btn btn--ghost" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="form-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" type="text" required placeholder="Your name" />
              </div>
              <div className="form-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" required placeholder="Your email" />
              </div>
              <div className="form-field">
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" rows={5} required placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--block">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="section__head" style={{ marginTop: '4rem' }}>
        <h2>Frequently asked questions</h2>
      </div>
      <div className="faq">
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq__item card ${openFaq === i ? 'is-open' : ''}`}>
            <button
              className="faq__question"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
            >
              {f.q}
              <span className="faq__icon" aria-hidden>{openFaq === i ? '−' : '+'}</span>
            </button>
            {openFaq === i && <p className="faq__answer">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
