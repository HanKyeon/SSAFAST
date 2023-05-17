import { Box } from '@/components/common';
import MetaHead from '@/components/common/MetaHead';
import PreviewLeftContainer from '@/components/preview/PreviewLeftContainer';
import PreviewRightContainer from '@/components/preview/PreviewRightContainer';
import SpaceNavContainer from '@/components/preview/SpaceNavContainer';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import apiRequest from '@/utils/axios';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

const SpacePage = function (): JSX.Element {
  return (
    <>
      <MetaHead title={`space`} description={`프로젝트`} url="/space" />
      <div className="flex h-full w-full gap-3 p-5">
        <SpaceNavContainer />
        <Box variant="two" className="h-full w-full">
          여기는 튜토리얼이나 서비스 이용 가이드 그런거 간단히 넣으면 될 듯
        </Box>
      </div>
    </>
  );
};

export default SpacePage;

export interface SpaceParams extends ParsedUrlQuery {
  spaceId: string;
}

// export const getServerSideProps: GetServerSideProps = async function (context) {
//   const queryClient = new QueryClient();

//   // queryClient.prefetchQuery({
//   //   queryKey: queryKeys.user(), // 이부분은 store에 담긴 유저 token으로 spaceList 키로 변경.
//   //   queryFn: async function () {
//   //     return apiRequest({
//   //       // token을 통해 유저의 spaceList 받아오기.
//   //     });
//   //   },
//   // });
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
