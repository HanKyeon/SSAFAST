import { useState } from 'react';
import { Box } from '../common';
import FigmaListItem from './FigmaListItem';
import { workFigma } from './presence-type';
import { useSyncedStore } from '@syncedstore/react';

const mok = [
  {
    figmaSectionId: `1`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e56c89a6-34b7-4c8b-9e49-22c7fd82c48a',
    refreshId: `4:14`,
    name: `홈 페이지 1`,
  },
  {
    figmaSectionId: `2`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbcc8976-b92d-4454-8e61-0050b7a42f95',
    refreshId: `115:522`,
    name: `space - space메인 - Dark`,
  },
  {
    figmaSectionId: `3`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d3ac41b-03ec-4491-9c63-1f4744d45650',
    refreshId: `101:417`,
    name: `space - space메인 - Light`,
  },
  {
    figmaSectionId: `4`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dba880b8-18c0-4835-ac27-b5af934d5806',
    refreshId: `232:1897`,
    name: `Figma화면에 api 연결 - 편집`,
  },
  {
    figmaSectionId: `5`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/35599cc7-27ff-4584-834a-e53af3849446',
    refreshId: `232:2481,232:2759`,
    name: `api명세 작성 - postman - dark`,
  },
];

interface Props {
  figmaList?: workFigma[];
  store?: any;
}

const FigmaList = function ({ figmaList = mok, store }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const changeIdxHandler = function (idx: number | null) {
    setActiveIdx(() => idx);
  };

  return (
    <div className="h-full w-full p-[3%] flex flex-col gap-[2%]">
      {/* {figmaList.map((figmaData, idx) => {
        return (
          <FigmaListItem
            figmaData={figmaData}
            idx={idx}
            activeIdx={activeIdx}
            setActive={changeIdxHandler}
            key={`${figmaData.name}-${idx}-${figmaData.figmaSectionId}`}
          />
        );
      })} */}
      {store?.space?.figmaList
        ? store.space.figmaList.map((figmaData: workFigma, idx: number) => {
            return (
              <FigmaListItem
                figmaData={figmaData}
                idx={idx}
                activeIdx={activeIdx}
                setActive={changeIdxHandler}
                key={`${figmaData.name}-${idx}-${figmaData.figmaSectionId}`}
              />
            );
          })
        : null}
    </div>
  );
};

export default FigmaList;
