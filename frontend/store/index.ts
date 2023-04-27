import {
  configureStore,
  combineReducers,
  AnyAction,
  CombinedState,
  Reducer,
  EnhancedStore,
  Store,
} from '@reduxjs/toolkit';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import exSlice, { exActions, exState } from './ex-slice';
import darkSlice, { darkActions } from './dark-slice';
import tokenSlice, { tokenActions, tokenState } from './token-slice';
import toastSlice, { toastActions, toastState } from './toast-slice';
import figmaTokenSlice, { figmaTokenState } from './figma-token-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// useSotre 에서 useStoreSelector와 useStoreDispatch를 일반적으로 사용하기 위한 타입
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// redux를 페이지 이동 시에도 유지하기 위해 redux-persist를 사용.
const persistConfig = {
  key: 'root',
  storage,
};
// 1. name에 맞게 reducer에 추가
const rootReducers = combineReducers({
  ex: exSlice,
  token: tokenSlice,
  toast: toastSlice,
  figmatoken: figmaTokenSlice,
  dark: darkSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const setupStore = function (context: EnhancedStore) {
  return store;
};

const makeStore: MakeStore<any> = function (context: any) {
  return setupStore(context);
};
export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(makeStore);
export default store;
// 아래는 이전에 매번 redux가 재생성 되었음.

// // 1. slice의 State를 StoreStates에 추가.
// interface StoreStates {
//   ex: exState;
//   token: tokenState;
//   toast: toastState;
//   figmatoken: figmaTokenState;
// }

// // 2. combinedReducer에 slice 추가 끝.
// const rootReducer = function (
//   state: StoreStates,
//   action: AnyAction
// ): CombinedState<StoreStates> {
//   switch (action.type) {
//     case HYDRATE:
//       return action.payload;
//     default: {
//       const combinedReducer = combineReducers({
//         ex: exSlice,
//         token: tokenSlice,
//         toast: toastSlice,
//         figmatoken: figmaTokenSlice,
//       });
//       return combinedReducer(state, action);
//     }
//   }
// };

// const makeStore = function () {
//   const store = configureStore({
//     reducer: rootReducer as Reducer<StoreStates, AnyAction>,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }),
//   });
//   return store;
// };

// const store = makeStore();
// export default store;

// export const wrapper = createWrapper(makeStore);

export const DispatchToast = function (
  message: string,
  isSuccess: boolean,
  nextURL?: string
) {
  return async function (dispatch: AppDispatch) {
    dispatch(toastActions.toastOff({}));
    dispatch(toastActions.setToastMessage({ message: message }));
    dispatch(toastActions.setIsSuccess({ isSuccess: isSuccess }));
    if (nextURL) {
      dispatch(toastActions.setURL({ url: nextURL }));
    } else {
      dispatch(toastActions.setURL({ url: null }));
    }
    dispatch(toastActions.setToast({}));
    setTimeout(function () {
      dispatch(toastActions.toastOff({}));
    }, 4000);
  };
};

export const DispatchLogout = function () {
  return async function (dispatch: AppDispatch) {
    dispatch(tokenActions.resetTokens({}));
  };
};
