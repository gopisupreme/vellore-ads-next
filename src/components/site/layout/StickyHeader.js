'use client';
/* eslint-disable @next/next/no-img-element -- static export has no image server */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useAccount from '@/hooks/useAccount';
import { Icon } from '@/components/ui';
import CategoryMenu from './CategoryMenu';
import MobileMenu from './MobileMenu';
import SearchForm from './SearchForm';

const blueButton = 'flex h-[46px] items-center gap-2 rounded-[2px] bg-[#2f80ed] px-4 text-lg text-white hover:bg-[#1f6fdc]';
const redButton = 'flex h-[46px] items-center gap-2 rounded-[2px] border border-[#dc2e21] bg-[#f44336] px-4 text-lg text-white hover:brightness-110';

/**
 * The dark bar fixed at the top (PHP site: templates/header-index.php).
 * With `revealAfter` it slides in once the page has scrolled that far (the
 * home page shows it below its big banner); otherwise it is always there.
 */
export default function StickyHeader({ site, links, categories, revealAfter = 0 }) {
  const [shown, setShown] = useState(revealAfter === 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const account = useAccount(links);

  useEffect(() => {
    if (!revealAfter) return undefined;
    const onScroll = () => setShown(window.scrollY > revealAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [revealAfter]);

  return (
    <>
      <header
        aria-hidden={!shown}
        inert={!shown}
        className={`fixed inset-x-0 top-0 z-40 bg-[#151f31] shadow-[0_0_10px_2px_rgba(0,0,0,.47)] transition-transform duration-500 ${
          shown ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-[1170px] items-center gap-3 px-[15px] lg:max-w-[1320px]">
          <a href={links.page('')} className="shrink-0" aria-label={site?.name ?? 'Home'}>
            <img src="/assets/images/aff-logo.png" alt="" className="h-10 w-auto" />
          </a>
          <div className="hidden lg:block">
            <CategoryMenu site={site} links={links} />
          </div>
          <div className="hidden min-w-0 flex-1 md:block">
            {site && <SearchForm key={site.city} variant="bar" links={links} defaultCity={site.city} />}
          </div>
          <nav className="ml-auto hidden items-center gap-2 sm:flex">
            {account.user ? (
              <>
                <a href={account.dashboardHref} title={account.user.name} className={`${blueButton} max-w-56`}>
                  <Icon name="user" /> <span className="truncate">{account.user.name}</span>
                </a>
                <button type="button" onClick={account.logout} className={redButton}>
                  <Icon name="sign-out" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login/" className={blueButton}>
                  <Icon name="sign-in" /> Sign In
                </Link>
                <a href={links.page('post-free-ads')} className={redButton}>
                  Post Free Ads
                </a>
              </>
            )}
          </nav>
          <button type="button" aria-label="Menu" onClick={() => setMenuOpen(true)} className="ml-auto grid size-10 place-items-center text-2xl text-white sm:ml-0 lg:hidden">
            <Icon name="bars" />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} categories={categories} account={account} />
    </>
  );
}
