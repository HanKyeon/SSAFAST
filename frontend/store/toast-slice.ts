import { createSlice } from '@reduxjs/toolkit';

export interface toastState {
  isToast: boolean;
  isSuccess: boolean | null;
  message: string;
  nextURL: null | string;
}

const initialState: toastState = {
  isToast: false,
  isSuccess: null,
  message: '',
  nextURL: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast(state, action) {
      state.isToast = true;
    },
    toastOff(state, action) {
      state.isToast = false;
    },
    setToastMessage(state, action) {
      state.message = action.payload.message;
    },
    setIsSuccess(state, action) {
      state.isSuccess = action.payload.isSuccess;
    },
    setURL(state, action) {
      state.nextURL = action.payload.url;
    },
  },
});

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
