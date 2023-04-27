import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { TbSettingsFilled } from 'react-icons/tb';
import Modal from '../common/Modal';
import { HorizonBadgeList } from '../common/BadgeList';
import { useUsers } from '@y-presence/react';
import { PresenceUserData } from './presence-type';
import { CircleBtn } from '../common';

interface TopNavProps {}

const WorkTopNav = function ({ children }: PropsWithChildren<TopNavProps>) {
  const router = useRouter();
  const users = useUsers<PresenceUserData>();
  const { spaceId } = router.query;
  const exitHandler = function () {
    router.push(`/space/${spaceId}`);
  };
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const modalOffHandler = function () {
    setIsTutorial(() => false);
  };
  const modalOnHandler = function () {
    setIsTutorial(() => true);
  };
  return (
    <>
      {isTutorial && (
        <Modal closeModal={modalOffHandler}>
          <div className="text-theme-white-normal">하이요?</div>
        </Modal>
      )}
      <div
        className={`sticky flex flex-row w-full h-[6.8%] items-center pl-[1%] pr-[2%] py-[8px]`}
      >
        <div
          className={`flex items-center justify-center basis-[6%] w-[6%] cursor-pointer hover:scale-[105%] duration-[0.33s]`}
          onClick={() => router.push(`/`)}
        >
          로고
        </div>
        <div className={`flex items-center justify-center basis-[48%]`}>
          {children}
        </div>
        <div className={`flex items-center justify-center basis-[5%] w-[5%]`}>
          <CircleBtn onClick={modalOnHandler} />
        </div>
        <div className={`flex items-center justify-center basis-[18%] w-[18%]`}>
          <HorizonBadgeList users={users} />
        </div>
        <div className={`flex items-center justify-center basis-[8%] w-[8%]`}>
          온오프
        </div>
        <div className={`flex items-center justify-center basis-[5%] w-[5%]`}>
          <TbSettingsFilled className="h-full w-full p-[25%] text-gray-300 active:text-gray-500 hover:scale-[105%] duration-[0.33s] cursor-pointer" />
        </div>
        <div
          className={`flex items-center justify-center basis-[10%] w-[10%] bg-theme-dark-normal py-3 px-1 cursor-pointer hover:scale-[107%] duration-[0.33s]`}
          onClick={exitHandler}
        >
          나가기
        </div>
      </div>
    </>
  );
};

export default WorkTopNav;
