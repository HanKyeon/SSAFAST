import { createSlice } from '@reduxjs/toolkit';

export interface figmaTokenState {
  figmaAccess: string;
  figmaRefresh: string;
}

const initialState: figmaTokenState = {
  figmaAccess: ``,
  figmaRefresh: ``,
};

const figmaTokenSlice = createSlice({
  name: 'figmatoken',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.figmaAccess = action.payload.figmaAccess;
      state.figmaRefresh = action.payload.figmaRefresh;
    },
    setAccessToken(state, action) {
      state.figmaAccess = action.payload.figmaAccess;
    },
    setRefreshToken(state, action) {
      state.figmaRefresh = action.payload.figmaRefresh;
    },
    resetTokens(state, action) {
      state.figmaAccess = ``;
      state.figmaRefresh = ``;
    },
  },
});

export const figmaTokenActions = figmaTokenSlice.actions;
export default figmaTokenSlice.reducer;
