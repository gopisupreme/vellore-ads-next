import { call, put, takeEvery } from 'redux-saga/effects';
import { forgotPassword, register, resetPassword, verifyEmail } from '@/services/api';
import { errorMessage } from './errorMessage';
import { accountFailed, accountRequested, accountSucceeded } from '../reducers/accountSlice';

const CALLS = { register, verify: verifyEmail, forgot: forgotPassword, reset: resetPassword };

function* submit(action) {
  const { form, fields } = action.payload;
  try {
    const result = yield call(CALLS[form], fields);
    yield put(accountSucceeded({ form, result }));
  } catch (e) {
    yield put(accountFailed({ form, error: errorMessage(e) }));
  }
}

export default function* accountSaga() {
  yield takeEvery(accountRequested.type, submit);
}
