import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { TbSettingsFilled } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';
import Modal from '../common/Modal';
import { HorizonBadgeList } from '../common/BadgeList';
import { useUsers } from '@y-presence/react';
import { PresenceUserData } from './presence-type';
import { Box, Button, CircleBtn } from '../common';
import Logo from '/public/assets/images/Logo.png';
import LightLogo from '/public/assets/images/LightLogo.png';
import DarkLogo from '/public/assets/images/DarkLogo.png';
import Image from 'next/image';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import ToggleModeBtn from '../common/ToggleModeBtn';

interface TopNavProps {}

const WorkTopNav = function ({ children }: PropsWithChildren<TopNavProps>) {
  const router = useRouter();
  const users = useUsers<PresenceUserData>();
  const { spaceId } = router.query;
  const exitHandler = function () {
    window.location.href = `${process.env.NEXT_PUBLIC_HOSTNAME}/space/${spaceId}`;
    // router.push(`/space/${spaceId}`);
  };
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const modalOffHandler = function () {
    setIsTutorial(() => false);
  };
  const modalOnHandler = function () {
    setIsTutorial(() => true);
  };
  const LogoutModalOnHandler = function () {
    setIsLogout(() => true);
  };
  const LogoutModalOffHandler = function () {
    setIsLogout(() => false);
  };
  const { dark, presence } = useStoreSelector((state) => state.dark);
  const dispatch = useStoreDispatch();
  const dispatchPresenceHandler = function () {
    dispatch(darkActions.togglePresencs({}));
  };
  return (
    <>
      {isLogout && (
        <div className="w-full h-full">
          <Modal closeModal={LogoutModalOffHandler}>
            <div className="w-full h-full flex items-center justify-center text-theme-white-normal">
              <Box
                variant="two"
                className="w-[30%] h-[40%] flex flex-col items-center justify-center gap-12"
              >
                <div className="text-2xl">로그아웃 하시겠습니까?</div>
                <div className="flex gap-4">
                  <Button
                    isEmpty
                    onClick={() => {
                      LogoutModalOffHandler();
                      router.push('/');
                    }}
                  >
                    확인
                  </Button>
                  <Button
                    isEmpty
                    onClick={LogoutModalOffHandler}
                    className="!border-red-500 !text-red-500"
                  >
                    닫기
                  </Button>
                </div>
              </Box>
            </div>
          </Modal>
        </div>
      )}
      {isTutorial && (
        <Modal closeModal={modalOffHandler}>
          <div className="text-theme-white-normal">하이요?</div>
        </Modal>
      )}
      <div
        className={`sticky flex flex-row w-full h-[6.8%] items-center pl-[1%] pr-[2%] py-[8px]`}
      >
        {/* 로고 */}
        <div
          className={`flex items-center justify-center basis-[6%] w-[6%] cursor-pointer hover:scale-[105%] duration-[0.33s] pt-3 pb-1`}
          onClick={() => router.push(`/`)}
        >
          <Image
            src={dark ? DarkLogo : LightLogo}
            alt="SSAFAST"
            width={50}
            height={50}
          />
        </div>
        {/* 네브 */}
        <Box className={`flex items-center justify-center basis-[48%]`}>
          {children}
        </Box>
        {/* ?버튼? */}
        <div className={`flex items-center justify-center basis-[5%] w-[5%]`}>
          <CircleBtn onClick={modalOnHandler} />
        </div>
        {/* 공동작업 토글 && 사용자뱃지 */}
        <div
          className={`flex items-center justify-center basis-[18%] w-[18%] pt-3`}
        >
          <div
            onClick={dispatchPresenceHandler}
            className={`h-full w-[20%] mr-3 cursor-pointer hover:scale-[105%] duration-[0.33s]`}
          >
            {presence ? 'OFF' : 'ON'}
          </div>
          <HorizonBadgeList className="w-full" users={users} />
        </div>
        {/* 다크모드 토글 */}
        <div className={`flex items-center justify-center basis-[8%] w-[8%]`}>
          <ToggleModeBtn />
        </div>
        {/* 설정 */}
        <div className={`flex items-center justify-center basis-[4%] w-[4%]`}>
          <TbSettingsFilled
            className="h-full w-full p-[25%] text-gray-300 active:text-gray-500 hover:scale-[105%] duration-[0.33s] cursor-pointer"
            onClick={LogoutModalOnHandler}
          />
        </div>

        {/* 나가기 */}
        <Box
          className={`flex items-center justify-center basis-[10%] w-[10%] py-3 px-1 cursor-pointer hover:scale-[107%] duration-[0.33s]`}
          onClick={exitHandler}
        >
          나가기
        </Box>
      </div>
    </>
  );
};

export default WorkTopNav;
