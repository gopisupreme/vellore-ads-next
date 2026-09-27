'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession, selectAuth } from '@/store/reducers/authSlice';

/** The auth state; asks the API about the session the first time it is needed. */
export default function useSession() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  useEffect(() => {
    if (!auth.checked) dispatch(checkSession());
  }, [auth.checked, dispatch]);
  return auth;
}
