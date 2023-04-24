import {
  configureStore,
  combineReducers,
  AnyAction,
  CombinedState,
  Reducer,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import exSlice, { exActions, exState } from './ex-slice';
import tokenSlice, { tokenActions, tokenState } from './token-slice';
import toastSlice, { toastActions, toastState } from './toast-slice';

// useSotre 에서 useStoreSelector와 useStoreDispatch를 일반적으로 사용하기 위한 타입
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// 1. slice의 State를 StoreStates에 추가.
interface StoreStates {
  ex: exState;
  token: tokenState;
  toast: toastState;
}

// 2. combinedReducer에 slice 추가 끝.
const rootReducer = function (
  state: StoreStates,
  action: AnyAction
): CombinedState<StoreStates> {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        ex: exSlice,
        token: tokenSlice,
        toast: toastSlice,
      });
      return combinedReducer(state, action);
    }
  }
};

const makeStore = function () {
  const store = configureStore({
    reducer: rootReducer as Reducer<StoreStates, AnyAction>,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return store;
};

const store = makeStore();
export default store;

export const wrapper = createWrapper(makeStore);

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
