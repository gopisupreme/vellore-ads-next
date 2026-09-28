/**
 * Accounts are the `users` table; u_type is the role. `home` is the role's
 * dashboard in this app, or null while it is still only on the PHP site,
 * at `php` (where the person signs in again).
 */
export const ROLES = {
  admin: { label: 'Administrator', home: '/admin/', php: 'connect/dashboard' },
  listing: { label: 'Business owner', home: '/users/dashboard/', php: 'users/dashboard' },
  customer: { label: 'Customer', home: '/customer/dashboard/', php: 'customer/dashboard' },
  recruiter: { label: 'Recruiter', home: '/recruiter/dashboard/', php: 'recruiter/dashboard' },
};

export function roleLabel(role) {
  return ROLES[role]?.label ?? 'User';
}

export function homeFor(role) {
  return ROLES[role]?.home ?? null;
}

/** The PHP site page of the role's dashboard (for roles not moved here yet). */
export function phpDashboardFor(role) {
  return ROLES[role]?.php ?? 'users/dashboard';
}
