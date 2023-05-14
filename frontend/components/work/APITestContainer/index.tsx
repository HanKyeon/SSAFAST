import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { PresenceUserData } from '../presence-type';
import Cursor from '../../common/Cursor';
import EditTab from './EditTab';
import LoadTestContainer from './LoadTestContainer';
import UseTestContainer from './usecase/UseTestContainer';
import { PointerEvent, useCallback, useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import { useStoreSelector } from '@/hooks/useStore';
import { Box, Button } from '@/components/common';
interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const TestContainer = function ({ store, serverSideStore }: Props) {
  const others = useOthers<PresenceUserData>();
  const updatePresence = useUpdatePresence<PresenceUserData>();
  const pointerMoveHandler = useCallback(
    function (e: PointerEvent) {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    },
    [updatePresence]
  );
  const [isModal, setIsModal] = useState<boolean>(false);

  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);
  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);

  const { presence: isPresence } = useStoreSelector((state) => state.dark);
  const [USE1LOAD2, setUSE1LOAD2] = useState<1 | 2>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const goUseTest = function () {
    setUSE1LOAD2(() => 1);
  };
  const goLoadTest = function () {
    setUSE1LOAD2(() => 2);
  };

  const isBanned = function () {
    goUseTest();
    closeModal();
  };

  const isAccepted = function () {
    setIsAuthenticated(true);
    closeModal();
  };
  useEffect(
    function () {
      if (USE1LOAD2 === 2) {
        if (isAuthenticated === false) {
          openModal();
        }
      }
    },
    [USE1LOAD2]
  );

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal} parentClasses="h-[80%] w-[80%]">
          <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
            <div className="text-[36px]">
              BaseUrl을 인증해야 사용할 수 있는 기능입니다.
            </div>
            <div className="h-[50%] w-[50%] border-red-900 border flex items-center justify-center">
              여기 코드 복사해서 가라
            </div>
            <div className="flex flex-col items-start justify-start overflow-y-scroll h-[40%]">
              <label className="text-[24px]">인증해야할 URL 목록</label>
              <div>
                baseURL1
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL2
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL3
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL4
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL5
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL6
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL7
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL8
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL9
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL10
                <Button>인증했냐</Button>
              </div>
              <div>
                baseURL11
                <Button>인증했냐</Button>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Box
                variant="three"
                className="w-[80px] h-[60px] rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={isAccepted}
              >
                인증 해써!
              </Box>
              <div
                className="w-[80px] h-[60px] bg-red-500 rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={isBanned}
              >
                인증 모태!
              </div>
            </div>
          </Box>
        </Modal>
      )}
      <div
        className="h-full w-full overflow-hidden"
        onPointerMove={pointerMoveHandler}
      >
        <EditTab
          goUseTest={goUseTest}
          goLoadTest={goLoadTest}
          isActive={USE1LOAD2}
        />
        {USE1LOAD2 % 2 ? <UseTestContainer /> : <LoadTestContainer />}
      </div>
      {isPresence &&
        others
          .filter((user) => user.presence.step === 1 && !user.presence.place)
          .map((user) => (
            <Cursor key={`${Math.random()}`} {...user.presence} />
          ))}
    </>
  );
};

export default TestContainer;
