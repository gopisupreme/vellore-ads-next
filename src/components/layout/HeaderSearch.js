'use client';

import { Icon } from '@/components/ui';

/**
 * The top bar's city + listing search. It sends the visitor to the public
 * search on the PHP site (pages/searchAutocomplete), in a new tab.
 */
export default function HeaderSearch({ site }) {
  if (!site) return <div className="flex-1" />;
  return (
    <form
      action={`${site.siteUrl}pages/searchAutocomplete`}
      method="post"
      target="_blank"
      className="flex h-[38px] min-w-0 flex-1 items-center"
    >
      <label className="sr-only" htmlFor="header-city">
        City
      </label>
      <input
        id="header-city"
        name="cityNm"
        defaultValue={site.city}
        required
        autoComplete="off"
        className="h-full w-[30%] min-w-0 px-4 text-[15px] text-ink-body focus:outline-none"
      />
      <div className="relative h-full min-w-0 flex-1">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-[#494b4b]" />
        <label className="sr-only" htmlFor="header-search">
          Search listings
        </label>
        <input
          id="header-search"
          name="categoryNm"
          required
          autoComplete="off"
          placeholder="Search your nearby listings and more"
          className="h-full w-full pr-3 pl-8 text-[15px] text-ink-body placeholder:text-[#555] focus:outline-none"
        />
      </div>
      <button type="submit" aria-label="Search" className="grid h-full w-7 shrink-0 place-items-center bg-search text-white">
        <Icon name="search" />
      </button>
    </form>
  );
}
