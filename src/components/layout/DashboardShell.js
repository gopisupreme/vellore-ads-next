'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequested, selectUser } from '@/store/reducers/authSlice';
import useSite from '@/hooks/useSite';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * The frame of a dashboard (PHP site: views/admin/header.php): top bar, side
 * menu and the grey content area. Each role's dashboard passes its own
 * `menu`, `accountMenu` and menu `counts`. Use inside <RequireAuth>.
 */
export default function DashboardShell({ menu, accountMenu, counts, homeHref, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const site = useSite();
  const dispatch = useDispatch();
  const logout = () => dispatch(logoutRequested());

  return (
    <div className="min-h-screen bg-page">
      <Topbar
        site={site}
        user={user}
        homeHref={homeHref}
        accountMenu={accountMenu}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onLogout={logout}
      />
      <Sidebar
        menu={menu}
        counts={counts}
        user={user}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogout={logout}
      />
      <main className="pt-[60px] lg:ml-[20%]">
        <div className="p-4 sm:p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
