import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { RoomProvider, useUpdatePresence } from '@y-presence/react';
import { useSyncedStore } from '@syncedstore/react';
import { PresenceUserData } from './presence-type';
import APIEditContainer from './APIEditContainer';
import WorkTopNav from './WorkTopNav';
import APIConnectContainer from './APIConnectContainer';
import APIDocsContainer from './APIDocsContainer';
import APITestContainer from './APITestContainer';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const WorkContainer = function ({ serverSideStore, store }: Props) {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { spaceId } = router.query;
  const updatePresence = useUpdatePresence<PresenceUserData>();

  const APIEditHandler = function () {
    setStep(() => 1);
    updatePresence({
      step: 1,
    });
  };
  const APIConnectHandler = function () {
    setStep(() => 2);
    updatePresence({
      step: 2,
    });
  };
  const APIDocsHandler = function () {
    setStep(() => 3);
    updatePresence({
      step: 3,
    });
  };
  const APITestHandler = function () {
    setStep(() => 4);
    updatePresence({
      step: 4,
    });
  };

  return (
    <>
      <WorkTopNav>
        <div
          className={`flex flex-row items-center h-full justify-around w-full bg-theme-dark-light box-border rounded-[13px] text-[1rem]`}
        >
          <div
            className={`${
              step === 1
                ? 'border-mincho-strong text-mincho-strong border-[3px]'
                : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal cursor-pointer`}
            onClick={APIEditHandler}
          >
            API 명세서 작성
          </div>
          <div
            className={`${
              step === 2
                ? 'border-mincho-strong text-mincho-strong border-[3px]'
                : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal cursor-pointer`}
            onClick={APIConnectHandler}
          >
            화면 별 API 연결
          </div>
          <div
            className={`${
              step === 3
                ? 'border-mincho-strong text-mincho-strong border-[3px]'
                : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal cursor-pointer`}
            onClick={APIDocsHandler}
          >
            API 명세 및 요청
          </div>
          <div
            className={`${
              step === 4
                ? 'border-mincho-strong text-mincho-strong border-[3px]'
                : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] active:bg-theme-dark-normal active:bg-opacity-70 cursor-pointer`}
            onClick={APITestHandler}
          >
            Testings
          </div>
        </div>
      </WorkTopNav>
      <div className="h-[93.2%] w-full p-3">
        {step === 1 ? (
          <APIEditContainer store={store} />
        ) : step === 2 ? (
          <APIConnectContainer store={store} />
        ) : step === 3 ? (
          <APIDocsContainer store={store} />
        ) : (
          <APITestContainer store={store} />
        )}
      </div>
    </>
  );
};

export default WorkContainer;
