import { call, put, takeLatest } from 'redux-saga/effects';
import { getCategories } from '@/services/api';
import { errorMessage } from './errorMessage';
import { fetchCategories, fetchCategoriesFailure, fetchCategoriesSuccess } from '../reducers/categoriesSlice';

function* loadCategories(action) {
  try {
    const categories = yield call(getCategories, action.payload);
    yield put(fetchCategoriesSuccess(categories));
  } catch (e) {
    yield put(fetchCategoriesFailure(errorMessage(e)));
  }
}

export default function* categoriesSaga() {
  yield takeLatest(fetchCategories.type, loadCategories);
}
