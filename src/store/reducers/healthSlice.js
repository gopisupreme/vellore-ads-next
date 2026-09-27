import { createSlice } from '@reduxjs/toolkit';

/** api/health.php: whether the PHP API and the database answer. */
const healthSlice = createSlice({
  name: 'health',
  initialState: { data: null, loading: false, error: '' },
  reducers: {
    fetchHealth(state) {
      state.loading = true;
      state.error = '';
    },
    fetchHealthSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHealthFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    selectHealth: (state) => state,
  },
});

export const { fetchHealth, fetchHealthSuccess, fetchHealthFailure } = healthSlice.actions;
export const { selectHealth } = healthSlice.selectors;
export default healthSlice.reducer;
