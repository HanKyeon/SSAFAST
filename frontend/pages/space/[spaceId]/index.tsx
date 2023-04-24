import { wrapper } from '@/store';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { SpaceParams } from '..';
import apiRequest from '@/utils/axios';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import { useFigmaDatas } from '@/hooks/queries/queries';

const SpacePreviewPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const { spaceId } = router.query;
  console.log(props.dehydratedState);
  console.log(spaceId, '컴포넌트에서 호출');
  const { data, isLoading, isFetching, isInitialLoading } = useFigmaDatas(``);
  console.log(data);
  return (
    <>
      {isLoading ? <div>피그마 데이터 로딩중임</div> : <div>콘솔에 떴음</div>}
      {isFetching ? <div>페칭중</div> : <div>아님</div>}
      {isInitialLoading ? <div>첫로디잉ㅁ</div> : <div>아님다</div>}
      <div>하잏</div>
      <div>하잏</div>
      <div>{spaceId}</div>
    </>
  );
};

export default SpacePreviewPage;

// GetServerSideProps 타입은 제네릭을 받는다. props 내의 값에 대한 제네릭.
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async function (context) {
      const queryClient = new QueryClient();
      const { spaceId } = context.query as SpaceParams;
      const figmaId = `HIHVcGBjWhgE6sfaR6IKMj`;
      await queryClient.prefetchQuery({
        queryKey: queryKeys.user(), // 이 부분은 user의 spaceList로 변경해야함.
        queryFn: async function () {
          return apiRequest({
            // 이 부분은 spaceId로 우리 db의 space Info를 가져오는 것.
            method: `get`,
          });
        },
      });

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    };
  });
