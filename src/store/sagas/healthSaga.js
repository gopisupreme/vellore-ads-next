import { call, put, takeLatest } from 'redux-saga/effects';
import { getHealth } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchHealth, fetchHealthFailure, fetchHealthSuccess } from '../reducers/healthSlice';

function* loadHealth() {
  try {
    const health = yield call(getHealth);
    yield put(fetchHealthSuccess(health));
  } catch (e) {
    yield put(fetchHealthFailure(errorMessage(e)));
  }
}

export default function* healthSaga() {
  yield takeLatest(fetchHealth.type, loadHealth);
}
