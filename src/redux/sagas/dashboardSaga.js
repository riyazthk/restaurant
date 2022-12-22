import {put, takeLatest} from 'redux-saga/effects';
import {restauratnListApi} from '../../services/api';
import {
  getRestauratnListFailure,
  getRestauratnListRequest,
  getRestauratnListSuccess,
} from '../slices/dashSlice';

export function* getRestaurant(action) {
  console.log('action', action);
  try {
    const response = yield restauratnListApi(action.payload);
    console.log('res', response);
    yield put(getRestauratnListSuccess(response));
  } catch (e) {
    console.log('error', e);
    yield put(getRestauratnListFailure(e));
  }
}

export function* dashboardSaga() {
  yield takeLatest(getRestauratnListRequest.type, getRestaurant);
}
