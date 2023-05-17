import { useEffect, useState } from 'react';

const useDebounce = function (
  value: any,
  delay: number = 1000
): { value: any } {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);
  useEffect(
    function () {
      const timeId = setTimeout(function () {
        setDebouncedValue(() => value);
      }, delay);
      return function () {
        clearTimeout(timeId);
      };
    },
    [value, debouncedValue]
  );
  return debouncedValue;
};

export default useDebounce;
