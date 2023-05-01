import { wrapper } from '@/store';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClientOption } from '../_app';
import { useFigmaDatas, useFigmaSections } from '@/hooks/queries/queries';
import { useStoreDispatch } from '@/hooks/useStore';
import { figmaTokenActions } from '@/store/figma-token-slice';
import FigmaImageList from '@/components/FigmaImageList';
import { SpinnerDots } from '@/components/common/Spinner';
import useFigmaOrigin from '@/hooks/useFigmaOrigin';
import { useRouter } from 'next/router';
import AnimationBox from '@/components/common/AnimationBox';
import GetFigmaURL from '@/components/create/GetFigmaURL';
import GetSpaceData from '@/components/create/GetSpaceData';
import SelectFigma from '@/components/create/SelectFIgma';
import SpaceNavContainer from '@/components/preview/SpaceNavContainer';
import { useWidthHeight } from '@/hooks/useWidthHeight';
import { Box } from '@/components/common';

const SpaceCreatePage = function () {
  const router = useRouter();
  const [figmaId, setFigmaId] = useState<string>(``);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const {
    figmaData,
    figmaDataLoading,
    figmaImages,
    figmaImagesLoading,
    figmaRefineData,
  } = useFigmaOrigin(figmaId);

  const dispatch = useStoreDispatch();

  const setFigmaIdHandler = function () {
    setFigmaId(() => `GTrnPhdA7vjujMiA54I2QI`);
  };

  const setFigmaToken = function () {
    dispatch(
      figmaTokenActions.setTokens({
        figmaAccess: process.env.NEXT_PUBLIC_FIGMA_TEST_ACCESS_TOKEN,
        figmaRefresh: process.env.NEXT_PUBLIC_FIGMA_TEST_REFRESH_TOKEN,
      })
    );
    console.log('디스패치함');
  };
  const pushHandler = function () {
    router.push(`/`);
  };
  const fullBoxRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWidthHeight(fullBoxRef);
  console.log(step);
  return (
    <div ref={fullBoxRef} className="h-full w-full flex flex-row">
      <div className="h-full w-[250px]">사이드냅빠</div>
      <Box variant="two">
        <AnimationBox className="w-full h-full" isOpened={step === 1}>
          <GetFigmaURL />
        </AnimationBox>
        <AnimationBox className="w-full h-full" isOpened={step === 2}>
          <GetSpaceData />
        </AnimationBox>
        <AnimationBox className="w-full h-full" isOpened={step === 3}>
          <SelectFigma />
        </AnimationBox>
      </Box>
    </div>
  );
};

export default SpaceCreatePage;

export const getServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    const queryClient = new QueryClient(QueryClientOption);
    // 여기서 유저 정보를 받아서 figma token 확인
    // 있다면 figma token slice에 dispatch 하기.
    return {
      props: {
        asdf: `asf`,
        // 피그마 토큰 저장 여부 props로 내리기
      },
    };
  };
});
