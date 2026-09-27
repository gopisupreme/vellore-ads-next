'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayout, selectLayout } from '@/store/reducers/layoutSlice';
import { makeSiteLinks } from '@/lib/siteLinks';

/**
 * The public layout's data (site, categories, areas, visitors), loaded once,
 * and `links` into the PHP site's pages.
 */
export default function usePublicSite() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.layout);
  const needed = !data && !loading && !error;
  useEffect(() => {
    if (needed) dispatch(fetchLayout());
  }, [needed, dispatch]);
  return { ...data, site: data?.site ?? null, links: makeSiteLinks(data?.site) };
}
