import {all} from 'ramda';
import {dashboardSaga} from './dashboardSaga';

const root = function* root() {
  yield all([dashboardSaga()]);
};

export default root;
