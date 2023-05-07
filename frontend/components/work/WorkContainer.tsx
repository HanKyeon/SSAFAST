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
import { Box } from '../common';
import { useStoreSelector } from '@/hooks/useStore';
import { yjsStore } from '@/utils/syncedStore';

interface Props {
  store: any;
}

// 상수 스타일
const selectedStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-[3px] border-mincho-strong active:border-teal-600 text-mincho-strong active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-[3px] active:text-mincho-normal'
      : 'border-[3px] border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong active:bg-grayscale-light active:bg-opacity-70 active:border-taro-normal active:border-[3px] active:text-taro-normal'
  }` as const;

const WorkContainer = function ({ store }: Props) {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { spaceId } = router.query;
  const { dark } = useStoreSelector((state) => state.dark);
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
        <Box
          fontType="content"
          className={`flex flex-row items-center h-full justify-around w-full box-border rounded-[13px]`}
        >
          <div
            className={`${
              step === 1 ? selectedStyle(dark) : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] cursor-pointer`}
            onClick={APIEditHandler}
          >
            API 명세서 작성
          </div>
          <div
            className={`${
              step === 2 ? selectedStyle(dark) : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] cursor-pointer`}
            onClick={APIConnectHandler}
          >
            화면 별 API 연결
          </div>
          <div
            className={`${
              step === 3 ? selectedStyle(dark) : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] cursor-pointer`}
            onClick={APIDocsHandler}
          >
            API 명세 및 요청
          </div>
          <div
            className={`${
              step === 4 ? selectedStyle(dark) : ''
            } box-border h-full w-full flex items-center justify-center rounded-[13px] py-[1.1%] duration-[0.1s] cursor-pointer`}
            onClick={APITestHandler}
          >
            Testings
          </div>
        </Box>
      </WorkTopNav>
      <div className="h-[93.2%] w-full p-[1.12%]">
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
