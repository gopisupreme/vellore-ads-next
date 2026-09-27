'use client';
/* eslint-disable @next/next/no-img-element -- static export has no image server */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@/components/ui';
import { Container } from '@/components/site/ui';
import {
  FOOTER_MAJOR_CITIES,
  FOOTER_OUR_SERVICES,
  FOOTER_POPULAR_SERVICES,
  FOOTER_SUPPORT_LINKS,
  FOOTER_TN_DISTRICTS,
} from '@/config/site/footerLinks';
import { enquiryDialogToggled } from '@/store/reducers/enquirySlice';

const linkClass = 'text-[#8d8d8d] transition-colors hover:text-white';

function Heading({ children, ruled = false }) {
  return <h4 className={`mb-4 font-heading text-[22px] font-medium text-[#9a9a9a] ${ruled ? 'border-b border-[#636363] pb-3' : ''}`}>{children}</h4>;
}

/** An inline list of links, each after a small tick (cities, districts, areas). */
function TickList({ items }) {
  return (
    <ul className="flex flex-wrap gap-x-2.5 gap-y-1 text-[15px] leading-6">
      {items.map((item, i) => (
        <li key={i}>
          <Icon name="check" className="mr-1 text-[9px] text-[#636363]" />
          <a href={item.href} className={linkClass} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** A footer service with its picture from the icon sprite. */
function SpriteIcon({ icon }) {
  if (!icon) return <span className="size-9" />;
  return (
    <span
      aria-hidden="true"
      className="block shrink-0 bg-[url(/assets/images/footer_icon_set.webp)] opacity-70"
      style={{ width: icon.w, height: icon.h, backgroundPosition: `${icon.x}px ${icon.y}px` }}
    />
  );
}

/** The dark footer of the public pages (PHP site: templates/footer.php). */
export default function SiteFooter({ layout, links }) {
  const [allCategories, setAllCategories] = useState(false);
  const dispatch = useDispatch();
  const site = layout?.site;
  const city = links.city;

  const twoColumns = (items) => (
    <ul className="columns-2 gap-6 text-base leading-[25px] [&>li]:break-inside-avoid md:[&>li]:whitespace-nowrap">
      {items.map((item) => (
        <li key={item.label}>
          <Icon name="check" className="mr-1.5 text-[9px] text-[#636363]" />
          {item.action ? (
            <button type="button" onClick={() => dispatch(enquiryDialogToggled(true))} className={linkClass}>
              {item.label}
            </button>
          ) : (
            <a href={links.of(item)} className={linkClass}>
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  const social = site
    ? [
        ['facebook', site.social.facebook, 'bg-[#3b5998]'],
        ['instagram', site.social.instagram, 'bg-[#e4405f]'],
        ['twitter', site.social.twitter, 'bg-[#1da1f2]'],
        ['wikipedia-w', `https://en.wikipedia.org/wiki/${encodeURIComponent(city)}`, 'bg-[#2c5aa0]'],
        ['youtube', 'https://www.youtube.com/@velloreads', 'bg-[#cd201f]'],
        ['whatsapp', 'https://whatsapp.com/channel/0029VaBiWahIt5rz1woEtb3Y', 'bg-[#25d366]'],
        ['linkedin', site.social.linkedin, 'bg-[#0077b5]'],
      ].filter(([, href]) => href)
    : [];

  return (
    <>
      <footer className="bg-[#141f31] pt-[90px] pb-[50px] font-light text-[#9a9a9a]">
        <Container className="space-y-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr_1.6fr]">
            <div>
              {site?.logo && <img src={site.logo} alt={site.name} loading="lazy" className="mb-6 h-14 w-auto" />}
              <p className="max-w-60 text-base">Worlds&apos;s No. 1 Local Business Directory Website.</p>
            </div>
            <div>
              <Heading>Support &amp; Help</Heading>
              {twoColumns(FOOTER_SUPPORT_LINKS)}
            </div>
            <div>
              <Heading>Popular Services</Heading>
              {twoColumns(FOOTER_POPULAR_SERVICES)}
            </div>
          </div>

          <div>
            <Heading ruled>Some of our Services</Heading>
            <ul className="grid grid-cols-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
              {FOOTER_OUR_SERVICES.map((s) => (
                <li key={s.label} className="flex h-[60px] items-center gap-4">
                  <SpriteIcon icon={s.icon} />
                  {s.path ? (
                    <a href={links.page(s.path)} className={`text-lg ${linkClass}`}>{s.label}</a>
                  ) : (
                    <a href={links.search(s.label)} className={`text-lg ${linkClass}`}>{s.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading ruled>We Cover Major Cities in India</Heading>
            <TickList items={FOOTER_MAJOR_CITIES.map((c) => ({ label: c.label, href: c.url, external: true }))} />
          </div>
          <div>
            <Heading ruled>We Cover Major District in Tamilnadu</Heading>
            <TickList items={FOOTER_TN_DISTRICTS.map((c) => ({ label: c.label, href: c.url, external: true }))} />
          </div>
          {layout?.areas?.length > 0 && (
            <div>
              <Heading ruled>Major Areas in {city}</Heading>
              <TickList items={layout.areas.map((area) => ({ label: area, href: links.page(encodeURIComponent(area)) }))} />
            </div>
          )}
          {layout?.categories?.length > 0 && (
            <div>
              <Heading ruled>List of Categories</Heading>
              <p className={`text-base leading-[25px] ${allCategories ? '' : 'line-clamp-4'}`}>
                {layout.categories.map((c) => (
                  <span key={c.id}>
                    <a href={links.search(c.name)} title={`${c.name} in ${city}`} className={linkClass}>
                      {c.name}
                    </a>{' '}
                    /{' '}
                  </span>
                ))}
              </p>
              <button type="button" onClick={() => setAllCategories(!allCategories)} className={`mt-1 text-base ${linkClass}`}>
                {allCategories ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Heading>Payment Options</Heading>
              <img src="/assets/images/Payment.webp" alt="PayPal, Mastercard, Maestro, Stripe and Bitcoin" loading="lazy" className="w-full max-w-64" />
              <hr className="my-4 border-[#636363]" />
              <div className="flex gap-1.5">
                {[['makein_india', 'Make in India'], ['vocal', 'Vocal for Local'], ['digital', 'Digital India']].map(([file, alt]) => (
                  <img key={file} src={`/assets/images/${file}.webp`} alt={alt} loading="lazy" className="h-10 w-auto rounded-[2px] bg-white" />
                ))}
              </div>
            </div>
            <div>
              <Heading>Customer Care</Heading>
              <p className="text-base">Monday to Saturday : 9AM to 9PM</p>
              {site?.phone && (
                <p className="mt-3 text-base">
                  Support : <a href={`tel:${site.phone}`} className="text-xl text-[#c9c9c9] hover:text-white">{site.phone}</a>
                </p>
              )}
            </div>
            <div>
              <Heading>Follow with us</Heading>
              <ul className="flex flex-wrap gap-1.5">
                {social.map(([icon, href, bg]) => (
                  <li key={icon}>
                    <a href={href} target="_blank" rel="noreferrer" aria-label={icon.replace('-w', '')} className={`grid size-8 place-items-center rounded-full text-white hover:brightness-110 ${bg}`}>
                      <Icon name={icon} />
                    </a>
                  </li>
                ))}
              </ul>
              {layout?.visitors != null && (
                <>
                  <h4 className="mt-5 mb-3 font-heading text-[22px] font-medium">Website traffic</h4>
                  <p aria-label={`${layout.visitors} visits`} className="inline-flex rounded-[2px] bg-[#e6e6e6] px-1 py-1 font-mono text-sm text-[#333]">
                    {String(layout.visitors).split('').map((digit, i) => (
                      <span key={i} aria-hidden="true" className="border-r border-[#b9b9b9] px-1.5 last:border-r-0">
                        {digit}
                      </span>
                    ))}
                  </p>
                </>
              )}
            </div>
            {site?.map && (
              <iframe title={`Map of ${city}`} src={site.map} loading="lazy" className="h-40 w-full border-2 border-white" referrerPolicy="no-referrer-when-downgrade" />
            )}
          </div>
        </Container>
      </footer>
      <div className="bg-[#131925] py-2 text-center">
        <Container>
          <p className="text-sm">
            Copyrights © {new Date().getFullYear()}. &nbsp;All rights reserved. Powered by <span className="text-[#e02c3f]">♥</span>{' '}
            <a href="http://redbackstudios.in" target="_blank" rel="noreferrer" className="hover:text-white">Redback</a>
          </p>
          <p className="text-xs">
            Unless otherwise indicated, all materials on these pages are copyrighted by Redback IT solutions. All rights reserved. No part of these pages, either text or image may be used for any purpose.
          </p>
        </Container>
      </div>
    </>
  );
}
