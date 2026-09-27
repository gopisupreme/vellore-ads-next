'use client';
/* eslint-disable @next/next/no-img-element -- static export has no image server */

import Link from 'next/link';
import useAccount from '@/hooks/useAccount';
import { Icon } from '@/components/ui';
import { Container } from '@/components/site/ui';
import SearchForm from '@/components/site/layout/SearchForm';
import { HERO, HOUSE_ADS } from '@/config/site/home';
import AdSlot from './AdSlot';

const pill = 'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white transition hover:brightness-110 sm:px-5 sm:text-[15px]';

/** The big banner: logo, sign-in links, headline, search and the top ad (PHP site: dir3-home-head). */
export default function HeroSection({ site, links, ads }) {
  const { user, dashboardHref, logout } = useAccount(links);
  return (
    <section className="relative isolate bg-[#2196f3] bg-[url(/assets/images/banner6.webp)] bg-cover bg-center pb-16 md:pb-[125px]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-black/[.88] from-14% to-black/50 to-66%" />
      <Container className="flex flex-wrap items-center justify-between gap-4 pt-3">
        <a href={links.page('')} className="block">
          {site?.logo ? <img src={site.logo} alt={site.name} className="h-12 w-auto md:h-[60px]" /> : <span className="block h-[60px]" />}
        </a>
        {user ? (
          <nav className="flex flex-wrap gap-2">
            <a href={dashboardHref} className={`${pill} bg-brand-500`}>
              <Icon name="user" /> {user.name}
            </a>
            <button type="button" onClick={logout} className={`${pill} bg-[#f44336]`}>
              <Icon name="sign-out" /> Logout
            </button>
          </nav>
        ) : (
          <nav className="flex flex-wrap gap-2">
            <Link href="/login/" className={`${pill} bg-[yellow] !text-black`}>Sign In</Link>
            <a href={links.page('pricing')} className={`${pill} bg-brand-500`}>
              <Icon name="plus" /> Add Listing
            </a>
            <a href={links.page('post-free-ads')} className={`${pill} bg-[#f44336]`}>
              <Icon name="file-text" /> Post Free Ads
            </a>
          </nav>
        )}
      </Container>

      <Container className="mt-16 text-center text-white md:mt-[110px]">
        <h1 className="font-heading text-[28px] leading-tight font-bold [text-shadow:0_1px_0_rgba(0,0,0,.9)] md:text-[60px]">
          {HERO.title[0]} <br />
          {HERO.title[1]}
        </h1>
        <p className="mt-6 mb-10 text-base [text-shadow:0_1px_0_rgba(0,0,0,.9)] md:mt-[45px] md:mb-[55px] md:text-xl">
          {HERO.subtitle[0]} <br className="hidden md:block" />
          {HERO.subtitle[1]}
        </p>
        <div className="mx-auto max-w-[1000px] text-left">
          {site && <SearchForm key={site.city} variant="hero" links={links} defaultCity={site.city} />}
          <AdSlot ads={ads} fallback={HOUSE_ADS.hero} className="mt-2.5" />
        </div>
      </Container>
    </section>
  );
}
