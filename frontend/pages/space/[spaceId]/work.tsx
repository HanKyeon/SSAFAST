import { wrapper } from '@/store';
import { InferGetServerSidePropsType } from 'next';
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

const SpaceWorkPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // const [step, setStep] = useState<number>(0);
  // const router = useRouter();
  // const { spaceId } = router.query;
  // // const {} = useSpaceData // ReactQuery훅 만들어서 space data를 받아와야 한다.
  // const [awareness, setAwareness] = useState<any>(null);
  // const [sessions, setSessions] = useState<object>();
  // const newStore = syncedStore({
  //   pjt: {} as any,
  // });
  // useEffect(
  //   function () {
  //     setAwareness(
  //       () =>
  //         new WebrtcProvider(
  //           `${spaceId} 프로젝트 이름`,
  //           getYjsValue(newStore) as any
  //         )
  //     );
  //   },
  //   [spaceId]
  // ); // 여기에 space data를 의존성으로 넣는다.

  // const others = useOthers<PresenceUserData>();

  // //  프리센스커서 이동 관련 이벤트
  // const updatePresence = useUpdatePresence<PresenceUserData>();
  // const pointerMoveHandler = useCallback(
  //   function (e: MouseEvent) {
  //     updatePresence({
  //       cursor: {
  //         x: e.clientX,
  //         y: e.clientY,
  //       },
  //     });
  //   },
  //   [updatePresence]
  // );

  return (
    <div className="h-full w-full">
      <WorkContainer />
      {/* {awareness && (
        <RoomProvider<PresenceUserData>
          awareness={awareness}
          initialPresence={{
            name: `전데요...`,
            color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
          }}
        >
          <div className="h-full w-full">하이요</div>
        </RoomProvider>
      )} */}
    </div>
  );
};

export default SpaceWorkPage;

export const getServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    const { spaceId } = context.params as SpaceParams;
    let spaceData = {};
    // await apiRequest({
    //   method: `get`,
    //   url: `/`,
    // }).then((res) => {
    //   // sapceData에 space 정보 넣어주기.
    // });

    return {
      props: {
        spaceData,
      },
    };
  };
});
