'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSite } from '@/store/reducers/siteSlice';

/** This site's details (name, city, logos), loaded once and shared through Redux. */
export default function useSite() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.site);
  const needed = !data && !loading && !error;
  useEffect(() => {
    if (needed) dispatch(fetchSite());
  }, [needed, dispatch]);
  return data;
}
