'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/ui';
import { Carousel, Container, SafeImage } from '@/components/site/ui';
import { CATEGORY_PANELS, CATEGORY_TILES } from '@/config/site/categoryStrip';

/** A tile's drop-down: tabs of service lists (PHP site: catagories-menu-container). */
function CategoryPanel({ tabs, links, onClose }) {
  const [active, setActive] = useState(0);
  const ids = useId();
  return (
    <div className="relative mt-4 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,.12)] ring-1 ring-line">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-3 right-4 text-xl text-ink-faint hover:text-ink">
        <Icon name="times" />
      </button>
      <div role="tablist" className="mb-5 flex flex-wrap gap-2 border-b border-line pr-8">
        {tabs.map((t, i) => (
          <button
            key={t.tab}
            role="tab"
            id={`${ids}-tab${i}`}
            aria-selected={i === active}
            aria-controls={`${ids}-panel${i}`}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${i === active ? 'border-brand-500 text-brand-600' : 'border-transparent text-ink-body hover:text-ink'}`}
          >
            {t.tab}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.tab} role="tabpanel" id={`${ids}-panel${i}`} aria-labelledby={`${ids}-tab${i}`} hidden={i !== active} className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:grid-cols-3">
          {t.columns.map((col, c) => (
            <ul key={c}>
              {col.map((item, k) => (
                <li key={k}>
                  {typeof item === 'string' ? (
                    <a href={links.search(item)} title={`${item} in ${links.city}`} className="block py-1 text-sm text-ink-body hover:text-brand-500">
                      {item}
                    </a>
                  ) : (
                    <h3 className={`pt-2 pb-1 font-heading font-bold text-ink ${item.heading ? 'text-base' : 'text-sm'}`}>{item.heading ?? item.subheading}</h3>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}

/** The row of category tiles under the banner; most open a panel of services. */
export default function CategoryStrip({ links }) {
  const [open, setOpen] = useState(null);
  const tile = 'flex h-full w-full flex-col items-center justify-center gap-4 rounded-[2px] bg-[#f6f6f6] px-4 py-5 text-[15px] text-ink-body transition-colors hover:bg-[#eef0f1]';

  return (
    <section className="border-b border-line py-[60px]">
      <Container>
        <Carousel label="Categories" trackClassName="gap-2.5">
          {CATEGORY_TILES.map((t) => {
            const content = (
              <>
                <SafeImage src={`/${t.image}`} alt="" className="h-[60px] w-auto" />
                <span>
                  {t.label} {!t.href && <Icon name="angle-down" className="text-xs" />}
                </span>
              </>
            );
            return (
              <div key={t.key} className="shrink-0 basis-[calc(50%-5px)] snap-start sm:basis-[calc(33.333%-7px)] lg:basis-[calc(20%-8px)]">
                {t.href ? (
                  <a href={links.page(t.href)} className={tile}>{content}</a>
                ) : (
                  <button type="button" aria-expanded={open === t.key} onClick={() => setOpen(open === t.key ? null : t.key)} className={`${tile} ${open === t.key ? '!bg-brand-50 ring-1 ring-brand-300' : ''}`}>
                    {content}
                  </button>
                )}
              </div>
            );
          })}
        </Carousel>
        {open && CATEGORY_PANELS[open] && <CategoryPanel key={open} tabs={CATEGORY_PANELS[open]} links={links} onClose={() => setOpen(null)} />}
      </Container>
    </section>
  );
}
