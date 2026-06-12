import { Link } from 'react-router-dom';
import type { Location } from '../types';
import { formatPrice } from '../data/locations';

interface Props {
  location: Location;
}

export default function LocationCard({ location }: Props) {
  const fromPrice = Math.min(...location.desks.map((d) => d.pricePerDay));

  return (
    <article className="card location-card">
      <Link to={`/locations/${location.slug}`} className="location-card__media">
        <img src={location.image} alt={location.name} loading="lazy" />
        <span className="location-card__rating">★ {location.rating.toFixed(1)}</span>
      </Link>
      <div className="location-card__body">
        <span className="location-card__city">{location.city}</span>
        <h3>{location.name}</h3>
        <p>{location.shortDescription}</p>
        <div className="location-card__amenities">
          {location.amenities.slice(0, 3).map((a) => (
            <span key={a} className="chip">{a}</span>
          ))}
        </div>
        <div className="location-card__footer">
          <span className="location-card__price">
            from <strong>{formatPrice(fromPrice)}</strong>/day
          </span>
          <Link to={`/locations/${location.slug}`} className="btn btn--ghost btn--sm">
            Discover
          </Link>
        </div>
      </div>
    </article>
  );
}
