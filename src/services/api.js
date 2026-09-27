import axios from 'axios';

/**
 * The PHP API (backend/api/*.php). Same origin in both setups: on the server
 * api/ sits next to the pages; in `npm run dev` Next forwards /api to PHP.
 */
export const api = axios.create({ baseURL: '/api/', timeout: 15000 });

export async function getHealth() {
  const { data } = await api.get('health.php');
  return data;
}

export async function getCategories(limit = 24) {
  const { data } = await api.get('categories.php', { params: { limit } });
  return data.categories;
}
