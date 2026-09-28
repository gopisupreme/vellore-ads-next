import { call, put, takeEvery } from 'redux-saga/effects';
import { getMemberDashboard } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchMemberDashboard, fetchMemberDashboardFailure, fetchMemberDashboardSuccess } from '../reducers/memberSlice';

function* loadDashboard(action) {
  const kind = action.payload;
  try {
    const data = yield call(getMemberDashboard, kind);
    yield put(fetchMemberDashboardSuccess({ kind, data }));
  } catch (e) {
    yield put(fetchMemberDashboardFailure({ kind, error: errorMessage(e) }));
  }
}

export default function* memberSaga() {
  yield takeEvery(fetchMemberDashboard.type, loadDashboard);
}
