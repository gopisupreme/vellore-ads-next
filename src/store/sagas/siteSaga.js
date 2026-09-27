import { call, put, takeLatest } from 'redux-saga/effects';
import { getSite } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchSite, fetchSiteFailure, fetchSiteSuccess } from '../reducers/siteSlice';

function* loadSite() {
  try {
    const site = yield call(getSite);
    yield put(fetchSiteSuccess(site));
  } catch (e) {
    yield put(fetchSiteFailure(errorMessage(e)));
  }
}

export default function* siteSaga() {
  yield takeLatest(fetchSite.type, loadSite);
}
