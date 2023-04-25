import { wrapper } from '@/store';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { QueryClientOption } from '../_app';

const SpaceCreatePage = function () {
  const [figmaId, setFigmaId] = useState<string>(``);
  useEffect(function () {}, [figmaId]);
  return (
    <>
      <div>하이요 스페이스 생성 라우팅</div>
    </>
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
