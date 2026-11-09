// Label + input wrapper with an inline error message, shared by both forms.
export default function Field({ label, name, error, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
