import React, { FC, PropsWithChildren } from 'react';
import { useEffect, useState, useCallback } from 'react';

interface animationHook {
  (isOpened?: boolean, appearClassName?: string, disappearClassName?: string): {
    isRender: boolean;
    animationClasses: string;
    animationEndHandler: () => void;
  };
}

export const useAnimate: animationHook = function (
  isOpened = true,
  appearClassName = 'animate-appear-from-bottom-fast',
  disappearClassName = 'animate-disappear-to-bottom-fast'
) {
  const [isAnimate, setIsAnimate] = useState<boolean>(isOpened);
  const [isRender, setIsRender] = useState<boolean>(isOpened || isAnimate);
  const [animationClasses, setAnimationClasses] = useState<string>('');

  useEffect(
    function () {
      if (isOpened) {
        setIsAnimate(() => true);
        setAnimationClasses(() => appearClassName + ` `);
      } else {
        setAnimationClasses(() => disappearClassName + ` absolute`);
      }
    },
    [isOpened, appearClassName, disappearClassName]
  );

  useEffect(
    function () {
      setIsRender(() => isOpened || isAnimate);
    },
    [isOpened, isAnimate]
  );

  useEffect(
    function () {
      if (!isRender) {
        setAnimationClasses(() => '');
      }
    },
    [isRender]
  );

  // 열지 않기 원하는데 animation이 끝났을 때만 false로 바꿔준다.
  const animationEndHandler: () => void = useCallback(
    function () {
      if (isOpened === false) {
        setIsAnimate(() => false);
      }
    },
    [isOpened]
  );

  return {
    isRender,
    animationClasses,
    animationEndHandler,
  };
};

interface transitionHook {
  (
    isOpen?: boolean,
    appearTransitionClass?: string,
    disappearTransitionClass?: string
  ): {
    isRender: boolean;
    transitionClasses: string;
    transitionEndHandler: () => void;
  };
}
export const useTransition: transitionHook = function (
  isOpened = true,
  appearTransitionClass = 'animate-appear-from-bottom-fast',
  disappearTransitionClass = 'animate-disappear-to-bottom-fast'
) {
  const [isTransition, setIsTransition] = useState<boolean>(isOpened);
  const [isRender, setIsRender] = useState<boolean>(isOpened || isTransition);
  const [transitionClasses, setTransitionClasses] = useState<string>('');

  useEffect(
    function () {
      if (isOpened) {
        setIsTransition(() => true);
        setTransitionClasses(() => appearTransitionClass + ` `);
      } else {
        setTransitionClasses(() => disappearTransitionClass + ` absolute`);
      }
    },
    [isOpened, appearTransitionClass, disappearTransitionClass]
  );

  useEffect(
    function () {
      setIsRender(() => isOpened || isTransition);
    },
    [isOpened, isTransition]
  );

  useEffect(
    function () {
      if (!isRender) {
        setTransitionClasses(() => '');
      }
    },
    [isRender]
  );

  // 열지 않기 원하는데 transition 끝났을 때만 false로 바꿔준다.
  const transitionEndHandler: () => void = useCallback(
    function () {
      if (isOpened === false) {
        setIsTransition(() => false);
      }
    },
    [isOpened]
  );
  return {
    isRender,
    transitionClasses,
    transitionEndHandler,
  };
};
