/**
 * A section's heading and quote, as the PHP site's "com-title":
 * <SectionTitle title="Popular" highlight="Services" text="..." />
 */
export default function SectionTitle({ title, highlight, text, className = 'mb-10' }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="pb-[15px] font-heading text-[28px] font-bold text-ink capitalize md:text-[42px]">
        {title} {highlight && <span>{highlight}</span>}
      </h2>
      {text && <p className="text-base text-[#3d5469]">&quot;{text}&quot;</p>}
    </div>
  );
}
