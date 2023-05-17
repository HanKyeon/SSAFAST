import { FigmaServerData } from '@/hooks/queries/queries';
import { useWidthHeight } from '@/hooks/useWidthHeight';
import { useRef } from 'react';

interface FigmaImageListItemProps {
  image: FigmaServerData;
  selectHandler: (id: string, isSelected?: boolean) => void;
}

const FigmaImageListItem = function ({
  image,
  selectHandler,
}: FigmaImageListItemProps) {
  const clickHandler = function () {
    selectHandler(image.figmaId, image.selected);
  };
  return (
    <div
      className={`w-[40%] h-[50%] flex box-border flex-col items-center justify-center hover:scale-[104%] duration-[0.33s] cursor-pointer p-3 border-emerald-500 ${
        image.selected ? 'rounded-[8px] border-[5px]' : 'rounded-[8px]'
      }`}
      onClick={clickHandler}
    >
      <img
        alt="이미지"
        src={image.image || ``}
        className="object-contain h-[75%] w-full"
      />
      <div className="h-[25%] text-[22px]">{image.name}</div>
    </div>
  );
};

export default FigmaImageListItem;
