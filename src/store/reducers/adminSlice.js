import { createSlice } from '@reduxjs/toolkit';

/** The admin frame: the numbers beside the side menu's links (api/admin/menu-counts.php). */
const adminSlice = createSlice({
  name: 'admin',
  initialState: { counts: null, loading: false, error: '' },
  reducers: {
    fetchMenuCounts(state) {
      state.loading = true;
      state.error = '';
    },
    fetchMenuCountsSuccess(state, action) {
      state.loading = false;
      state.counts = action.payload;
    },
    fetchMenuCountsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    selectMenuCounts: (state) => state.counts,
  },
});

export const { fetchMenuCounts, fetchMenuCountsSuccess, fetchMenuCountsFailure } = adminSlice.actions;
export const { selectMenuCounts } = adminSlice.selectors;
export default adminSlice.reducer;
