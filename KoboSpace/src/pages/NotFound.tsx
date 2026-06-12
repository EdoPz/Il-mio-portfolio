import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section container">
      <div className="empty-state card not-found">
        <span className="not-found__code">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn btn--primary btn--lg">
          Back to home
        </Link>
      </div>
    </section>
  );
}
