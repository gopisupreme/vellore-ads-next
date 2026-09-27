'use client';

import { useId, useState } from 'react';

const PAGE_SIZES = [10, 25, 50, 100];

/** Page numbers to show: the first, the last and two either side of the current one. */
function pageList(current, count) {
  const pages = [];
  for (let p = 1; p <= count; p += 1) {
    if (p === 1 || p === count || Math.abs(p - current) <= 2) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
}

/**
 * A table with "Show N rows", a search box and pages, as the PHP pages'
 * DataTables. The rows are all in memory.
 *
 *   columns: [{ key, header, width?, render: (row) => node }]
 *   searchText: (row) => the text the search box looks in
 */
export default function DataTable({ columns, rows, rowKey, searchText, emptyText = 'No data available in table' }) {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const ids = useId();

  const needle = query.trim().toLowerCase();
  const matching = needle && searchText ? rows.filter((row) => searchText(row).toLowerCase().includes(needle)) : rows;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  const current = Math.min(page, pageCount); // rows can shrink (a delete) under the current page
  const first = (current - 1) * pageSize;
  const visible = matching.slice(first, first + pageSize);

  const pageButton = 'min-w-8 rounded px-2.5 py-1 text-sm';

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-[15px]">
        <label htmlFor={`${ids}-size`} className="flex items-center gap-1.5">
          Show
          <select
            id={`${ids}-size`}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="h-8 rounded border border-slate-300 bg-white px-2 text-sm"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
          Rows
        </label>
        {searchText && (
          <input
            type="search"
            aria-label="Search the table"
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-sm focus:border-link focus:outline-none sm:w-40"
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#d8dcd6] bg-linear-to-b from-[#f4f6f3] to-[#dde2da]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  className="px-2 py-3 align-bottom text-[13px] font-normal text-ink-body uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={rowKey(row)} className="border-b border-line hover:bg-[#f5f5f5]">
                {columns.map((col) => (
                  <td key={col.key} className="px-2 pt-[15px] pb-3 align-middle text-[15px] text-ink-soft">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
            {!visible.length && (
              <tr>
                <td colSpan={columns.length} className="px-2 py-6 text-center text-sm text-ink-soft">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p>
          {matching.length
            ? `Showing ${first + 1} to ${first + visible.length} of ${matching.length} entries`
            : 'Showing 0 entries'}
          {needle && ` (filtered from ${rows.length})`}
        </p>
        <nav aria-label="Table pages" className="flex flex-wrap gap-1">
          <button
            type="button"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
            className={`${pageButton} hover:bg-slate-100 disabled:opacity-40`}
          >
            Previous
          </button>
          {pageList(current, pageCount).map((p, i) =>
            p === '…' ? (
              <span key={`gap${i}`} className={pageButton}>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                aria-current={p === current ? 'page' : undefined}
                onClick={() => setPage(p)}
                className={`${pageButton} ${p === current ? 'bg-label-primary text-white' : 'hover:bg-slate-100'}`}
              >
                {p}
              </button>
            ),
          )}
          <button
            type="button"
            disabled={current === pageCount}
            onClick={() => setPage(current + 1)}
            className={`${pageButton} hover:bg-slate-100 disabled:opacity-40`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
