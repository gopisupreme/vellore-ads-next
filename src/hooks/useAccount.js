'use client';

import { useDispatch } from 'react-redux';
import useSession from '@/hooks/useSession';
import { homeFor, phpDashboardFor } from '@/config/roles';
import { logoutRequested } from '@/store/reducers/authSlice';

/**
 * The signed-in person for the public header: `user` (or null), where their
 * dashboard is (here, or on the PHP site until it moves) and `logout`.
 */
export default function useAccount(links) {
  const { user } = useSession();
  const dispatch = useDispatch();
  const home = user ? homeFor(user.role) : null;
  return {
    user,
    dashboardHref: user ? home ?? links.page(phpDashboardFor(user.role)) : null,
    logout: () => dispatch(logoutRequested()),
  };
}
