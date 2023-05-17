import { useState } from 'react';
import APIList from '../APIEditContainer/APIList';
import FigmaList from '../FigmaList';
import FigmaListItem from '../FigmaListItem';
import {
  EachCateApi,
  SpaceApiList,
  useSpaceApis,
} from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

type LeftContainerPropsType = {
  store?: any;
  selectedId: number;
  changeSelectedId: (idx: number) => void;
};

const LeftContainer = function ({
  store,
  selectedId,
  changeSelectedId,
}: LeftContainerPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [curTab, setCurTab] = useState<'Figma' | 'All'>('Figma');

  const ToggleTab = (selected: 'Figma' | 'All'): void => {
    setCurTab(selected);
  };
  const { data: spaceApis } = useSpaceApis(parseInt(spaceId));

  return (
    <div className={`flex flex-col h-full w-full`}>
      {/* 상단 탭 */}
      <ul className={`flex items-center gap-10 text-content mb-4`}>
        <li
          onClick={() => ToggleTab('Figma')}
          className={`${
            curTab === 'Figma' ? `text-mincho-strong` : `text-grayscale-dark`
          } cursor-pointer`}
        >
          화면별 api
        </li>
        <li
          onClick={() => ToggleTab('All')}
          className={`${
            curTab === 'All' ? `text-mincho-strong` : `text-grayscale-dark`
          } cursor-pointer`}
        >
          전체 api
        </li>
      </ul>
      <div className={`flex-1 overflow-y-scroll scrollbar-hide`}>
        {curTab === 'Figma' ? (
          //   화면별 api
          <FigmaList isConnect={true} changeApiId={changeSelectedId} />
        ) : (
          //   전체 api
          <APIList
            // apiList={spaceApis || { apiCategories: [] }}
            setSelectedIdHandler={changeSelectedId}
          />
        )}
      </div>
    </div>
  );
};

export default LeftContainer;
