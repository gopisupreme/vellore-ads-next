'use client';
/* eslint-disable @next/next/no-img-element -- static export has no image server */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Icon } from '@/components/ui';
import { Container } from '@/components/site/ui';
import { memberPendingHref } from '@/config/memberMenus';
import { logoutRequested, selectUser } from '@/store/reducers/authSlice';

const trimSlash = (path) => path.replace(/\/+$/, '');
const row = 'flex w-full items-center gap-3 border-b border-[#e8e8e8] py-3 text-left text-[15px] transition-colors hover:text-brand-600';

function MenuLink({ item, base, active }) {
  const content = (
    <>
      <img src={`/assets/images/icon/${item.icon}.png`} alt="" className="size-5 shrink-0 opacity-80" />
      <span className={item.highlight ? 'bg-[#ffe500] px-1' : ''}>{item.label}</span>
    </>
  );
  if (item.url) {
    return <a href={item.url} target="_blank" rel="noreferrer" className={`${row} text-ink`}>{content}</a>;
  }
  return (
    <Link href={item.href ?? memberPendingHref(base, item.php, item.label)} aria-current={active ? 'page' : undefined} className={`${row} ${active ? 'font-medium text-brand-600' : 'text-ink'}`}>
      {content}
    </Link>
  );
}

/**
 * The members' dashboard frame (PHP site: tz-l + tz-2): the person's
 * picture and name, their menu, and the page on the right.
 */
export default function MemberShell({ menu, base, children }) {
  const user = useSelector(selectUser);
  const pathname = usePathname();
  const dispatch = useDispatch();
  // on small screens the menu folds away so the page comes first
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-page py-10">
      <Container className="grid items-start gap-6 lg:grid-cols-[266px_1fr] lg:gap-4">
        <aside className="space-y-3">
          <div className="flex items-center gap-4 bg-white p-4 shadow-sm ring-1 ring-black/5 lg:flex-col lg:py-6 lg:text-center">
            <Avatar src={user?.avatar} name={user?.name} className="size-16 lg:size-20" />
            <p className="font-heading text-2xl leading-tight font-bold text-ink lg:text-[28px]">{user?.name}</p>
          </div>
          <nav aria-label="Dashboard" className="bg-white px-5 py-3 shadow-sm ring-1 ring-black/5">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              className="flex w-full items-center justify-between py-1 font-heading text-lg font-bold text-ink lg:hidden"
            >
              Menu <Icon name={menuOpen ? 'angle-up' : 'angle-down'} />
            </button>
            <ul className={menuOpen ? 'mt-2 lg:mt-0' : 'hidden lg:block'}>
              {menu.map((item) => (
                <li key={item.label}>
                  <MenuLink item={item} base={base} active={Boolean(item.href) && trimSlash(pathname) === trimSlash(item.href)} />
                </li>
              ))}
              <li>
                <button type="button" onClick={() => dispatch(logoutRequested())} className={`${row} border-b-0 text-ink`}>
                  <img src="/assets/images/icon/dbl12.png" alt="" className="size-5 opacity-80" /> Log Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}

/** A dashboard page's white panel with its navy title, as the PHP pages' "tz-2". */
export function MemberPanel({ title, children }) {
  return (
    <section className="bg-white shadow-sm ring-1 ring-black/5">
      <h1 className="bg-navy-800 px-4 py-4 font-heading text-lg font-bold text-white">{title}</h1>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

/** A counter tile: picture, label and a big number (PHP site: tz-2-main-2). */
export function CountTile({ image, label, value, note }) {
  return (
    <div className="border border-line p-5 text-center">
      {image && <img src={`/assets/images/icon/${image}.png`} alt="" className="mx-auto mb-5 size-[90px] rounded-[5px] border border-line p-3" />}
      <p className="font-heading text-2xl font-bold text-ink-body">{label}</p>
      {note && <p className="mt-1 text-sm text-ink">{note}</p>}
      <p className="mt-2 font-heading text-6xl font-bold text-link">{value ?? '…'}</p>
    </div>
  );
}

/** A titled table of a dashboard (PHP site: "Recent Listings"). Columns: [{ key, header, render }]. */
export function MemberTable({ title, columns, rows, empty = 'Nothing here yet.' }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-heading text-[28px] font-bold text-link sm:text-[32px]">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-[#d0d0d0]">
              {columns.map((c) => (
                <th key={c.key} className="px-2 py-3 font-normal text-ink">{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[#e8e8e8]">
                {columns.map((c) => (
                  <td key={c.key} className="px-2 py-3 align-middle text-ink-body">{c.render(r)}</td>
                ))}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={columns.length} className="px-2 py-6 text-center text-sm text-ink-soft">
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Loads a member dashboard's data and shows its error, if any. */
export function DashboardError({ error }) {
  if (!error) return null;
  return (
    <p role="alert" className="mb-4 flex items-center gap-2 rounded bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
      <Icon name="exclamation-circle" /> {error}
    </p>
  );
}
