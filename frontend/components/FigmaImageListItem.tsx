import { FigmaServerData } from '@/hooks/queries/queries';
import { useWidthHeight } from '@/hooks/useWidthHeight';
import Image from 'next/image';
import { useRef } from 'react';

interface FigmaImageListItemProps {
  image: FigmaServerData;
}

const FigmaImageListItem = function ({ image }: FigmaImageListItemProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWidthHeight(divRef);
  return (
    <div
      ref={divRef}
      className={`w-[40%] h-[40%] flex flex-col items-center justify-center hover:scale-[104%] duration-[0.33s] ${
        image.selected ? 'blur-md' : 'cursor-pointer'
      }`}
    >
      <Image
        alt="이미지"
        src={image.image || ``}
        className="object-contain h-[90%] w-full"
        width={width}
        height={height}
      />
      <div className="h-[10%]">{image.name}</div>
      {image.selected ? (
        <div className="bg-red-800">골라짐</div>
      ) : (
        <div>안골라짐</div>
      )}
    </div>
  );
};

export default FigmaImageListItem;
