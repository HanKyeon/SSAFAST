import AnimationBox from '@/components/common/AnimationBox';
import { useUsers, useSelf } from '@y-presence/react';
import { useEffect, useState } from 'react';

interface Props {
  goDTO: () => void;
  goAPI: () => void;
  isActive: 1 | 2;
}

const EditTab = function ({ goDTO, goAPI, isActive = 1 }: Props) {
  const state = useSelf();
  const [isOpened, setIsOpened] = useState<boolean>(
    state?.presence?.cursor?.x ? false : true
  );
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
        className={`h-[5vw] w-[5vw] rounded-full flex items-center justify-center cursor-pointer hover:scale-[108%] duration-[0.33s] ${
          isActive === 1
            ? 'bg-mincho-strong bg-opacity-90 active:bg-mincho-strong'
            : 'bg-theme-dark-light bg-opacity-70 active:bg-zinc-700'
        }`}
        onClick={goAPI}
      >
        API
      </div>
      <div
        className={`h-[5vw] w-[5vw] rounded-full flex items-center justify-center cursor-pointer hover:scale-[108%] duration-[0.33s] ${
          isActive === 2
            ? 'bg-mincho-strong bg-opacity-90 active:bg-mincho-strong'
            : 'bg-theme-dark-light bg-opacity-70 active:bg-zinc-700'
        }`}
        onClick={goDTO}
      >
        DTO
      </div>
    </AnimationBox>
  );
};

export default EditTab;
