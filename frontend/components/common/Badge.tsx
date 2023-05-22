import { memo } from 'react';
import Poke from '/public/assets/images/Ggo.png';
import Image from 'next/image';

interface AvatarProps {
  name: string;
  image?: string | undefined;
}

const Badge = function ({ name, image }: AvatarProps) {
  // console.log(Poke);
  return (
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-400 select-none hover:scale-[105%] duration-[0.33s] w-[45px] h-[45px]">
      {image ? (
        <img src={image} alt={name} className="h-full w-full object-contain" />
      ) : (
        <Image
          src={Poke}
          alt={`이미지가 없습니다.`}
          width={45}
          height={45}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
};

export default memo(Badge);
