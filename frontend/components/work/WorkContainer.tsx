import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { RoomProvider } from '@y-presence/react';
import { useSyncedStore } from '@syncedstore/react';
import { PresenceUserData } from './presence-type';
import DTOContainer from './DTOContainer';
import WorkTopNav from './WorkTopNav';
import APIConnectContainer from './APIConnectContainer';
import APIDocsContainer from './APIDocsContainer';
import TestContainer from './TestContainer';

interface Props {
  serverSideStore: object;
}

const WorkContainer = function ({ serverSideStore }: Props) {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { spaceId } = router.query;
  // const {} = useSpaceData // ReactQuery훅 만들어서 space data를 받아와야 한다.
  const [awareness, setAwareness] = useState<any>(null);
  const [sessions, setSessions] = useState<object>();
  const newStore = syncedStore({} as any);
  const [store, setStore] = useState<any>(useSyncedStore(newStore));
  const [yjsDoc, setYjsDoc] = useState<any>(getYjsValue(newStore));
  useEffect(
    function () {
      if (store && spaceId?.length) {
        const rtcProvider = new WebrtcProvider(
          `${spaceId}:ssaffast`,
          yjsDoc as any
        );
        const { awareness: innerAwareness } = rtcProvider;
        setAwareness(() => innerAwareness);

        return function () {
          rtcProvider.destroy();
        };
      }
    },
    [spaceId, store]
  );

  return (
    <>
      <div className="h-[93.2%] w-full">
        {awareness && (
          <RoomProvider<PresenceUserData>
            awareness={awareness}
            initialPresence={{
              name: `전데요...`,
              color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
            }}
          >
            <WorkTopNav>
              <div
                className={`flex flex-row items-center h-full justify-around w-full bg-theme-dark-light box-border rounded-[13px]`}
              >
                <div
                  className={`${
                    step === 1
                      ? 'border-mincho-strong text-mincho-strong border-[3px]'
                      : ''
                  } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal cursor-pointer`}
                  onClick={() => setStep(() => 1)}
                >
                  스텝1
                </div>
                <div
                  className={`${
                    step === 2
                      ? 'border-mincho-strong text-mincho-strong border-[3px]'
                      : ''
                  } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal cursor-pointer`}
                  onClick={() => setStep(() => 2)}
                >
                  스텝2
                </div>
                <div
                  className={`${
                    step === 3
                      ? 'border-mincho-strong text-mincho-strong border-[3px]'
                      : ''
                  } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal cursor-pointer`}
                  onClick={() => setStep(() => 3)}
                >
                  스텝3
                </div>
                <div
                  className={`${
                    step === 4
                      ? 'border-mincho-strong text-mincho-strong border-[3px]'
                      : ''
                  } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 cursor-pointer`}
                  onClick={() => setStep(() => 4)}
                >
                  스텝4
                </div>
              </div>
            </WorkTopNav>
            {step === 1 ? (
              <DTOContainer store={store} />
            ) : step === 2 ? (
              <APIConnectContainer />
            ) : step === 3 ? (
              <APIDocsContainer />
            ) : (
              <TestContainer />
            )}
          </RoomProvider>
        )}
      </div>
    </>
  );
};

export default WorkContainer;
