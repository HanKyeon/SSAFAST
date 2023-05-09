import { useState } from 'react';
import { Box } from '../common';
import FigmaListItem from './FigmaListItem';
import { workFigma } from './presence-type';
import { useSyncedStore } from '@syncedstore/react';
import { SpaceFigma } from '@/hooks/queries/queries';
import { useYjsState } from './YjsProvider';

interface Props {
  figmaList?: workFigma[];
}

const FigmaList = function ({ figmaList = [] }: Props) {
  const { state: yjsStore, figmaY } = useYjsState();
  const store = useSyncedStore(yjsStore);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const changeIdxHandler = function (idx: number | null) {
    setActiveIdx(() => idx);
  };

  const addSyncedStoreFigmaItem = function () {
    const addItem = {
      id: `6`,
      sectionUrl:
        'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/4dd4/f0211895f2765bf6459771ed1bc6b5c4e53ea4cc6024d291c8aee115445c.jpg',
      sectionId: `232:2759`,
      name: `무야호`,
    };
    if (figmaY) {
      figmaY.push([addItem]);
    }
  };
  const deleteFigmaYArr = function () {
    figmaY.delete(0);
  };

  return (
    <div className="h-full w-full p-[3%] flex flex-col gap-[2%]">
      {/* {figmaY.map((figmaData, idx) => {
        return (
          <FigmaListItem
            figmaData={figmaData}
            idx={idx}
            activeIdx={activeIdx}
            setActive={changeIdxHandler}
            key={`${figmaData.name}-${idx}-${figmaData.id}`}
          />
        );
      })} */}
      <Box onClick={addSyncedStoreFigmaItem}>store 관련 테스트 해봅시다.</Box>
      <Box onClick={deleteFigmaYArr}>삭제 테스트</Box>
      {figmaY.map((figmaData: SpaceFigma, idx: number) => {
        return (
          <FigmaListItem
            figmaData={figmaData}
            idx={idx}
            activeIdx={activeIdx}
            setActive={changeIdxHandler}
            key={`${figmaData.name}-${idx}-${figmaData.id}`}
          />
        );
      })}
    </div>
  );
};

export default FigmaList;
