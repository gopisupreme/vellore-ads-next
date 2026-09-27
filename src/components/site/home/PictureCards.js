import { Carousel, SafeImage } from '@/components/site/ui';

/** A sideways row of picture cards with a caption (attractions, other districts). */
export default function PictureCards({ label, items, cardClassName = 'basis-[170px]' }) {
  return (
    <Carousel label={label} arrows="blue" trackClassName="gap-5 px-1 py-2">
      {items.map((item) => {
        const body = (
          <>
            <SafeImage src={item.image} alt="" className="aspect-[170/150] w-full object-cover" />
            <span className="block truncate px-2 py-4 text-[13px] text-ink">{item.name}</span>
          </>
        );
        const card = `shrink-0 snap-start overflow-hidden rounded-md bg-white text-center shadow-[0_2px_6px_rgba(0,0,0,.18)] ${cardClassName}`;
        return item.url ? (
          <a key={item.key ?? item.name} href={item.url} target="_blank" rel="noreferrer" title={item.name} className={`${card} transition hover:shadow-[0_4px_12px_rgba(0,0,0,.22)]`}>
            {body}
          </a>
        ) : (
          <div key={item.key ?? item.name} className={card}>
            {body}
          </div>
        );
      })}
    </Carousel>
  );
}
