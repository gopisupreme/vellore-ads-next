import { createSlice } from '@reduxjs/toolkit';

/** api/layout.php: what the public header and footer show (site, categories, areas, visitors). */
const layoutSlice = createSlice({
  name: 'layout',
  initialState: { data: null, loading: false, error: '' },
  reducers: {
    fetchLayout(state) {
      state.loading = true;
      state.error = '';
    },
    fetchLayoutSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchLayoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    selectLayout: (state) => state.data,
    selectPublicSite: (state) => state.data?.site ?? null,
  },
});

export const { fetchLayout, fetchLayoutSuccess, fetchLayoutFailure } = layoutSlice.actions;
export const { selectLayout, selectPublicSite } = layoutSlice.selectors;
export default layoutSlice.reducer;
