import axios from 'axios';

/**
 * The PHP API (backend/api/*.php). Same origin in both setups: on the server
 * api/ sits next to the pages; in `npm run dev` Next forwards /api to PHP.
 * Sign-in is a PHP session cookie, which the browser sends by itself.
 */
export const api = axios.create({ baseURL: '/api/', timeout: 15000 });

export async function getSite() {
  const { data } = await api.get('site.php');
  return data.site;
}

/** The signed-in user, or null when nobody is signed in. */
export async function getCurrentUser() {
  try {
    const { data } = await api.get('auth/me.php');
    return data.user;
  } catch (e) {
    if (e.response?.status === 401) return null;
    throw e;
  }
}

export async function login({ email, password }) {
  const { data } = await api.post('auth/login.php', { email, password });
  return data.user;
}

export async function logout() {
  await api.post('auth/logout.php', {});
}

/* admin (api/admin/*.php) */

/** The numbers beside the admin side menu's links. */
export async function getMenuCounts() {
  const { data } = await api.get('admin/menu-counts.php');
  return data.counts;
}

/** { stats, topListings } of the admin dashboard. */
export async function getAdminDashboard() {
  const { data } = await api.get('admin/dashboard.php');
  return data;
}

/** Switches a listing's status, verified, trusted or plan; returns the updated listing. */
export async function toggleListing({ id, field }) {
  const { data } = await api.post('admin/listing-toggle.php', { id, field });
  return data.listing;
}

/** Deletes a listing and its reviews. */
export async function deleteListing({ id }) {
  await api.post('admin/listing-delete.php', { id });
}

/* public site */

/** { site, categories, areas, visitors }: the public header and footer. */
export async function getLayout() {
  const { data } = await api.get('layout.php');
  return data;
}

/** The home page's data from the database. */
export async function getHome() {
  const { data } = await api.get('home.php');
  return data;
}

/** Search suggestions: type "title" -> [{label, url}], "city" -> [{label}]. */
export async function getSuggestions(type, q, signal) {
  const { data } = await api.get('search/suggest.php', { params: { type, q }, signal });
  return data.items;
}

/** The "Quick service request" form; returns the thank-you message. */
export async function sendQuickRequest({ name, mobile, email, service }) {
  const { data } = await api.post('quick-request.php', { name, mobile, email, service });
  return data.message;
}

/* accounts (api/auth/*.php) */

/** Creates an account; returns { message, emailSent, devLink }. */
export async function register(fields) {
  const { data } = await api.post('auth/register.php', fields);
  return data;
}

/** The link from the registration email; returns { message }. */
export async function verifyEmail({ token }) {
  const { data } = await api.post('auth/verify-email.php', { token });
  return data;
}

/** Emails a link to choose a new password; returns { message, devLink }. */
export async function forgotPassword({ email }) {
  const { data } = await api.post('auth/forgot-password.php', { email });
  return data;
}

/** Sets a new password with the emailed link's token; returns { message }. */
export async function resetPassword({ token, password, confirmPassword }) {
  const { data } = await api.post('auth/reset-password.php', { token, password, confirmPassword });
  return data;
}
