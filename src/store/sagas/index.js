import { all, fork } from 'redux-saga/effects';
import healthSaga from './healthSaga';
import categoriesSaga from './categoriesSaga';

/** Add each new feature's watcher saga here. */
export default function* rootSaga() {
  yield all([fork(healthSaga), fork(categoriesSaga)]);
}
