import { createSlice } from '@reduxjs/toolkit';

// 1. state의 타입 선언
export interface darkState {
  dark: boolean;
  presence: boolean;
}

// 2. state의 initialState 지정
const initialState: darkState = {
  dark: true,
  presence: true,
};

// 3. slice 생성
const darkSlice = createSlice({
  name: `dark`,
  initialState,
  reducers: {
    toggleDark(state, action) {
      state.dark = !state.dark;
    },
    togglePresencs(state, action) {
      state.presence = !state.presence;
    },
  },
});

// 반환 할 때, default를 .reducer로 리턴해주면 굳이 index에서 .reducer로 호출 안해도 됨.
export default darkSlice.reducer;
// 마찬가지로, 반환 할 때 actions를 정해서 return 한다면 index에서 .actions로 호출 할 필요 없음.
export const darkActions = darkSlice.actions;
