'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

/** "Home / <page>" with a Back button, above each admin page's content. */
export default function Breadcrumbs({ homeHref, current }) {
  const router = useRouter();
  return (
    <div className="mb-4 flex items-center gap-4">
      <nav aria-label="Breadcrumb" className="flex-1">
        <ol className="flex flex-wrap items-center gap-1.5 text-[15px] text-[#495d65]">
          <li>
            <Link href={homeHref} className="hover:text-link">
              <Icon name="home" /> Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{current}</li>
        </ol>
      </nav>
      <button
        type="button"
        onClick={() => router.back()}
        className="rounded-full bg-link px-2 py-0.5 text-xs font-semibold text-white hover:brightness-95"
      >
        <Icon name="backward" /> Back
      </button>
    </div>
  );
}
