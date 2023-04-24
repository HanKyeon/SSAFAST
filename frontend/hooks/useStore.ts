import { AppDispatch, RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useStoreDispatch = function () {
  return useDispatch<AppDispatch>();
};

// // 커스텀 훅 사용 시 타입 선언 필요 없음.
// const exams = useStoreSelector((state) => state.example)
// // 일반 useSelector 사용 시 RootState 타입 선언 필요.
// const exams2 = useSelector((state: RootState) => state.example)
