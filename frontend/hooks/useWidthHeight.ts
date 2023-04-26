import { RefObject, useEffect, useState } from 'react'; //

interface useWidthHeightHook {
  (ref: RefObject<HTMLElement>): { width: number; height: number };
}

export const useWidthHeight: useWidthHeightHook = function (ref) {
  const [width, setWidth] = useState<number>(ref.current?.offsetWidth || 0);
  const [height, setHeight] = useState<number>(ref.current?.offsetHeight || 0);

  const setCustomWidthHeight: () => void = function () {
    if (ref.current) {
      setWidth(() => ref.current?.offsetWidth || 0);
      setHeight(() => ref.current?.offsetHeight || 0);
    }
  };
  useEffect(
    function () {
      setCustomWidthHeight();
      window.addEventListener('resize', setCustomWidthHeight);
      return function () {
        window.removeEventListener('resize', setCustomWidthHeight);
      };
    },
    [ref.current]
  );

  return { width, height };
};
