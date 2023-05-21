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
import LightLogo from '/public/assets/images/LightLogo.png';
import DarkLogo from '/public/assets/images/DarkLogo.png';
import Image from 'next/image';
import { useStoreSelector } from '@/hooks/useStore';

const SpacePage = function (): JSX.Element {
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <>
      <MetaHead title={`space`} description={`프로젝트`} url="/space" />
      <div className="flex h-full w-full gap-3 p-5">
        <SpaceNavContainer />
        <Box
          variant="two"
          className="h-full w-[80%] p-5 flex flex-col items-center justify-center gap-3"
        >
          <Image
            className="animate-[spinning_2s_infinite] get-pers"
            src={dark ? DarkLogo : LightLogo}
            alt="로고"
            width={216}
            height={191}
          />
          <div className="text-[48px]">SSAFAST</div>
          <div className="text-[22px]">당신의 프로젝트를 시작해보세요!</div>
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
