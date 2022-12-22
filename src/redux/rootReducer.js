import {combineReducers} from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashSlice';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});

export default rootReducer;
