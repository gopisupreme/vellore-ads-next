import { createSlice } from '@reduxjs/toolkit';

/** api/categories.php: most visited active categories. */
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: [], loading: false, error: '' },
  reducers: {
    // payload: how many categories to load
    fetchCategories(state) {
      state.loading = true;
      state.error = '';
    },
    fetchCategoriesSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCategoriesFailure(state, action) {
      state.loading = false;
      state.items = [];
      state.error = action.payload;
    },
  },
  selectors: {
    selectCategories: (state) => state.items,
  },
});

export const { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;
export const { selectCategories } = categoriesSlice.selectors;
export default categoriesSlice.reducer;
