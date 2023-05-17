import {
  configureStore,
  combineReducers,
  AnyAction,
  CombinedState,
  Reducer,
  EnhancedStore,
  Store,
} from '@reduxjs/toolkit';
import exSlice from './ex-slice';
import darkSlice, { darkActions } from './dark-slice';
import tokenSlice, { tokenActions, tokenState } from './token-slice';
import toastSlice, { toastActions, toastState } from './toast-slice';
import figmaTokenSlice, {
  figmaTokenActions,
  figmaTokenState,
} from './figma-token-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import yjsSlice from './yjs-slice';

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
  // yjsStore: yjsSlice,
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

export const persistor = persistStore(store);
export default store;
// 아래는 이전에 매번 redux가 재생성 되었음.

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
    dispatch(figmaTokenActions.resetTokens({}));
  };
};
