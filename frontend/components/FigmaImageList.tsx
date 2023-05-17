import { FigmaServerData } from '@/hooks/queries/queries';
import FigmaImageListItem from './FigmaImageListItem';
import { Dispatch, SetStateAction } from 'react';
import useFigmaOrigin from '@/hooks/useFigmaOrigin';

interface FigmaImageListProps {
  images: FigmaServerData[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  figmaId: string;
}

const FigmaImageList = function ({
  images,
  selectedIds,
  setSelectedIds,
  figmaId,
}: FigmaImageListProps) {
  const {} = useFigmaOrigin(figmaId, ``, selectedIds);
  const selectHandler = function (id: string, isSelected?: boolean) {
    if (isSelected) {
      setSelectedIds(() =>
        selectedIds.filter((figmaData) => {
          return figmaData !== id;
        })
      );
    } else {
      setSelectedIds((val) => [...val, id]);
    }
  };
  return (
    <>
      {images.map((image, idx) => {
        return (
          <FigmaImageListItem
            image={image}
            key={`${idx} ${image.figmaId}`}
            selectHandler={selectHandler}
          />
        );
      })}
    </>
  );
};

export default FigmaImageList;
