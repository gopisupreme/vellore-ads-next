'use client';

import { useState } from 'react';
import useSuggestions from '@/hooks/useSuggestions';
import { Icon } from '@/components/ui';

function Suggestions({ items, onPick, id }) {
  if (!items.length) return null;
  return (
    <ul id={id} role="listbox" className="absolute top-full right-0 left-0 z-30 max-h-72 overflow-y-auto bg-white text-left shadow-lg ring-1 ring-black/10">
      {items.map((item) => (
        <li key={item.label + (item.url ?? '')} role="option" aria-selected="false">
          {item.url ? (
            <a href={item.url} className="flex items-center gap-2 px-4 py-2 text-sm text-ink-body hover:bg-brand-50">
              <Icon name="search" className="text-ink-faint" /> {item.label}
            </a>
          ) : (
            <button type="button" onMouseDown={() => onPick(item.label)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-ink-body hover:bg-brand-50">
              <Icon name="map-marker" className="text-ink-faint" /> {item.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

const STYLES = {
  // the hero's big white boxes and gradient SEARCH button
  hero: {
    form: 'flex flex-col gap-2.5 md:flex-row',
    term: 'md:flex-[3]',
    city: 'md:flex-1',
    input: 'h-[55px] w-full bg-white pr-3 pl-10 text-[15px] text-ink-body shadow-sm placeholder:text-[#555] focus:outline-none',
    button: 'h-[55px] bg-linear-to-b from-brand-500 to-[#0485b3] font-heading text-base font-semibold text-white uppercase md:flex-1 hover:brightness-105',
    label: 'search',
  },
  // the sticky header's slim bar
  bar: {
    form: 'flex items-stretch gap-2',
    term: 'flex-[3]',
    city: 'order-first flex-1',
    input: 'h-[46px] w-full rounded-[2px] bg-white pr-3 pl-10 text-[15px] text-ink-body placeholder:text-[#555] focus:outline-none',
    button: 'grid w-[60px] shrink-0 place-items-center rounded-[2px] bg-[#2f80ed] text-2xl text-white hover:bg-[#1f6fdc]',
    label: null,
  },
};

/**
 * Search for a service in a city: suggestions as you type (api/search/suggest.php),
 * and on submit the city's list for the term on the PHP site (as its
 * pages/searchAutocomplete did).
 */
export default function SearchForm({ variant = 'hero', links, defaultCity = '' }) {
  const [term, setTerm] = useState('');
  const [city, setCity] = useState(defaultCity);
  const [focus, setFocus] = useState(null);
  const titles = useSuggestions('title', focus === 'term' ? term : '');
  const cities = useSuggestions('city', focus === 'city' ? city : '');
  const s = STYLES[variant];

  // closes a box's suggestions when it loses focus (after a click on one has landed)
  const blurred = (name) => () => setTimeout(() => setFocus((f) => (f === name ? null : f)), 150);

  function submit(e) {
    e.preventDefault();
    if (!term.trim()) return;
    window.location.href = links.search(term, city || links.city);
  }

  return (
    <form onSubmit={submit} role="search" className={s.form}>
      <div className={`relative ${s.term}`}>
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#555]" />
        <input
          aria-label="Search services"
          placeholder={variant === 'hero' ? 'Search your services' : 'Search your nearby listings and more'}
          autoComplete="off"
          required
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setFocus('term')}
          onBlur={blurred('term')}
          className={s.input}
        />
        <Suggestions items={titles} />
      </div>
      <div className={`relative ${s.city}`}>
        {variant === 'hero' && <Icon name="map-marker" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-[#555]" />}
        <input
          aria-label="City"
          placeholder="Select City"
          autoComplete="off"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setFocus('city')}
          onBlur={blurred('city')}
          className={`${s.input} ${variant === 'bar' ? '!pl-3' : ''}`}
        />
        <Suggestions items={cities} onPick={setCity} />
      </div>
      <button type="submit" aria-label="Search" className={s.button}>
        {s.label ?? <Icon name="search" />}
      </button>
    </form>
  );
}
