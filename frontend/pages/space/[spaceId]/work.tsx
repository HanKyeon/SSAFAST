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
  SpaceFigma,
  useSpaceDetail,
  useSpaceFrames,
  useUserData,
  useUserFigmaTokens,
} from '@/hooks/queries/queries';
// import { yjsStore } from '@/utils/syncedStore';
import YjsProvider, { useYjsState } from '@/components/work/YjsProvider';
import { Awareness } from '@y-presence/client';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const SpaceWorkPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const spaceId = props.spaceId;
  let { state, doc, figmaY } = useYjsState();

  const { data: userFigmaTokenData } = useUserFigmaTokens();
  const { data: spaceDetailData } = useSpaceDetail(parseInt(spaceId));
  const {
    data: spaceFrameData,
    isLoading: spaceFrameDataLoading,
    isError: spaceFrameDataError,
  } = useSpaceFrames(parseInt(spaceId));
  const { data: userData, isLoading } = useUserData();
  const store = useSyncedStore(state);
  const [wsprovider, setWsprovider] = useState(
    // new WebrtcProvider(`ssafast${spaceId}`, getYjsDoc(state), {
    //   signaling: ['wss://ssafast.com/ws'],
    // })
    new WebsocketProvider(
      `wss://ssafast.com/ws`,
      `ssafast${spaceId}`,
      getYjsDoc(state)
    )
  );
  const [awareness, setAwareness] = useState<Awareness>(wsprovider.awareness);
  // useEffect(
  //   function () {
  //     console.log(wsprovider.signalingConns);
  //   },
  //   [wsprovider.signalingConns]
  // );
  // useEffect(function () {
  //   let provider: WebrtcProvider;
  //   let wsprovider;
  //   if (state && spaceId?.length) {
  // wsprovider = new WebsocketProvider(
  //   'wss://ssafast.com/ws',
  //   `ssafast${spaceId}`,
  //   getYjsDoc(state)
  //   // { WebSocketPolyfill: require('ws') }
  // );
  //     // provider = new WebrtcProvider(
  //     //   `ssafast${spaceId}`,
  //     //   getYjsDoc(state) as any
  //     //   // {
  //     //   //   signaling: [
  //     //   //     // `ws://localhost:4444`,
  //     //   //     // `wss://localhost:4444`,
  //     //   //     // `wss://0.0.0.0:4444`,
  //     //   //     `wss://www.ssafast.com:4444`,
  //     //   //     // `ws://www.ssafast.com:4444`,
  //     //   //     'wss://signaling.yjs.dev',
  //     //   //     'wss://y-webrtc-signaling-eu.herokuapp.com',
  //     //   //     'wss://y-webrtc-signaling-us.herokuapp.com',
  //     //   //   ], //`ws://www.ssafast.com:4444`
  //     //   // }
  //     // );

  //     // console.log('커넥트', provider.signalingConns);
  //     console.log('커넥트', wsprovider.wsconnecting);
  //     const { awareness: innerAwareness } = wsprovider;
  //     setAwareness(innerAwareness);
  //   }

  //   return function () {
  //     console.log('디스커넥트');
  //   };
  // }, []);

  useEffect(
    function () {
      if (!awareness && spaceFrameDataLoading) {
        return;
      }
      if (!figmaY.length && spaceFrameData) {
        figmaY.push([...spaceFrameData.figmaSections]);
        // const nfigmaY = new Y.Array<SpaceFigma>();
        // nfigmaY.push([...spaceFrameData.figmaSections]);
        // figmaY = nfigmaY;
      }
      if (!figmaY.length) {
        // const nfigmaY = new Y.Array<SpaceFigma>();
        figmaY.push([
          {
            id: 1,
            name: `d`,
            sectionId: `123`,
            sectionUrl: ``,
          },
          {
            id: 2,
            name: `dd`,
            sectionId: `123`,
            sectionUrl: ``,
          },
          {
            id: 3,
            name: `ddd`,
            sectionId: `123`,
            sectionUrl: ``,
          },
          {
            id: 4,
            name: `dddd`,
            sectionId: `123`,
            sectionUrl: ``,
          },
        ]);
      }
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
                color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
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

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { spaceId } = context.params as SpaceParams;
  return {
    props: {
      spaceId: spaceId,
    },
  };
};
