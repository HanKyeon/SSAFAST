import { Box } from '@/components/common';
import BoxHeader from '@/components/common/BoxHeader';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import FigmaList from '../FigmaList';
import { useEffect, useState } from 'react';
import { useSectionsApi } from '@/hooks/queries/queries';
import RightContainer from './RightContainer';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const APIConnectContainer = function ({ store, serverSideStore }: Props) {
  // const {data:sectionApiList, isLoading, isError} = useSectionsApi(store.);

  const [sectionId, setSectionId] = useState<string | number | null>(null);

  const onChangeSection = (id: string | number): void => {
    setSectionId(id);
  };

  useEffect(() => {
    // sectionId가 변하면 거기 연결되어있는 api list 목록 가져와서 뿌림
    console.log('sectionId', sectionId);
  }, [sectionId]);

  return (
    <div className={`h-full flex justify-center items-center gap-3`}>
      {/* 왼쪽 */}
      <Box variant="two" className={`h-full p-5 flex-1 flex flex-col`}>
        <BoxHeader title="Figma" />
        <div className={`flex-1 overflow-y-scroll scrollbar-hide`}>
          <FigmaList onChangeSection={onChangeSection} />
        </div>
      </Box>
      {/* 오른쪽 */}
      <Box className={`h-full p-5 flex-1 flex flex-col`}>
        <RightContainer />
      </Box>
    </div>
  );
};

export default APIConnectContainer;
