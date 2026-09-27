import { createSlice } from '@reduxjs/toolkit';

/**
 * The quick service request / quick enquiry form (api/quick-request.php),
 * used on the home page and in the footer's pop-up.
 */
const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: { sending: false, message: '', error: '', dialogOpen: false },
  reducers: {
    enquirySubmitted(state) {
      state.sending = true;
      state.message = '';
      state.error = '';
    },
    enquirySent(state, action) {
      state.sending = false;
      state.message = action.payload;
    },
    enquiryFailed(state, action) {
      state.sending = false;
      state.error = action.payload;
    },
    enquiryReset(state) {
      state.message = '';
      state.error = '';
    },
    enquiryDialogToggled(state, action) {
      state.dialogOpen = action.payload;
      state.message = '';
      state.error = '';
    },
  },
  selectors: {
    selectEnquiry: (state) => state,
  },
});

export const { enquirySubmitted, enquirySent, enquiryFailed, enquiryReset, enquiryDialogToggled } = enquirySlice.actions;
export const { selectEnquiry } = enquirySlice.selectors;
export default enquirySlice.reducer;
