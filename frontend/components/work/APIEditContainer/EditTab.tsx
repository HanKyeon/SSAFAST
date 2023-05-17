import AnimationBox from '@/components/common/AnimationBox';
import { useStoreSelector } from '@/hooks/useStore';
import { useUsers, useSelf } from '@y-presence/react';
import { useEffect, useState } from 'react';

interface Props {
  goDTO: () => void;
  goAPI: () => void;
  isActive: 1 | 2;
}

const ldStyles = (dark: boolean, isActive: boolean) =>
  `${
    dark && isActive
      ? `bg-mincho-strong bg-opacity-90 active:bg-mincho-strong`
      : dark && !isActive
      ? `bg-theme-dark-light bg-opacity-70 active:bg-zinc-700`
      : !dark && isActive
      ? `bg-taro-strong bg-opacity-90 active:bg-taro-strong`
      : `bg-grayscale-light bg-opacity-70 active:bg-grayscale-dark`
  }` as const;

const EditTab = function ({ goDTO, goAPI, isActive = 1 }: Props) {
  const state = useSelf();
  const [isOpened, setIsOpened] = useState<boolean>(
    state?.presence?.cursor?.x ? false : true
  );
  const { dark } = useStoreSelector((state) => state.dark);
  useEffect(
    function () {
      if (typeof state?.presence?.cursor?.x === 'number') {
        setIsOpened(() => state.presence.cursor.x < window.innerWidth * 0.05);
      }
    },
    [state?.presence?.cursor?.x]
  );
  return (
    <AnimationBox
      isOpened={isOpened}
      className="flex flex-col fixed w-[5%] h-full gap-[1%] left-[1%] top-[8%] z-[80]"
      appearClassName="animate-appear-from-left-fast fixed"
      disappearClassName="animate-disappear-to-left-fast fixed"
    >
      <div
        className={`h-[5vw] w-[5vw] rounded-full flex items-center justify-center cursor-pointer hover:scale-[108%] duration-[0.33s] ${ldStyles(
          dark,
          isActive === 1
        )}`}
        onClick={goAPI}
      >
        API
      </div>
      <div
        className={`h-[5vw] w-[5vw] rounded-full flex items-center justify-center cursor-pointer hover:scale-[108%] duration-[0.33s] ${ldStyles(
          dark,
          isActive === 2
        )}`}
        onClick={goDTO}
      >
        DTO
      </div>
    </AnimationBox>
  );
};

export default EditTab;
