import Image from 'next/image';
// import UserImg from '@/assets/images/Ggo.png';
import UserImg from '/public/assets/images/Ggo.png';
import { Box, CircleBtn } from '../common';
import { object } from 'yup';
import { useStoreSelector } from '@/hooks/useStore';
import ToggleModeBtn from '../common/ToggleModeBtn';
import SpaceNameItem from './SpaceNameItem';
import UserBadge from '../common/UserBadge';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSpaceList, useUserData } from '@/hooks/queries/queries';
import { SpinnerDots } from '../common/Spinner';

const SpaceNavContainer = function (): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query;
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  // const [curSpaceId, setCurSpaceId] = useState<number>(spaceMockup[0].id);
  const {
    data: spaceList,
    isLoading: spaceListLoading,
    isError: spaceListError,
  } = useSpaceList();
  const { data: userData, isLoading } = useUserData();

  const onClickSpaceItem = (id: number): void => {
    // setCurSpaceId(id);
    router.push(`/space/${id}`);
  };

  const styles = {
    userImgWrapper:
      'w-[200px] h-[200px] border-2 border-grayscale-dark flex items-center justify-center rounded-full overflow-hidden',
  };
  return (
    <div className="w-[20%] h-full flex flex-col gap-3">
      <div className="h-[10%]">
        <Image src={UserImg} alt="logo" height={70} />
      </div>
      <Box className="flex-1 min-h-0 flex flex-col p-5 gap-5" fontType="normal">
        {/* 이미지 */}
        <div className="flex flex-col justify-center items-center">
          <div className="border-2 border-grayscale-dark flex items-center justify-center rounded-full overflow-hidden h-[200px] w-[200px]">
            <Image
              alt="프로필 이미지"
              src={userData?.profileImg || UserImg}
              className="min-w-full min-h-full object-cover"
            />
          </div>
          <span className="text-theme-white-strong text-[15px] mt-3">
            {userData?.name || '로딩중...'}
          </span>
        </div>
        {/* space list */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-grayscale-light">Team Space</span>
          <CircleBtn
            btnType="plus"
            gray
            onClick={() => router.push(`/space/create`)}
          />
        </div>
        <ul className="overflow-scroll flex flex-col gap-3 flex-1 scrollbar-hide">
          {spaceList?.workspaces.length ? (
            spaceList.workspaces.map((item, index) => (
              <SpaceNameItem
                key={item.id}
                item={item}
                // curSpaceId={curSpaceId}
                onClickSpaceItem={onClickSpaceItem}
              />
            ))
          ) : (
            <Box fontType="content">space를 생성해보세요!</Box>
          )}
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
