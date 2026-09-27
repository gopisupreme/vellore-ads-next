import { createSlice } from '@reduxjs/toolkit';

/** api/home.php: the home page's news, theatres, trending listings, videos ... */
const homeSlice = createSlice({
  name: 'home',
  initialState: { data: null, loading: false, error: '' },
  reducers: {
    fetchHome(state) {
      state.loading = true;
      state.error = '';
    },
    fetchHomeSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHomeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  selectors: {
    selectHome: (state) => state,
  },
});

export const { fetchHome, fetchHomeSuccess, fetchHomeFailure } = homeSlice.actions;
export const { selectHome } = homeSlice.selectors;
export default homeSlice.reducer;
