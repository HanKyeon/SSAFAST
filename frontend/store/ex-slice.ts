import { createSlice } from '@reduxjs/toolkit';

// 1. state의 타입 선언
export interface exState {
  ex: string;
}

// 2. state의 initialState 지정
const initialState: exState = {
  ex: `예시 스토어`,
};

// 3. slice 생성
const exSlice = createSlice({
  name: `ex`,
  initialState,
  reducers: {
    setEx(state, action) {
      state.ex = action.payload.ex;
    },
  },
});

// 반환 할 때, default를 .reducer로 리턴해주면 굳이 index에서 .reducer로 호출 안해도 됨.
export default exSlice.reducer;
// 마찬가지로, 반환 할 때 actions를 정해서 return 한다면 index에서 .actions로 호출 할 필요 없음.
export const exActions = exSlice.actions;
