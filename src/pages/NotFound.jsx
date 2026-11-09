import { Link } from "react-router-dom";

// Shown for any URL that does not match a route.
export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <span className="eyebrow">Error 404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Return home</Link>
      </div>
    </section>
  );
}
