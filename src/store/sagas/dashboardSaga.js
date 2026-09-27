import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { deleteListing, getAdminDashboard, toggleListing } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchMenuCounts } from '../reducers/adminSlice';
import {
  fetchDashboard,
  fetchDashboardFailure,
  fetchDashboardSuccess,
  listingActionFailed,
  listingDeleteRequested,
  listingRemoved,
  listingToggleRequested,
  listingUpdated,
} from '../reducers/dashboardSlice';

function* loadDashboard() {
  try {
    const data = yield call(getAdminDashboard);
    yield put(fetchDashboardSuccess(data));
  } catch (e) {
    yield put(fetchDashboardFailure(errorMessage(e)));
  }
}

function* toggle(action) {
  try {
    const listing = yield call(toggleListing, action.payload);
    yield put(listingUpdated(listing));
  } catch (e) {
    yield put(listingActionFailed(errorMessage(e)));
  }
}

function* remove(action) {
  try {
    yield call(deleteListing, action.payload);
    yield put(listingRemoved(action.payload.id));
    yield put(fetchMenuCounts()); // the menu's listing and review numbers changed
  } catch (e) {
    yield put(listingActionFailed(errorMessage(e)));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboard.type, loadDashboard);
  yield takeEvery(listingToggleRequested.type, toggle);
  yield takeEvery(listingDeleteRequested.type, remove);
}
