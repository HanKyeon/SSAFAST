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
import { Box, Button, Input } from '@/components/common';
import UseCaseTest from './usecase';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useBaseUrl } from '@/hooks/queries/queries';
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
  const [serverClass, setServerClass] = useState<1 | 2 | 3>(1);
  const goUseTest = function () {
    setUSE1LOAD2(() => 1);
  };
  const goLoadTest = function () {
    if (isAuthenticated === false) {
      openModal();
      return;
    }
    setUSE1LOAD2(() => 2);
  };

  const isBanned = function () {
    goUseTest();
    closeModal();
  };

  const isAccepted = function () {
    setIsAuthenticated(true);
    closeModal();
    setUSE1LOAD2(() => 2);
  };

  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: baseUrlListData, isLoading: isBaseUrlLoading } = useBaseUrl(
    parseInt(spaceId)
  );

  console.log(spaceId);
  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal} parentClasses="h-[80%] w-[80%]">
          <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
            <div className="text-[24px]">
              BaseUrl을 인증해야 사용할 수 있는 기능입니다.
            </div>
            <div className="h-[50%] w-[50%] ">
              <div className="flex w-full">
                <div
                  onClick={() => setServerClass(1)}
                  className="cursor-pointer text-center text-sm h-[5%] py-2 px-7 rounded-tl-[8px] border-mincho-strong text-mincho-strong border-x-[2px] border-t-[2px] min-w-[40px] duration-[0.33s]"
                >
                  Java
                </div>
                <div
                  onClick={() => setServerClass(2)}
                  className="cursor-pointer text-center text-sm h-[5%] py-2 px-7 border-mincho-strong text-mincho-strong border-t-[2px] min-w-[40px] duration-[0.33s]"
                >
                  Flask
                </div>
                <div
                  onClick={() => setServerClass(3)}
                  className="cursor-pointer text-center text-sm h-[5%] py-2 px-7 rounded-tr-[8px] border-mincho-strong text-mincho-strong border-x-[2px] border-t-[2px] min-w-[40px] duration-[0.33s]"
                >
                  Django
                </div>
              </div>
              {serverClass === 1 && (
                <div className="w-full text-small h-[90%] border-red-900 border-[4px] flex flex-col items-center justify-center overflow-y-scroll">
                  {`@RestController`}
                  <br />
                  {`@RequestMapping("/api/ssafast")`}
                  <br />
                  {`public class SsafastController {`}
                  <br />
                  {`    @PostMapping("")`}
                  <br />
                  {`    ResponseEntity<?> executeOverload(@RequestBody HashMap<String, String> map) {`}
                  <br />
                  {`        System.out.println(map.get("verification"));`}
                  <br />
                  {`        return new ResponseEntity<>("success", HttpStatus.OK);`}
                  <br />
                  {`    }`}
                  <br />
                  {`}`}
                </div>
              )}
              {serverClass === 2 && (
                <div className="w-full h-[90%] border-red-900 border flex items-center justify-center overflow-y-scroll">
                  플라스크 코드
                </div>
              )}
              {serverClass === 3 && (
                <div className="w-full h-[90%] border-red-900 border flex items-center justify-center overflow-y-scroll">
                  파이썬 코드
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-start overflow-y-scroll h-[40%] w-full">
              <br />
              <label className="text-[18px]">인증해야할 URL 목록</label>
              <br />

              {baseUrlListData?.baseurls.map((item, index) => (
                <>
                  <div className="flex w-[50%] justify-between gap-12">
                    <div key={item.id}>{item.url}</div>
                    <Input
                      name={`${item.id}-${item.url}`}
                      className="text-center !w-24"
                    />
                  </div>
                </>
              ))}
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
        {USE1LOAD2 % 2 ? <UseCaseTest /> : <LoadTestContainer />}
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
