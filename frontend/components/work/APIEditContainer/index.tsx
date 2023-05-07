import { useOthers, useUpdatePresence, useUsers } from '@y-presence/react';
import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
// import { PresenceUserData } from './WorkContainer';
import Cursor from '../../common/Cursor';
import { PresenceUserData } from '../presence-type';
import Badge from '@/components/common/Badge';
import useInput from '@/hooks/useInput';
import EditTab from './EditTab';
import { useSyncedStore } from '@syncedstore/react';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import APIContainer from './APIContainer';
import DTOContainer from './DTOContainer';
import { useStoreSelector } from '@/hooks/useStore';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const APIEditContainer = function ({ store, serverSideStore }: Props) {
  const others = useOthers<PresenceUserData>();
  const users = useUsers();
  //  프리센스커서 이동 관련 이벤트
  const state = useSyncedStore(store);
  const updatePresence = useUpdatePresence<PresenceUserData>();
  const pointerMoveHandler = useCallback(
    function (e: PointerEvent) {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    },
    [updatePresence]
  );

  const { presence: isPresence } = useStoreSelector((state) => state.dark);
  const [API1DTO2, setAPI1DTO2] = useState<1 | 2>(1);
  const goAPI = function () {
    setAPI1DTO2(() => 1);
  };
  const goDTO = function () {
    setAPI1DTO2(() => 2);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className="h-full w-full overflow-hidden"
        onPointerMove={pointerMoveHandler}
      >
        <EditTab goAPI={goAPI} goDTO={goDTO} isActive={API1DTO2} />
        {API1DTO2 % 2 ? <APIContainer store={store} /> : <DTOContainer />}
      </div>
      {isPresence &&
        others
          .filter((user) => user.presence.step === 1 && !user.presence.place)
          .map((user) => (
            <Cursor key={`${Math.random()}`} {...user.presence} />
          ))}
    </>
  );
};

export default APIEditContainer;
