'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@/components/ui';
import { HEADER_CATEGORY_COLUMNS, HEADER_SUPPORT_LINKS } from '@/config/site/headerMenu';
import { enquiryDialogToggled } from '@/store/reducers/enquirySlice';

/** The sticky header's "CATEGORY" drop-down (PHP site: header-index.php). */
export default function CategoryMenu({ site, links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const linkClass = 'block py-1.5 text-sm text-ink-body hover:text-brand-500';

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex h-[60px] items-center gap-2 px-4 text-lg font-medium text-white uppercase">
        Category <Icon name="angle-down" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 w-[min(1100px,90vw)] bg-white shadow-2xl">
          <div className="grid grid-cols-6 gap-6 p-6">
            {HEADER_CATEGORY_COLUMNS.map((col, i) => (
              <div key={i}>
                <h4 className="mb-2 min-h-6 font-heading text-base font-bold text-ink">{col.heading}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={links.search(link.term)} title={`${link.label} in ${links.city}`} className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="border-l border-line pl-6">
              <h4 className="mb-2 min-h-6 font-heading text-base font-bold text-ink">Support &amp; Contact</h4>
              <ul>
                {HEADER_SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.action ? (
                      <button type="button" onClick={() => { setOpen(false); dispatch(enquiryDialogToggled(true)); }} className={linkClass}>
                        {link.label}
                      </button>
                    ) : (
                      <a href={links.page(link.path)} className={linkClass}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 bg-navy-800 px-6 py-4 text-sm text-white">
            <p className="flex-1">
              A few reasons you&apos;ll love Online Business Directory
              {site?.mobile && <span className="ml-2 text-accent-400">Call us on: {site.mobile}</span>}
            </p>
            <a href={links.page('contact-us')} className="rounded bg-brand-500 px-4 py-2 font-medium hover:bg-brand-600">
              <Icon name="bullhorn" /> Contact with us
            </a>
            <a href={links.page('pricing')} className="rounded bg-[#f44336] px-4 py-2 font-medium hover:brightness-110">
              <Icon name="bookmark" /> Add your business
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
