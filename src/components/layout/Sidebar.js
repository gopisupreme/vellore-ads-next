'use client';

import { Avatar } from '@/components/ui';
import { roleLabel } from '@/config/roles';
import SidebarNav from './SidebarNav';

/**
 * The white left column under the top bar: the signed-in user and the menu.
 * On small screens it slides in over the page while `open`.
 */
export default function Sidebar({ menu, counts, user, open, onClose, onLogout }) {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 top-[60px] z-30 bg-slate-900/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed top-[60px] bottom-0 left-0 z-40 w-72 overflow-y-auto bg-white transition-transform lg:w-[20%] lg:translate-x-0 ${
          open ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-6 px-[15px] py-[25px]">
          <Avatar src={user.avatar} name={user.name} className="size-[30px]" />
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-bold text-ink">{user.name}</p>
            <p className="pt-0.5 text-xs text-ink-faint">{roleLabel(user.role)}</p>
          </div>
        </div>
        <SidebarNav menu={menu} counts={counts} onNavigate={onClose} onLogout={onLogout} />
      </aside>
    </>
  );
}
