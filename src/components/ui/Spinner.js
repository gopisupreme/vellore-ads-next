/** A spinning circle; `label` is read out by screen readers. */
export default function Spinner({ className = 'size-5', label = 'Loading' }) {
  return (
    <span role="status" className="inline-flex">
      <span className={`animate-spin rounded-full border-2 border-current border-r-transparent ${className}`} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
