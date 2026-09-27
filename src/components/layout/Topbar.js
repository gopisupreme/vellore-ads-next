/* eslint-disable @next/next/no-img-element -- static export has no image server */
'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui';
import HeaderSearch from './HeaderSearch';
import UserMenu from './UserMenu';

/** The fixed white bar across the top: menu button (small screens), logo, search, My Account. */
export default function Topbar({ site, user, homeHref, accountMenu, onToggleMenu, onLogout }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center bg-white shadow-[0_2px_5px_rgba(0,0,0,.22)]">
      <div className="flex shrink-0 items-center gap-2 pl-4 lg:w-[16.667%]">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label="Menu"
          className="grid size-8 place-items-center rounded-sm bg-[#0e76a8] text-white lg:hidden"
        >
          <Icon name="bars" />
        </button>
        <Link href={homeHref} className="block">
          {site?.adminLogo ? (
            <img src={site.adminLogo} alt={site.name} className="max-h-[42px] w-auto max-w-[180px]" />
          ) : (
            <span className="font-heading text-lg font-bold text-ink">{site?.name ?? ''}</span>
          )}
        </Link>
      </div>
      <div className="hidden min-w-0 px-4 md:flex md:w-1/2">
        <HeaderSearch site={site} />
      </div>
      <div className="ml-auto pr-5 sm:pr-8">
        <UserMenu user={user} items={accountMenu} onLogout={onLogout} />
      </div>
    </header>
  );
}
