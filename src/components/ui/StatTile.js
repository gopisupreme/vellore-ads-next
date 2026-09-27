/* eslint-disable @next/next/no-img-element -- static export has no image server */
import Link from 'next/link';

/** A dashboard counter: picture, label and number, linking to its list. */
export default function StatTile({ href, image, label, value }) {
  return (
    <Link
      href={href}
      title={label}
      className="flex items-center gap-5 border border-line p-5 transition-colors hover:bg-slate-50 sm:flex-col sm:gap-0 sm:text-center"
    >
      <img src={image} alt="" className="size-[90px] shrink-0 rounded-[5px] border border-line p-3 sm:mb-5" />
      <span>
        <span className="block font-heading text-2xl font-bold text-ink-body">{label}</span>
        <span className="block font-heading text-2xl font-bold text-ink">
          {value ?? '…'}
        </span>
      </span>
    </Link>
  );
}
