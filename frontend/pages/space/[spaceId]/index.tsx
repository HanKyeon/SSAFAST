import { wrapper } from '@/store';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

const SpacePreviewPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const { spaceId } = router.query;
  console.log(props.dehydratedState);
  console.log(spaceId, '컴포넌트에서 호출');
  const { data } = useQuery({
    queryKey: [`asdf`],
    queryFn: async function () {
      return axios({
        method: `get`,
        baseURL: `https://api.figma.com`,
        url: `/v1/files/HIHVcGBjWhgE6sfaR6IKMj`,
        params: {
          depth: 3,
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIGMA_TEST_ACCESS_TOKEN}`,
        },
      }).then((res) => res.data);
    },
  });
  console.log(data);
  return (
    <>
      <div>하잏</div>
      <div>하잏</div>
      <div>{spaceId}</div>
    </>
  );
};

export default SpacePreviewPage;

export interface SpaceParams extends ParsedUrlQuery {
  spaceId: string;
}
// GetServerSideProps 타입은 제네릭을 받는다. props 내의 값에 대한 제네릭.
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async function (context) {
      const queryClient = new QueryClient();
      const figmaId = `HIHVcGBjWhgE6sfaR6IKMj`;
      await queryClient.prefetchQuery(['asdf'], () =>
        axios({
          method: `get`,
          baseURL: `https://api.figma.com`,
          url: `/v1/files/${figmaId}`,
          params: {
            depth: 3,
          },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIGMA_TEST_ACCESS_TOKEN}`,
          },
        }).then((res) => res.data)
      );

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    };
  });
