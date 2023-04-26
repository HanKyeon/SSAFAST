import { wrapper } from '@/store';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { QueryClientOption } from '../_app';
import { useFigmaDatas, useFigmaSections } from '@/hooks/queries/queries';
import { useStoreDispatch } from '@/hooks/useStore';
import { figmaTokenActions } from '@/store/figma-token-slice';
import FigmaImageList from '@/components/FigmaImageList';
import { SpinnerDots } from '@/components/common/Spinner';
import useFigmaOrigin from '@/hooks/useFigmaOrigin';
import { useRouter } from 'next/router';

const SpaceCreatePage = function () {
  const router = useRouter();
  const [figmaId, setFigmaId] = useState<string>(``);
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
  return (
    <div className="h-full w-full">
      <div onClick={setFigmaToken}>피그마 토큰 세팅하기</div>
      <div onClick={setFigmaIdHandler}>figma ID 우리꺼로 세팅</div>
      <div>하이요 스페이스 생성 라우팅</div>
      <div onClick={pushHandler}>이동</div>
      {figmaDataLoading ? <div>데이터 레이지쿼리 되는중</div> : <div>아님</div>}
      {figmaImagesLoading ? <div>이미지 레이지쿼리</div> : <div>끝남</div>}
      <div className="h-[80%] w-full overflow-y-scroll flex flex-row flex-wrap items-center justify-center gap-5 px-[10%]">
        {figmaDataLoading || figmaImagesLoading ? (
          <SpinnerDots />
        ) : (
          <FigmaImageList images={figmaRefineData} />
        )}
      </div>
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
