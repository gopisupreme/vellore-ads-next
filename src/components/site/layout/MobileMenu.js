'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';

/** The menu that slides in from the right on small screens. */
export default function MobileMenu({ open, onClose, links, categories = [], account }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const heading = 'mt-6 mb-2 font-heading text-sm font-bold tracking-wide text-ink uppercase';
  const item = 'block border-b border-line py-2.5 text-sm text-ink-body hover:text-brand-500';

  return (
    <>
      <div aria-hidden="true" onClick={onClose} className={`fixed inset-0 z-50 bg-slate-900/50 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <nav
        aria-label="Mobile"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-white px-6 pb-8 shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button type="button" aria-label="Close menu" onClick={onClose} className="absolute top-4 right-4 text-2xl text-ink-body">
          <Icon name="times" />
        </button>
        {account?.user ? (
          <>
            <h5 className={`${heading} mt-14`}>Hi.. {account.user.name}</h5>
            <a href={account.dashboardHref} className={item}>Dashboard</a>
            <a href={links.page('add-listing')} className={item}>Add Listing</a>
            <button type="button" onClick={() => { onClose(); account.logout(); }} className={`${item} w-full text-left`}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h5 className={`${heading} mt-14`}>Business</h5>
            <a href={links.page('add-listing')} className={item}>Add Listing</a>
            <Link href="/register/" onClick={onClose} className={item}>Register</Link>
            <Link href="/login/" onClick={onClose} className={item}>Sign In</Link>
            <a href={links.page('post-free-ads')} className={item}>Post Free Ads</a>
          </>
        )}
        <h5 className={heading}>All Categories</h5>
        {categories.map((c) => (
          <a key={c.id} href={links.search(c.name)} className={item}>
            {c.name}
          </a>
        ))}
      </nav>
    </>
  );
}
