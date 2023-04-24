import { RefObject, useCallback, useState } from 'react';

const useInput = function (
  ref: RefObject<HTMLInputElement>,
  maxLength: number = 50
) {
  const [inputData, setInputData] = useState<string>(``);

  const onChangeHandler = useCallback(function () {
    if (ref.current && ref.current?.value.length <= maxLength) {
      setInputData(() => ref.current?.value || ``);
    }
  }, []);

  const onResetHandler = useCallback(function () {
    if (ref.current) {
      ref.current.value = ``;
      setInputData(() => ``);
    }
  }, []);

  const setFstData = useCallback(function (fstData: string) {
    if (ref.current) {
      ref.current.value = fstData;
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

export default useInput;
