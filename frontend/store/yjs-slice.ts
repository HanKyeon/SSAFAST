// import { SpaceFigma } from '@/hooks/queries/queries';
// import { RTCSpaceData } from '@/utils/syncedStore';
// import { createSlice } from '@reduxjs/toolkit';
// import syncedStore from '@syncedstore/core';
// import {
//   DocTypeDescription,
//   MappedTypeDescription,
// } from '@syncedstore/core/types/doc';

// // 1. state의 타입 선언
// export interface yjsState {
//   [key: string]: MappedTypeDescription<DocTypeDescription>;
// }

// // 2. state의 initialState 지정
// const initialState: yjsState = {};

// // 3. slice 생성
// const yjsSlice = createSlice({
//   name: `ex`,
//   initialState,
//   reducers: {
//     addYjsStore(state, action) {
//       state[`space${action.payload.spaceId}`] = syncedStore({
//         figmaList: [] as SpaceFigma[],
//         apiConnectList: [] as any[],
//         apiList: [] as any[],
//         useCaseList: [] as any[],
//         overloadList: [] as any[],
//         baseUrlList: [] as string[],
//         fragment: 'xml',
//       });
//     },
//     removeYjsStore(state, action) {
//       delete state[`space${action.payload.spaceId}`];
//     },
//   },
// });

// // 반환 할 때, default를 .reducer로 리턴해주면 굳이 index에서 .reducer로 호출 안해도 됨.
// export default yjsSlice.reducer;
// // 마찬가지로, 반환 할 때 actions를 정해서 return 한다면 index에서 .actions로 호출 할 필요 없음.
// export const yjsActions = yjsSlice.actions;
