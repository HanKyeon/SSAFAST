import { FigmaServerData } from '@/hooks/queries/queries';
import FigmaImageList from '../FigmaImageList';
import FigmaList from '../work/FigmaList';
import { workFigma } from '../work/presence-type';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  figmaRefineData: FigmaServerData[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  figmaId: string;
}

const SelectFigma = function ({
  figmaRefineData,
  selectedIds,
  setSelectedIds,
  figmaId,
}: Props) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-4">
      <div className="h-[20%] w-full flex items-center justify-center">
        사용할 화면을 선택해주세요.
      </div>
      <div className="h-[80%] w-full">
        <div className="box-border h-full w-full overflow-scroll flex flex-row flex-wrap items-center justify-center rounded-[13px] border-[3px] border-white py-10 gap-[5%]">
          <FigmaImageList
            images={figmaRefineData}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            figmaId={figmaId}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectFigma;
