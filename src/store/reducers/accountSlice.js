import { createSlice } from '@reduxjs/toolkit';

const idle = { sending: false, result: null, error: '' };

/**
 * The account forms: register, verify (email link), forgot and reset
 * (password). Each has { sending, result: {message, devLink?}, error }.
 */
const accountSlice = createSlice({
  name: 'account',
  initialState: { register: idle, verify: idle, forgot: idle, reset: idle },
  reducers: {
    accountRequested: {
      reducer(state, action) {
        state[action.payload.form] = { ...idle, sending: true };
      },
      prepare: (form, fields) => ({ payload: { form, fields } }),
    },
    accountSucceeded(state, action) {
      state[action.payload.form] = { ...idle, result: action.payload.result };
    },
    accountFailed(state, action) {
      state[action.payload.form] = { ...idle, error: action.payload.error };
    },
    accountCleared(state, action) {
      state[action.payload] = idle;
    },
  },
  selectors: {
    selectAccountForm: (state, form) => state[form],
  },
});

export const { accountRequested, accountSucceeded, accountFailed, accountCleared } = accountSlice.actions;
export const { selectAccountForm } = accountSlice.selectors;
export default accountSlice.reducer;
