'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Avatar, Icon } from '@/components/ui';

/**
 * "My Account" at the right of the top bar, with its drop-down:
 * `items` ({ label, icon, href }) and Logout.
 */
export default function UserMenu({ user, items, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutside = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const itemClass = 'flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-[#444] hover:bg-slate-50';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center py-[18px] text-[15px] whitespace-nowrap text-[#494b4b]"
      >
        <Avatar src={user.avatar} name={user.name} className="mr-2.5 size-[25px] border-2 border-[#a1adb3]" />
        My Account
        <Icon name="angle-down" className="ml-2" />
      </button>

      {open && (
        <div role="menu" className="absolute top-full right-0 z-50 w-[250px] bg-white py-1 shadow-[0_2px_5px_rgba(0,0,0,.16),0_2px_10px_rgba(0,0,0,.12)]">
          {items.map((item) => (
            <Link key={item.label} role="menuitem" href={item.href} onClick={() => setOpen(false)} className={itemClass}>
              <Icon name={item.icon} className="w-4 text-center text-ink-faint" /> {item.label}
            </Link>
          ))}
          <div className="my-1 border-t border-line" />
          <button role="menuitem" type="button" onClick={onLogout} className={itemClass}>
            <Icon name="sign-in" className="w-4 text-center text-ink-faint" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
