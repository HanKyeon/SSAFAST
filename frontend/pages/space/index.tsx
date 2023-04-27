import PreviewLeftContainer from '@/components/preview/PreviewLeftContainer';
import PreviewRightContainer from '@/components/preview/PreviewRightContainer';
import SpaceNavContainer from '@/components/preview/SpaceNavContainer';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import { wrapper } from '@/store';
import apiRequest from '@/utils/axios';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

const SpacePage = function (): JSX.Element {
  return (
    <div className={'flex'}>
      <SpaceNavContainer />
      <PreviewLeftContainer />
      <PreviewRightContainer />
    </div>
  );
};

export default SpacePage;

export interface SpaceParams extends ParsedUrlQuery {
  spaceId: string;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async function (context) {
      const queryClient = new QueryClient();
      queryClient.prefetchQuery({
        queryKey: queryKeys.user(), // 이부분은 store에 담긴 유저 token으로 spaceList 키로 변경.
        queryFn: async function () {
          return apiRequest({
            // token을 통해 유저의 spaceList 받아오기.
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
