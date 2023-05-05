import { RefObject, useCallback, useEffect, useState } from 'react';

const useInput = function (
  ref: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>,
  maxLength: number = 500
) {
  const [inputData, setInputData] = useState<string>(``);
  const [debouncedData, setDebouncedInput] = useState<string>();

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

  useEffect(
    function () {
      const timeId = setTimeout(function () {
        setDebouncedInput(() => ref.current?.value!);
      }, 300);
      return function () {
        clearTimeout(timeId);
      };
    },
    [inputData]
  );

  return {
    inputData,
    onChangeHandler,
    onResetHandler,
    setFstData,
    debouncedData,
  };
};

export default useInput;
