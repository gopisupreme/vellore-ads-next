import { Carousel, SafeImage } from '@/components/site/ui';

/**
 * A row of square pictures with a caption under each, opening another
 * website (streaming apps, theatres, attractions ...).
 */
export default function IconRow({ label, items, imageClassName = 'aspect-square rounded-md', captionClassName = 'text-[13px]' }) {
  return (
    <Carousel label={label} trackClassName="gap-[40px]">
      {items.map((item) => (
        <a
          key={item.key ?? item.label}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          title={item.label}
          className="group w-[91px] shrink-0 snap-start text-center"
        >
          <SafeImage src={item.image} alt="" className={`w-full object-cover shadow-sm transition group-hover:brightness-110 ${imageClassName}`} />
          <span className={`mt-1 block text-ink-body ${captionClassName}`}>{item.label}</span>
        </a>
      ))}
    </Carousel>
  );
}
