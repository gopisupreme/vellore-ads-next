import { createSlice } from '@reduxjs/toolkit';

/**
 * The admin dashboard (api/admin/dashboard.php): the counters and the 100
 * most viewed listings, whose switches and deletes change the rows in place.
 */
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    topListings: [],
    loading: false,
    error: '',
    busyId: null, // listing a switch or delete is waiting for
    actionError: '',
  },
  reducers: {
    fetchDashboard(state) {
      state.loading = true;
      state.error = '';
    },
    fetchDashboardSuccess(state, action) {
      state.loading = false;
      state.stats = action.payload.stats;
      state.topListings = action.payload.topListings;
    },
    fetchDashboardFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    listingToggleRequested(state, action) {
      state.busyId = action.payload.id;
      state.actionError = '';
    },
    listingDeleteRequested(state, action) {
      state.busyId = action.payload.id;
      state.actionError = '';
    },
    listingUpdated(state, action) {
      state.busyId = null;
      state.topListings = state.topListings.map((row) => (row.id === action.payload.id ? action.payload : row));
    },
    listingRemoved(state, action) {
      state.busyId = null;
      state.topListings = state.topListings.filter((row) => row.id !== action.payload);
    },
    listingActionFailed(state, action) {
      state.busyId = null;
      state.actionError = action.payload;
    },
    actionErrorDismissed(state) {
      state.actionError = '';
    },
  },
  selectors: {
    selectDashboard: (state) => state,
  },
});

export const {
  fetchDashboard,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  listingToggleRequested,
  listingDeleteRequested,
  listingUpdated,
  listingRemoved,
  listingActionFailed,
  actionErrorDismissed,
} = dashboardSlice.actions;
export const { selectDashboard } = dashboardSlice.selectors;
export default dashboardSlice.reducer;
