import { FigmaServerData } from '@/hooks/queries/queries';
import FigmaImageListItem from './FigmaImageListItem';

interface FigmaImageListProps {
  images: FigmaServerData[];
}

const FigmaImageList = function ({ images }: FigmaImageListProps) {
  return (
    <>
      {images.map((image, idx) => {
        return (
          <FigmaImageListItem image={image} key={`${idx} ${image.figmaId}`} />
        );
      })}
    </>
  );
};

export default FigmaImageList;
