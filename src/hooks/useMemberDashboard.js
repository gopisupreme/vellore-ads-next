'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberDashboard, selectMemberDashboard } from '@/store/reducers/memberSlice';

/** A member dashboard's { data, loading, error }, loaded when the page opens. kind: owner, customer, recruiter. */
export default function useMemberDashboard(kind) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMemberDashboard(kind));
  }, [kind, dispatch]);
  return useSelector((state) => selectMemberDashboard(state, kind));
}
