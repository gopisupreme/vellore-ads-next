import { all, fork } from 'redux-saga/effects';
import accountSaga from './accountSaga';
import adminSaga from './adminSaga';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import publicSaga from './publicSaga';
import siteSaga from './siteSaga';

/** Add each new feature's watcher saga here. */
export default function* rootSaga() {
  yield all([fork(accountSaga), fork(adminSaga), fork(authSaga), fork(dashboardSaga), fork(publicSaga), fork(siteSaga)]);
}
