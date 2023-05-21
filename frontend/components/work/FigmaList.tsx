import { useState } from 'react';
import { Box } from '../common';
import FigmaListItem from './FigmaListItem';
import { workFigma } from './presence-type';
import { useSyncedStore } from '@syncedstore/react';
import {
  EachCateApi,
  SpaceFigma,
  useSpaceFrames,
} from '@/hooks/queries/queries';
import { useYjsState } from './YjsProvider';
import BoxHeader from '../common/BoxHeader';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

const mok = [
  {
    id: 1,
    sectionId: `1`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e56c89a6-34b7-4c8b-9e49-22c7fd82c48a',
    name: `홈 페이지 1`,
  },
  {
    id: 2,
    sectionId: `2`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbcc8976-b92d-4454-8e61-0050b7a42f95',
    name: `space - space메인 - Dark`,
  },
  {
    id: 3,
    sectionId: `3`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d3ac41b-03ec-4491-9c63-1f4744d45650',
    name: `space - space메인 - Light`,
  },
  {
    id: 4,
    sectionId: `4`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dba880b8-18c0-4835-ac27-b5af934d5806',
    name: `Figma화면에 api 연결 - 편집`,
  },
  {
    id: 5,
    sectionId: `5`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/35599cc7-27ff-4584-834a-e53af3849446',
    name: `api명세 작성 - postman - dark`,
  },
];

interface Props {
  figmaList?: SpaceFigma[];
  apiData?: EachCateApi[];
  onChangeSection?: (id: string | number) => void;
  isConnect?: boolean;
  changeApiId?: (id: number) => void;
}

const FigmaList = function ({
  onChangeSection,
  apiData,
  figmaList,
  isConnect = false,
  changeApiId,
}: Props) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const { data: figmaFrameList } = useSpaceFrames(parseInt(spaceId));

  const changeIdxHandler = function (idx: number | null) {
    console.log(activeIdx);
    setActiveIdx(() => idx);
    if (onChangeSection && idx) {
      onChangeSection(idx);
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-2`}>
        {figmaFrameList?.figmaSections.map(
          (figmaData: SpaceFigma, idx: number) => {
            return (
              <FigmaListItem
                key={`${figmaData.name}-${idx}-${figmaData.id}`}
                isConnect={isConnect}
                figmaData={figmaData}
                headerIdx={idx}
                idx={figmaData.id as number}
                activeIdx={activeIdx}
                setActive={changeIdxHandler}
                changeApiId={changeApiId}
              />
            );
          }
        )}
      </div>
    </>
  );
};

export default FigmaList;
