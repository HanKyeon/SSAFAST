import Image from 'next/image';
// import UserImg from '@/assets/images/Ggo.png';
import UserImg from '/public/assets/images/Ggo.png';
import { Box, CircleBtn } from '../common';
import { object } from 'yup';
import { useStoreSelector } from '@/hooks/useStore';
import ToggleModeBtn from '../common/ToggleModeBtn';
import SpaceNameItem from './SpaceNameItem';
import UserBadge from '../common/UserBadge';

const SpaceNavContainer = function (): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    userImgWrapper:
      'w-[200px] h-[200px] border-2 border-grayscale-dark flex items-center justify-center rounded-full overflow-hidden',
  };
  return (
    <div className="w-[250px] h-full pl-3 flex flex-col gap-3 py-3">
      <div className="h-[10%]">
        <Image src={UserImg} alt="logo" height={70} />
      </div>
      <Box className="flex-1 min-h-0 flex flex-col p-5" fontType="normal">
        {/* 이미지 */}
        <div className="flex flex-col justify-center items-center mb-8">
          <UserBadge size="large" />
          <span className="text-theme-white-strong text-[15px] mt-3">
            고북씨
          </span>
        </div>
        {/* space list */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-[14px] text-grayscale-light">Team Space</span>
          <CircleBtn btnType="plus" gray />
        </div>
        <ul className="overflow-scroll flex flex-col gap-3 flex-1 scrollbar-hide">
          <SpaceNameItem />
          <SpaceNameItem />
          <SpaceNameItem />
          <SpaceNameItem />
          <SpaceNameItem />
          <SpaceNameItem />
        </ul>
        {/* toggle mode */}
        <div className="flex justify-center pt-5 ">
          <ToggleModeBtn />
        </div>
      </Box>
    </div>
  );
};

export default SpaceNavContainer;
