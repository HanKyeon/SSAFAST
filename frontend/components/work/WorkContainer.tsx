import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { RoomProvider } from '@y-presence/react';
import { useSyncedStore } from '@syncedstore/react';
import { PresenceUserData } from './presence-type';
import DTOContainer from './DTOContainer';

const WorkContainer = function () {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { spaceId } = router.query;
  // const {} = useSpaceData // ReactQuery훅 만들어서 space data를 받아와야 한다.
  const [awareness, setAwareness] = useState<any>(null);
  const [sessions, setSessions] = useState<object>();
  const newStore = syncedStore({
    space: {} as object,
  });
  const [store, setStore] = useState<any>(useSyncedStore(newStore));
  const [yjsDoc, setYjsDoc] = useState<any>(getYjsValue(newStore));
  console.log(store);
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
    <div className="h-full w-full">
      {awareness && (
        <RoomProvider<PresenceUserData>
          awareness={awareness}
          initialPresence={{
            name: `전데요...`,
            color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
          }}
        >
          {step === 1 && <DTOContainer store={store} />}
        </RoomProvider>
      )}
    </div>
  );
};

export default WorkContainer;
