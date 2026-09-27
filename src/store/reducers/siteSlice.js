import { createSlice } from '@reduxjs/toolkit';

/** api/site.php: this site's name, city and logos (companyinfo table). */
const siteSlice = createSlice({
  name: 'site',
  initialState: { data: null, loading: false, error: '' },
  reducers: {
    fetchSite(state) {
      state.loading = true;
      state.error = '';
    },
    fetchSiteSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSiteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    selectSite: (state) => state.data,
  },
});

export const { fetchSite, fetchSiteSuccess, fetchSiteFailure } = siteSlice.actions;
export const { selectSite } = siteSlice.selectors;
export default siteSlice.reducer;
