import { call, put, takeLatest } from 'redux-saga/effects';
import { getHome, getLayout, sendQuickRequest } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchLayout, fetchLayoutFailure, fetchLayoutSuccess } from '../reducers/layoutSlice';
import { fetchHome, fetchHomeFailure, fetchHomeSuccess } from '../reducers/homeSlice';
import { enquiryFailed, enquirySent, enquirySubmitted } from '../reducers/enquirySlice';

function* loadLayout() {
  try {
    yield put(fetchLayoutSuccess(yield call(getLayout)));
  } catch (e) {
    yield put(fetchLayoutFailure(errorMessage(e)));
  }
}

function* loadHome() {
  try {
    yield put(fetchHomeSuccess(yield call(getHome)));
  } catch (e) {
    yield put(fetchHomeFailure(errorMessage(e)));
  }
}

function* sendEnquiry(action) {
  try {
    yield put(enquirySent(yield call(sendQuickRequest, action.payload)));
  } catch (e) {
    yield put(enquiryFailed(errorMessage(e)));
  }
}

/** The public site: header/footer data, the home page and the enquiry form. */
export default function* publicSaga() {
  yield takeLatest(fetchLayout.type, loadLayout);
  yield takeLatest(fetchHome.type, loadHome);
  yield takeLatest(enquirySubmitted.type, sendEnquiry);
}
