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
import { useUserFigmaTokens } from '@/hooks/queries/queries';

const SpaceWorkPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const { serverSideStore } = props;
  const { spaceId } = router.query;
  const { data } = useUserFigmaTokens();

  const newStore = syncedStore({
    space: {} as RTCSpaceData,
  });
  const [store, setStore] = useState<any>(useSyncedStore(newStore));
  const [awareness, setAwareness] = useState<any>(null);
  useEffect(
    function () {
      if (store && spaceId?.length) {
        const rtcProvider = new WebrtcProvider(
          `${spaceId}:ssaffast`,
          getYjsValue(newStore) as any
        );
        const { awareness: innerAwareness } = rtcProvider;
        setAwareness(() => innerAwareness);
        console.log('예기 1빠임?');
        return function () {
          rtcProvider.destroy();
        };
      }
    },
    [spaceId, store]
  );

  useEffect(
    function () {
      if (!awareness) {
        return;
      }
      store.space.figmaList = [...serverSideStore.figmaList] as Array<any>;
      store.space.apiList = [...serverSideStore.apiList];
      store.space.useCaseList = [...serverSideStore.useCaseList];
      store.space.overloadList = [...serverSideStore.overloadList];
      store.space.inputData = serverSideStore.inputData;
    },
    [awareness]
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
            <WorkContainer store={store} serverSideStore={serverSideStore} />
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
  testingValue: string;
  inputData: string;
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { spaceId } = context.params as SpaceParams;
  let spaceData = {
    figmaList: [
      {
        figmaSectionId: `1`,
        sectionUrl:
          'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e56c89a6-34b7-4c8b-9e49-22c7fd82c48a',
        refreshId: `4:14`,
        name: `홈 페이지 1`,
      },
      {
        figmaSectionId: `2`,
        sectionUrl:
          'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbcc8976-b92d-4454-8e61-0050b7a42f95',
        refreshId: `115:522`,
        name: `space - space메인 - Dark`,
      },
      {
        figmaSectionId: `3`,
        sectionUrl:
          'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d3ac41b-03ec-4491-9c63-1f4744d45650',
        refreshId: `101:417`,
        name: `space - space메인 - Light`,
      },
      {
        figmaSectionId: `4`,
        sectionUrl:
          'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dba880b8-18c0-4835-ac27-b5af934d5806',
        refreshId: `232:1897`,
        name: `Figma화면에 api 연결 - 편집`,
      },
      {
        figmaSectionId: `5`,
        sectionUrl:
          'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/35599cc7-27ff-4584-834a-e53af3849446',
        refreshId: `232:2481,232:2759`,
        name: `api명세 작성 - postman - dark`,
      },
    ],
    apiConnectList: [],
    apiList: [],
    useCaseList: [],
    overloadList: [],
    baseURLList: [],
    testingValue: `asdf`,
    inputData: `testtest`,
  };
  // await apiRequest({
  //   method: `get`,
  //   url: `/`,
  // }).then((res) => {
  //   // sapceData에 space 정보 넣어주기.
  // });

  return {
    props: {
      serverSideStore: spaceData,
      spaceData: {
        title: `프로젝트 작업 공간`,
        description: `프로젝트 서얼며어엉`,
      },
    },
  };
};
