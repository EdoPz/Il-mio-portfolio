import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  id?: string;
  value: string | null; // ISO yyyy-mm-dd
  onChange: (iso: string) => void;
  min?: string; // ISO, earliest selectable day
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const parseISO = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export default function DatePicker({ id, value, onChange, min }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? parseISO(value) : null;
  const minDate = min ? parseISO(min) : null;

  const [viewMonth, setViewMonth] = useState(() => {
    const base = selectedDate ?? minDate ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const days = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    // Lunedì come primo giorno della settimana
    const offset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewMonth]);

  const isDisabled = (d: Date) => {
    if (!minDate) return false;
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const floor = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return day < floor;
  };

  const isSameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const today = new Date();

  const label = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Select a date…';

  return (
    <div className="datepicker" ref={rootRef}>
      <button
        type="button"
        id={id}
        className={`datepicker__trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="datepicker__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="1.5" />
          <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
        <span className={selectedDate ? '' : 'select__placeholder'}>{label}</span>
      </button>

      {open && (
        <div className="calendar">
          <div className="calendar__head">
            <button
              type="button"
              className="calendar__nav"
              aria-label="Previous month"
              onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
            >
              ‹
            </button>
            <strong>{MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}</strong>
            <button
              type="button"
              className="calendar__nav"
              aria-label="Next month"
              onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            >
              ›
            </button>
          </div>

          <div className="calendar__weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          <div className="calendar__grid">
            {days.map((d, i) => {
              if (!d) return <span key={`e${i}`} className="calendar__cell is-empty" />;
              const disabled = isDisabled(d);
              return (
                <button
                  key={toISO(d)}
                  type="button"
                  disabled={disabled}
                  className={[
                    'calendar__cell',
                    isSameDay(d, selectedDate) ? 'is-selected' : '',
                    isSameDay(d, today) ? 'is-today' : '',
                  ].join(' ')}
                  onClick={() => {
                    onChange(toISO(d));
                    setOpen(false);
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
