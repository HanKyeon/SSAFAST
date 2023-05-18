import { FC, memo, useEffect } from 'react';
import { useCanvas } from '@/hooks/useCanvas';
import { MTO, MTOInterface } from './MouseTrackingObject';
import { useStoreSelector } from '@/hooks/useStore';
// import { SecondWaveBackground } from "./SecondWaveBackground"
const colors = [
  'rgba(66, 66, 66, 0.7)',
  'rgba(88, 88, 88, 0.7)',
  'rgba(111, 111, 111, 0.7)',
  // 'rgba(217, 217, 217, 0.7)',
];

const blColors = (dark: boolean, i: number) =>
  dark
    ? [
        `rgba(77, 203, 186, 0.66)`,
        `rgba(152, 229, 219, 0.66)`,
        `rgba(193, 239, 233, 0.66)`,
      ][i]
    : [
        `rgba(146, 133, 229, 0.66)`,
        `rgba(168, 158, 231, 0.66)`,
        `rgba(211, 206, 243, 0.66)`,
      ][i];
interface waveProps {
  canvasWidth: number;
  canvasHeight: number;
}

const MouseTracking: FC<waveProps> = function ({ canvasWidth, canvasHeight }) {
  const { dark } = useStoreSelector((state) => state.dark);
  const fillBackground = function (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(31, 31, 31, 1)';
    // ctx.fillStyle = "rgba(249, 170, 70, 1)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };
  let objts: MTOInterface[] = [];
  for (let i = 0; i < 1000; i++) {
    let MTOOBJ = new MTO(canvasWidth, canvasHeight, blColors(dark, i % 3));
    MTOOBJ.setting();
    objts.push(MTOOBJ);
  }

  const animate = function (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    fillBackground(ctx);
    objts.forEach((obj) => {
      obj.draw(ctx);
    });
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return <canvas ref={canvasRef} />;
};

export default memo(MouseTracking);
