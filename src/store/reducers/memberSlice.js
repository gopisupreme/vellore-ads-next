import { createSlice } from '@reduxjs/toolkit';

const empty = { data: null, loading: false, error: '' };

/** The members' dashboards (api/member/*): { owner, customer, recruiter }, each { data, loading, error }. */
const memberSlice = createSlice({
  name: 'member',
  initialState: { owner: empty, customer: empty, recruiter: empty },
  reducers: {
    fetchMemberDashboard(state, action) {
      state[action.payload] = { ...state[action.payload], loading: true, error: '' };
    },
    fetchMemberDashboardSuccess(state, action) {
      state[action.payload.kind] = { data: action.payload.data, loading: false, error: '' };
    },
    fetchMemberDashboardFailure(state, action) {
      state[action.payload.kind] = { ...state[action.payload.kind], loading: false, error: action.payload.error };
    },
  },
  selectors: {
    selectMemberDashboard: (state, kind) => state[kind],
  },
});

export const { fetchMemberDashboard, fetchMemberDashboardSuccess, fetchMemberDashboardFailure } = memberSlice.actions;
export const { selectMemberDashboard } = memberSlice.selectors;
export default memberSlice.reducer;
