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
import { getYjsValue, syncedStore } from '@syncedstore/core';
import * as Y from 'yjs';
import WorkContainer from '@/components/work/WorkContainer';
import { useSyncedStore } from '@syncedstore/react';
import { PresenceUserData, workFigma } from '@/components/work/presence-type';
import MetaHead from '@/components/common/MetaHead';
import {
  useSpaceDetail,
  useSpaceFrames,
  useUserFigmaTokens,
} from '@/hooks/queries/queries';
import { yjsStore } from '@/utils/syncedStore';

const testData = [
  {
    id: `1`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e56c89a6-34b7-4c8b-9e49-22c7fd82c48a',
    refreshId: `4:14`,
    name: `홈 페이지 1`,
  },
  {
    id: `2`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbcc8976-b92d-4454-8e61-0050b7a42f95',
    refreshId: `115:522`,
    name: `space - space메인 - Dark`,
  },
  {
    id: `3`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d3ac41b-03ec-4491-9c63-1f4744d45650',
    refreshId: `101:417`,
    name: `space - space메인 - Light`,
  },
  {
    id: `4`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dba880b8-18c0-4835-ac27-b5af934d5806',
    refreshId: `232:1897`,
    name: `Figma화면에 api 연결 - 편집`,
  },
  {
    id: `5`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/35599cc7-27ff-4584-834a-e53af3849446',
    refreshId: `232:2481,232:2759`,
    name: `api명세 작성 - postman - dark`,
  },
];

const SpaceWorkPage =
  function () // props: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    const router = useRouter();
    const { spaceId } = router.query as SpaceParams;
    const { data: userFigmaTokenData } = useUserFigmaTokens();
    const { data: spaceDetailData } = useSpaceDetail(parseInt(spaceId));
    const {
      data: spaceFrameData,
      isLoading: spaceFrameDataLoading,
      isError: spaceFrameDataError,
    } = useSpaceFrames(parseInt(spaceId));

    // const [store, setStore] = useState<any>(useSyncedStore(yjsStore));
    const state = useSyncedStore(yjsStore);
    const [awareness, setAwareness] = useState<any>(null);
    useEffect(
      function () {
        if (state && spaceId?.length) {
          const rtcProvider = new WebrtcProvider(
            `${spaceId}:ssaffast`,
            getYjsValue(state) as any
          );
          const { awareness: innerAwareness } = rtcProvider;
          setAwareness(() => innerAwareness);
          return function () {
            rtcProvider.destroy();
          };
        }
      },
      [spaceId]
    );

    useEffect(
      function () {
        if (!awareness) {
          return;
        }
        if (!state.figmaList.length) {
          testData.forEach((section) => state.figmaList.push(section));
        }

        // spaceFrameData.figmaSections.forEach((section) =>
        //   store.figmaList.push(section)
        // );
        // store.figmaList = [...spaceFrameData.figmaSections] as Array<any>;

        // store.useCaseList = [];
        // store.overloadList = [];
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
          {awareness && (
            <RoomProvider<PresenceUserData>
              awareness={awareness}
              initialPresence={{
                name: `나다이띱때끼야`,
                color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
                step: 1,
              }}
            >
              <WorkContainer store={state} />
            </RoomProvider>
          )}
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
