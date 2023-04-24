import { RefObject, useEffect, useRef } from 'react';

type animateFunctionType = (ctx: CanvasRenderingContext2D) => void;

interface useCanvasHook {
  (
    canvasWidth: number,
    canvasHeight: number,
    animate: animateFunctionType
  ): RefObject<HTMLCanvasElement>;
}

export const useCanvas: useCanvasHook = function (
  canvasWidth,
  canvasHeight,
  animate
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(
    function () {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      const setCanvas = function () {
        const devicePixelRatio = window.devicePixelRatio ?? 1;
        if (canvas && ctx) {
          canvas.style.width = canvasWidth + 'px';
          canvas.style.height = canvasHeight + 'px';
          canvas.width = canvasWidth * devicePixelRatio;
          canvas.height = canvasHeight * devicePixelRatio;
          ctx.scale(devicePixelRatio, devicePixelRatio);
        }
      };
      setCanvas();

      let requestId: number;
      const requestAnimation = function () {
        requestId = window.requestAnimationFrame(requestAnimation);
        if (ctx) {
          animate(ctx);
        }
      };
      requestAnimation();

      return function () {
        window.cancelAnimationFrame(requestId);
      };
    },
    [canvasWidth, canvasHeight, animate]
  );

  return canvasRef;
};
