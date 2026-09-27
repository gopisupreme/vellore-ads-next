/**
 * A white box with a navy title bar, as the PHP admin pages' panels
 * ("Overview", "Top Listing Details"). `actions` sit at the right of the title.
 */
export default function Card({ title, actions, children, className = '', bodyClassName = 'p-5' }) {
  return (
    <section className={`overflow-hidden rounded bg-white shadow-[0_2px_4px_rgba(224,224,224,.8)] ring-1 ring-[#dadada] ${className}`}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-4 bg-navy-800 px-4 py-4">
          {title && <h2 className="font-heading text-lg font-bold text-white">{title}</h2>}
          {actions}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
