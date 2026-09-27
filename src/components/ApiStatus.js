'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHealth, selectHealth } from '@/store/reducers/healthSlice';

/** Shows whether the PHP API and the database answer (api/health.php). */
export default function ApiStatus() {
  const dispatch = useDispatch();
  const { data: health, error } = useSelector(selectHealth);

  useEffect(() => {
    dispatch(fetchHealth());
  }, [dispatch]);

  if (error) {
    return <p className="mt-6 rounded border border-red-400 p-3 text-sm text-red-600">API error: {error}</p>;
  }
  if (!health) {
    return <p className="mt-6 text-sm opacity-70">Checking the API…</p>;
  }
  return (
    <p className="mt-6 rounded border border-green-500 p-3 text-sm">
      API connected: PHP {health.php}, database <strong>{health.database}</strong> ({health.tables} tables), city{' '}
      {health.site.city}
    </p>
  );
}
