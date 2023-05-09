import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  MouseEvent,
  PointerEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RoomProvider, useOthers, useUpdatePresence } from '@y-presence/react';
import { useRouter } from 'next/router';
import { SpaceParams } from '..';
import apiRequest from '@/utils/axios';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsDoc, getYjsValue, syncedStore } from '@syncedstore/core';
import WorkContainer from '@/components/work/WorkContainer';
import { useSyncedStore } from '@syncedstore/react';
import { PresenceUserData, workFigma } from '@/components/work/presence-type';
import MetaHead from '@/components/common/MetaHead';
import {
  useSpaceDetail,
  useSpaceFrames,
  useUserData,
  useUserFigmaTokens,
} from '@/hooks/queries/queries';
// import { yjsStore } from '@/utils/syncedStore';
import YjsProvider, { useYjsState } from '@/components/work/YjsProvider';
import { Awareness } from '@y-presence/client';

const SpaceWorkPage =
  function () // props: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    const router = useRouter();
    const { spaceId } = router.query as SpaceParams;
    const { state } = useYjsState();

    const { data: userFigmaTokenData } = useUserFigmaTokens();
    const { data: spaceDetailData } = useSpaceDetail(parseInt(spaceId));
    const {
      data: spaceFrameData,
      isLoading: spaceFrameDataLoading,
      isError: spaceFrameDataError,
    } = useSpaceFrames(parseInt(spaceId));
    const { data: userData, isLoading } = useUserData();

    // const [store, setStore] = useState<any>(useSyncedStore(yjsStore));
    const store = useSyncedStore(state);
    const [rtcProvider, setRtcProvider] = useState<WebrtcProvider>();
    const [awareness, setAwareness] = useState<Awareness>();
    useEffect(
      function () {
        const rtcOpener = async function () {
          if (state && spaceId?.length) {
            setRtcProvider(function () {
              const provider = new WebrtcProvider(
                `ssafast${spaceId}`,
                getYjsValue(state) as any
              );
              console.log('커넥트');
              // provider.connect();
              const { awareness: innerAwareness } = provider;
              setAwareness(() => innerAwareness);
              console.log('rtc 시그널링', provider.signalingUrls);
              console.log('rtc 방이름', provider.roomName);
              console.log('rtc 방', provider.room);
              console.log('rtc 연결 여부', provider.connected);
              console.log('rtc', provider);
              return provider;
            });
          }
        };
        rtcOpener();
      },
      [spaceId]
    );
    useEffect(function () {
      return function () {
        console.log('디스커넥트');
        while (state.figmaList.length) {
          state.figmaList.pop();
        }
        rtcProvider?.disconnect();
      };
    }, []);

    useEffect(
      function () {
        if (!awareness && spaceFrameDataLoading) {
          return;
        }
        // if (!state.figmaList.length) {
        //   testData.forEach((section) => state.figmaList.push(section));
        // }
        // if (spaceFrameData?.figmaSections.length) {
        //   while (state.figmaList.length) {
        //     state.figmaList.pop();
        //   }
        //   spaceFrameData.figmaSections.forEach((section) =>
        //     state.figmaList.push(section)
        //   );
        // }
        if (!store.editors.find((v) => v.name === userData?.name)) {
          store.editors.push({
            name: `${userData?.name || `나다이띱때끼야`}`,
            color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
            step: 1,
          });
        }
        if (!store.figmaList.length && spaceFrameData) {
          spaceFrameData.figmaSections.forEach((section) =>
            store.figmaList.push(section)
          );
        }

        // state.figmaList = [...spaceFrameData.figmaSections] as Array<any>;

        // state.useCaseList = [];
        // state.overloadList = [];
      },
      [awareness, spaceFrameData]
    );

    return (
      <>
        <MetaHead
          title={`SSAFAST: 작업 공간`}
          description={`SSAFAST: 작업하는 공간입니다.`}
          url={`/space/${spaceId}/work`}
        />
        <div className="h-full w-full overflow-hidden">
          <YjsProvider>
            {awareness && (
              <RoomProvider<PresenceUserData>
                awareness={awareness}
                initialPresence={{
                  name: `${userData?.name || `나다이띱때끼야`}`,
                  color: `#${Math.round(Math.random() * 0xffffff).toString(
                    16
                  )}`,
                  step: 1,
                }}
              >
                <WorkContainer store={state} />
              </RoomProvider>
            )}
          </YjsProvider>
        </div>
      </>
    );
  };

export default SpaceWorkPage;

export interface RTCSpaceData {
  figmaList: workFigma[];
  apiConnectList: any[];
  apiList: any[];
  useCaseList: any[];
  overloadList: any[];
  baseURLList: string[];
}
