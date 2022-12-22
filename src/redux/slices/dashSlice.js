import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  error: null,
  restaurantList: [],
};

const dashSlice = createSlice({
  initialState,
  name: 'dashboard',
  reducers: {
    getRestauratnListRequest(state, action) {
      console.log('reuest log');
      state.dash_loading = true;
    },
    getRestauratnListSuccess(state, action) {
      //   state.restaurantList = action.payload;
    },
    getRestauratnListFailure(state, action) {},
  },
});
export const {
  getRestauratnListRequest,
  getRestauratnListSuccess,
  getRestauratnListFailure,
} = dashSlice.actions;

export default dashSlice.reducer;
