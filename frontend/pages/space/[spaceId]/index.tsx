import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import apiRequest from '@/utils/axios';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import {
  useFigmaDatas,
  useSpaceDetail,
  useUserFigmaTokens,
} from '@/hooks/queries/queries';
import MetaHead from '@/components/common/MetaHead';
import SpaceNavContainer from '@/components/preview/SpaceNavContainer';
import PreviewLeftContainer from '@/components/preview/PreviewLeftContainer';
import PreviewRightContainer from '@/components/preview/PreviewRightContainer';
import { SpaceParams } from '..';

const SpacePreviewPage =
  // props: InferGetServerSidePropsType<typeof getServerSideProps>
  function () {
    const router = useRouter();
    const { spaceId } = router.query as SpaceParams;
    const {
      data: spaceDetail,
      isLoading: spaceDetailLoading,
      isError: spaceDetailError,
    } = useSpaceDetail(spaceId);
    const { data: figmaTokens } = useUserFigmaTokens();

    return (
      <>
        <MetaHead title="SSAFAST : space" description="프로젝트" url="/space" />
        <div className="flex h-full w-full gap-3 p-5">
          <SpaceNavContainer />
          <PreviewLeftContainer />
          <PreviewRightContainer />
        </div>
      </>
    );
  };

export default SpacePreviewPage;

// // GetServerSideProps 타입은 제네릭을 받는다. props 내의 값에 대한 제네릭.
// export const getServerSideProps: GetServerSideProps = async function (context) {
//   const queryClient = new QueryClient();
//   const { spaceId } = context.params as SpaceParams;
//   const figmaId = `HIHVcGBjWhgE6sfaR6IKMj`; // figma ID 역시 user의 spacedetail에서 가져온 것으로 fetch 해야함.
//   await queryClient.prefetchQuery({
//     queryKey: queryKeys.user(), // 이 부분은 user의 spacedetail로 변경해야함.
//     queryFn: async function () {
//       return apiRequest({
//         // 이 부분은 spaceId로 우리 db의 space Info를 가져오는 것.
//         method: `get`,
//       }).then((res) => {
//         // 여기서 store의 figmaToken을 팀의 토큰으로 dispatch 해주기.
//         // 여기서 figma ID 가져와두기.
//       });
//     },
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
