'use client';

import { useEffect, useState } from 'react';
import { getSuggestions } from '@/services/api';

/**
 * Suggestions for what is typed in a search box, asked for 250ms after the
 * typing stops. type "title" -> [{label, url}], "city" -> [{label}].
 */
export default function useSuggestions(type, query) {
  const [items, setItems] = useState([]);
  const q = query.trim();

  useEffect(() => {
    if (q.length < 2) return undefined;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      getSuggestions(type, q, controller.signal)
        .then(setItems)
        .catch(() => {});
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [type, q]);

  return q.length < 2 ? [] : items;
}
