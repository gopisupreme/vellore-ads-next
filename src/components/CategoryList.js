'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '@/store/reducers/categoriesSlice';

/** Most visited active categories (api/categories.php). */
export default function CategoryList() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories(24));
  }, [dispatch]);

  if (!categories.length) {
    return null;
  }
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Popular categories</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((c) => (
          <li key={c.id} className="rounded border border-black/10 p-3 capitalize dark:border-white/15">
            {c.name}
            <span className="block text-xs opacity-60">{Number(c.visitors).toLocaleString('en-IN')} visits</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
