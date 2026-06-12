import { useEffect, useRef, useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  id?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Select({ id, value, options, onChange, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Chiude il menu quando si clicca fuori
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

  const choose = (option: SelectOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((i) => {
        let next = i;
        for (let step = 0; step < options.length; step++) {
          next = (next + dir + options.length) % options.length;
          if (!options[next].disabled) return next;
        }
        return i;
      });
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else if (activeIndex >= 0) {
        choose(options[activeIndex]);
      }
    }
  };

  return (
    <div className="select" ref={rootRef}>
      <button
        type="button"
        id={id}
        className={`select__trigger ${open ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          setActiveIndex(options.findIndex((o) => o.value === value));
        }}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? '' : 'select__placeholder'}>
          {selected ? selected.label : placeholder ?? 'Select…'}
        </span>
        <svg className="select__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="select__menu" role="listbox">
          {options.map((option, i) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={[
                'select__option',
                option.value === value ? 'is-selected' : '',
                i === activeIndex ? 'is-active' : '',
                option.disabled ? 'is-disabled' : '',
              ].join(' ')}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => choose(option)}
            >
              {option.label}
              {option.value === value && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
