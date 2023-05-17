import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';

interface Params {
  setDataFn: Dispatch<SetStateAction<any>>;
  inputRef: RefObject<HTMLInputElement>;
}

export const useCreateInput = function (
  setDataFn: Dispatch<SetStateAction<any>>,
  inputRef: RefObject<HTMLInputElement>,
  fstData: any
) {
  // ref 첫 데이터 세팅
  useEffect(function () {
    //
  }, []);
  const onChangeHandler = useCallback(function () {
    //
  }, []);
  useEffect(function () {
    //
  }, []);
};
