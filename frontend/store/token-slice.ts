import { createSlice } from '@reduxjs/toolkit';

export interface tokenState {
  accessToken: string;
  refreshToken: string;
}

const initialState: tokenState = {
  accessToken: ``,
  refreshToken: ``,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload.refreshToken;
    },
    resetTokens(state, action) {
      state.accessToken = ``;
      state.refreshToken = ``;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export default tokenSlice.reducer;
