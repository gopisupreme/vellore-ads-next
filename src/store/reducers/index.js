import { combineReducers } from '@reduxjs/toolkit';
import health from './healthSlice';
import categories from './categoriesSlice';

/** Add each new slice's reducer here. */
const rootReducer = combineReducers({
  health,
  categories,
});

export default rootReducer;
