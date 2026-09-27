import { combineReducers } from '@reduxjs/toolkit';
import account from './accountSlice';
import admin from './adminSlice';
import auth from './authSlice';
import dashboard from './dashboardSlice';
import enquiry from './enquirySlice';
import home from './homeSlice';
import layout from './layoutSlice';
import site from './siteSlice';

/** Add each new slice's reducer here. */
const rootReducer = combineReducers({
  account,
  admin,
  auth,
  dashboard,
  enquiry,
  home,
  layout,
  site,
});

export default rootReducer;
