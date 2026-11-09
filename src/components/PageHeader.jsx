import { Link } from "react-router-dom";

// Banner shown at the top of every inner page.
export default function PageHeader({ title, text }) {
  return (
    <section className="page-header">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/">Home</Link> / {title}
        </p>
        <h1>{title}</h1>
        <p className="page-header-text">{text}</p>
      </div>
    </section>
  );
}
