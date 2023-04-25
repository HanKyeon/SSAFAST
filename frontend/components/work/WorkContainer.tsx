import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { RoomProvider } from '@y-presence/react';
import { useSyncedStore } from '@syncedstore/react';
import * as Y from 'yjs';

export interface PresenceUserData {
  cursor?: {
    x: number;
    y: number;
  };
  name: string;
  color: string;
  step?: number;
  img?: string;
}

const WorkContainer = function () {
  const ydoc = new Y.Doc();
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const { spaceId } = router.query;
  // const {} = useSpaceData // ReactQuery훅 만들어서 space data를 받아와야 한다.
  const [awareness, setAwareness] = useState<any>(null);
  const [sessions, setSessions] = useState<object>();
  const newStore = syncedStore({
    pjt: {} as object,
  });
  const [store, setStore] = useState<any>(useSyncedStore(newStore));

  useEffect(
    function () {
      setAwareness(
        () =>
          new WebrtcProvider(
            `${spaceId} 프로젝트 이름`,
            getYjsValue(newStore) as any
          ).awareness
      );
    },
    [spaceId, store]
  ); // 여기에 space data를 의존성으로 넣는다.

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
    <div>
      {awareness && (
        <RoomProvider<PresenceUserData>
          awareness={awareness}
          initialPresence={{
            name: `전데요...`,
            color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
          }}
        >
          <div className="h-full w-full">하이요</div>
        </RoomProvider>
      )}
      <div>ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</div>
      <div>ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</div>
      <div>ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</div>
    </div>
  );
};

export default WorkContainer;
