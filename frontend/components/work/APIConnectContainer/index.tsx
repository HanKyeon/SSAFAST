import { Box } from '@/components/common';
import BoxHeader from '@/components/common/BoxHeader';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import FigmaList from '../FigmaList';
import { useEffect, useState } from 'react';
import { useSectionsApi, useSpaceFrames } from '@/hooks/queries/queries';
import RightContainer from './RightContainer';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const APIConnectContainer = function ({ store, serverSideStore }: Props) {
  // useSpaceFrames();
  // const {data:sectionApiList, isLoading, isError} = useSectionsApi(store.);

  const [sectionId, setSectionId] = useState<string | number>(0);

  const onChangeSection = (id: string | number): void => {
    setSectionId((oid) => {
      console.log(id, '열었어요');
      return id;
    });
  };

  // useEffect(() => {
  //   // sectionId가 변하면 거기 연결되어있는 api list 목록 가져와서 뿌림
  //   console.log('sectionId', sectionId);
  // }, [sectionId]);

  return (
    <Box
      variant="one"
      className={`h-full w-full flex justify-center items-center gap-[1.12%]`}
    >
      {/* 왼쪽 */}
      <Box
        variant="two"
        className={`h-full p-5 flex-1 flex flex-col basis-[50%] w-[50%]`}
      >
        <BoxHeader title="Figma" />
        <div className={`flex-1 overflow-y-scroll scrollbar-hide`}>
          <FigmaList onChangeSection={onChangeSection} isConnect={true} />
        </div>
      </Box>
      {/* 오른쪽 */}
      <Box className={`h-full p-5 flex-1 flex flex-col basis-[50%] w-[50%]`}>
        <RightContainer sectionId={sectionId} />
      </Box>
    </Box>
  );
};

export default APIConnectContainer;
