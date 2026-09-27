import { call, put, takeLatest } from 'redux-saga/effects';
import { getMenuCounts } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchMenuCounts, fetchMenuCountsFailure, fetchMenuCountsSuccess } from '../reducers/adminSlice';

function* loadMenuCounts() {
  try {
    const counts = yield call(getMenuCounts);
    yield put(fetchMenuCountsSuccess(counts));
  } catch (e) {
    yield put(fetchMenuCountsFailure(errorMessage(e)));
  }
}

export default function* adminSaga() {
  yield takeLatest(fetchMenuCounts.type, loadMenuCounts);
}
