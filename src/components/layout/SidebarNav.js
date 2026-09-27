'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui';
import { pendingHref } from '@/config/adminMenu';

// "/admin" and "/admin/" are the same page (the build adds trailing slashes)
const trimSlash = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path);
const isActive = (pathname, item) => Boolean(item.href) && trimSlash(pathname) === trimSlash(item.href);
const hrefOf = (item) => item.href ?? pendingHref(item.php, item.label);

const rowClass = 'flex w-full items-center border-b border-page text-left text-[13.5px] transition-colors';
const idleClass = 'text-[#444] hover:bg-menu-hover hover:text-white';
const activeClass = 'bg-[#f1f5f7] font-medium text-link';

function Count({ counts, name }) {
  if (!name) return null;
  return <span className="ml-1 text-link">({counts?.[name] ?? 0})</span>;
}

function NavLink({ item, pathname, counts, onNavigate, nested = false }) {
  const active = isActive(pathname, item);
  return (
    <Link
      href={hrefOf(item)}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`${rowClass} ${nested ? 'py-2.5 pr-5 pl-12' : 'px-5 py-3'} ${active ? activeClass : idleClass}`}
    >
      {item.icon && <Icon name={item.icon} className="mr-2 w-4 text-center" />}
      <span>
        {item.label}
        <Count counts={counts} name={item.count} />
      </span>
      {!nested && <Icon name="angle-right" className="ml-auto pl-3 opacity-60" />}
    </Link>
  );
}

function NavGroup({ group, pathname, counts, onNavigate }) {
  const [open, setOpen] = useState(() => group.items.some((item) => isActive(pathname, item)));
  const panelId = useId();
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`${rowClass} px-5 py-3 ${idleClass}`}
      >
        <Icon name={group.icon} className="mr-2 w-4 text-center" />
        {group.label}
        <Icon name="angle-right" className={`ml-auto pl-3 opacity-60 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      <ul id={panelId} hidden={!open} className="bg-[#fafbfb]">
        {group.items.map((item) => (
          <li key={item.php}>
            <NavLink item={item} pathname={pathname} counts={counts} onNavigate={onNavigate} nested />
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * The side menu, from a menu config such as config/adminMenu.js; `counts`
 * fills the numbers beside the links.
 */
export default function SidebarNav({ menu, counts, onNavigate, onLogout }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main">
      <ul>
        {menu.map((entry) =>
          entry.items ? (
            <NavGroup key={entry.label} group={entry} pathname={pathname} counts={counts} onNavigate={onNavigate} />
          ) : (
            <li key={entry.label}>
              <NavLink item={entry} pathname={pathname} counts={counts} onNavigate={onNavigate} />
            </li>
          ),
        )}
        <li>
          <button type="button" onClick={onLogout} className={`${rowClass} px-5 py-3 ${idleClass}`}>
            Logout
            <Icon name="angle-right" className="ml-auto pl-3 opacity-60" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
