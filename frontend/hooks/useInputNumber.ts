import { RefObject, useCallback, useState } from 'react';

const useInputNumber = function (
  ref: RefObject<HTMLInputElement>,
  maxLength: number = 500
) {
  const [inputData, setInputData] = useState<number | 0>(0);

  const onChangeHandler = useCallback(function () {
    if (ref.current && ref.current?.value.length <= maxLength) {
      setInputData(() => parseInt(ref.current?.value as string) || 0);
    }
  }, []);

  const onResetHandler = useCallback(function () {
    if (ref.current) {
      ref.current.value = ``;
      setInputData(() => 0);
    }
  }, []);

  const setFstData = useCallback(function (fstData: number | 0) {
    if (ref.current) {
      ref.current.value = fstData?.toString() || ``;
      setInputData(() => fstData);
    }
  }, []);

  return {
    inputData,
    onChangeHandler,
    onResetHandler,
    setFstData,
  };
};

export default useInputNumber;
