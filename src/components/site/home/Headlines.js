/**
 * The scrolling "Headlines" bar above the banner, shown when the site turns
 * news on (companyinfo.blog = 1).
 */
export default function Headlines({ items, links }) {
  if (!items?.length) return null;
  return (
    <div className="flex items-center overflow-hidden bg-navy-900 text-sm text-white">
      <strong className="shrink-0 bg-[#e3342f] px-4 py-2 uppercase">Headlines</strong>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 px-4 hover:[animation-play-state:paused]">
          {/* twice, so the loop has no gap */}
          {[...items, ...items].map((h, i) => (
            <a key={`${h.id}-${i}`} aria-hidden={i >= items.length || undefined} tabIndex={i >= items.length ? -1 : undefined} href={links.page(`blog-content?id=${h.id}`)} className="whitespace-nowrap hover:underline">
              {h.category && <span className="mr-1 text-accent-400">{h.category}</span>}
              <strong>{h.title}</strong>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
