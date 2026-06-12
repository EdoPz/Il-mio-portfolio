import { useMemo, useState } from 'react';
import { allAreas, DESK_TYPE_LABELS, locations } from '../data/locations';
import type { DeskType } from '../types';
import LocationCard from '../components/LocationCard';
import Select from '../components/Select';

type SortKey = 'rating' | 'price';

export default function Explore() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('all');
  const [deskType, setDeskType] = useState<'all' | DeskType>('all');
  const [sort, setSort] = useState<SortKey>('rating');

  const areas = useMemo(() => allAreas(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = locations.filter((loc) => {
      const matchesQuery =
        !q ||
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q);
      const matchesArea = area === 'all' || loc.city === area;
      const matchesDesk =
        deskType === 'all' || loc.desks.some((d) => d.type === deskType);
      return matchesQuery && matchesArea && matchesDesk;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      const aMin = Math.min(...a.desks.map((d) => d.pricePerDay));
      const bMin = Math.min(...b.desks.map((d) => d.pricePerDay));
      return aMin - bMin;
    });
  }, [query, area, deskType, sort]);

  const resetFilters = () => {
    setQuery('');
    setArea('all');
    setDeskType('all');
    setSort('rating');
  };

  return (
    <section className="section container">
      <div className="section__head">
        <h1>Explore locations</h1>
        <p>Filter by area and desk type to find the perfect space in Tokyo.</p>
      </div>

      <div className="filters card">
        <div className="filters__field filters__field--grow">
          <label htmlFor="q">Search</label>
          <input
            id="q"
            type="search"
            placeholder="Name, area or address…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="filters__field">
          <label htmlFor="area">Area</label>
          <Select
            id="area"
            value={area}
            onChange={setArea}
            options={[
              { value: 'all', label: 'All areas' },
              ...areas.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>

        <div className="filters__field">
          <label htmlFor="desk">Desk type</label>
          <Select
            id="desk"
            value={deskType}
            onChange={(v) => setDeskType(v as 'all' | DeskType)}
            options={[
              { value: 'all', label: 'All types' },
              ...(Object.keys(DESK_TYPE_LABELS) as DeskType[]).map((t) => ({
                value: t,
                label: DESK_TYPE_LABELS[t],
              })),
            ]}
          />
        </div>

        <div className="filters__field">
          <label htmlFor="sort">Sort by</label>
          <Select
            id="sort"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={[
              { value: 'rating', label: 'Rating' },
              { value: 'price', label: 'Price (low to high)' },
            ]}
          />
        </div>
      </div>

      <div className="results-bar">
        <span>
          <strong>{results.length}</strong>{' '}
          {results.length === 1 ? 'location found' : 'locations found'}
        </span>
        <button className="btn btn--text" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      {results.length > 0 ? (
        <div className="grid grid--cards">
          {results.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <h3>No location matches your filters</h3>
          <p>Try widening your search or resetting the filters.</p>
          <button className="btn btn--primary" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
