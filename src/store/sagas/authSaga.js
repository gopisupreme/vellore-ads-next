import { call, put, takeLatest } from 'redux-saga/effects';
import { getCurrentUser, login, logout } from '@/services/api';
import { errorMessage } from './errorMessage';
import {
  checkSession,
  loggedOut,
  loginFailed,
  loginRequested,
  loginSucceeded,
  logoutRequested,
  sessionChecked,
} from '../reducers/authSlice';

function* loadSession() {
  try {
    const user = yield call(getCurrentUser);
    yield put(sessionChecked(user));
  } catch {
    // the API is unreachable: treat as signed out, the login page says why on submit
    yield put(sessionChecked(null));
  }
}

function* signIn(action) {
  try {
    const user = yield call(login, action.payload);
    yield put(loginSucceeded(user));
  } catch (e) {
    yield put(loginFailed(errorMessage(e)));
  }
}

function* signOut() {
  try {
    yield call(logout);
  } finally {
    yield put(loggedOut());
  }
}

export default function* authSaga() {
  yield takeLatest(checkSession.type, loadSession);
  yield takeLatest(loginRequested.type, signIn);
  yield takeLatest(logoutRequested.type, signOut);
}
