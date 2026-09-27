import { Icon } from '@/components/ui';
import { SafeImage } from '@/components/site/ui';

const DEFAULT_IMAGE = '/assets/images/placeholder.svg';

/**
 * A listing in a list: picture, name, category, address, rating and its
 * reviews / likes / views, with a share button (PHP site: home_list).
 */
export default function ListingCard({ listing, city, onShare }) {
  const stat = 'flex items-center justify-center gap-1.5 border border-line py-1 text-[11px] text-ink-soft';
  return (
    <article className="flex gap-4 bg-white p-[15px] shadow-[0_1px_6px_rgba(0,0,0,.08)] transition hover:shadow-[0_4px_14px_rgba(0,0,0,.12)] sm:gap-[30px]">
      <a href={listing.url} className="shrink-0" tabIndex={-1} aria-hidden="true">
        <SafeImage src={listing.image} fallback={DEFAULT_IMAGE} alt="" className="h-[116px] w-[103px] object-cover" />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <h3 className="min-w-0 flex-1 truncate font-heading text-xl font-bold text-ink">
            <a href={listing.url} title={`${listing.title} in ${city}`} className="hover:text-brand-600">
              {listing.title}
            </a>
          </h3>
          <span title="Average rating" className="rounded-[2px] bg-[#0bb53d] px-1 text-xs leading-5 font-semibold text-white">
            {listing.rating}
          </span>
        </div>
        <p className="truncate text-sm font-semibold text-ink">{listing.category}</p>
        <p className="mt-1.5 truncate text-[13px] text-ink-body" title={listing.address}>{listing.address}</p>
        <ul className="mt-3 grid grid-cols-4 gap-1">
          <li className={stat} title="Reviews"><Icon name="comment" /> {listing.reviews}</li>
          <li className={stat} title="Likes"><Icon name="heart-o" /> {listing.likes}</li>
          <li className={stat} title="Views"><Icon name="eye" /> {listing.views}</li>
          <li>
            <button type="button" onClick={() => onShare(listing)} aria-label={`Share ${listing.title}`} className={`${stat} h-full w-full hover:bg-slate-50 hover:text-ink`}>
              <Icon name="share-alt" />
            </button>
          </li>
        </ul>
      </div>
    </article>
  );
}
