import { createSlice } from '@reduxjs/toolkit';

/**
 * Who is signed in. `checked` turns true once the session has been asked
 * about (api/auth/me.php), so pages can tell "signed out" from "not known yet".
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, checked: false, loggingIn: false, error: '' },
  reducers: {
    checkSession() {},
    sessionChecked(state, action) {
      state.user = action.payload;
      state.checked = true;
    },
    loginRequested(state) {
      state.loggingIn = true;
      state.error = '';
    },
    loginSucceeded(state, action) {
      state.loggingIn = false;
      state.user = action.payload;
      state.checked = true;
    },
    loginFailed(state, action) {
      state.loggingIn = false;
      state.error = action.payload;
    },
    loginErrorCleared(state) {
      state.error = '';
    },
    logoutRequested() {},
    loggedOut(state) {
      state.user = null;
      state.checked = true;
    },
  },
  selectors: {
    selectAuth: (state) => state,
    selectUser: (state) => state.user,
  },
});

export const {
  checkSession,
  sessionChecked,
  loginRequested,
  loginSucceeded,
  loginFailed,
  loginErrorCleared,
  logoutRequested,
  loggedOut,
} = authSlice.actions;
export const { selectAuth, selectUser } = authSlice.selectors;
export default authSlice.reducer;
