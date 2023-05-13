import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { PresenceUserData } from '../presence-type';
import Cursor from '../../common/Cursor';
import EditTab from './EditTab';
import LoadTestContainer from './LoadTestContainer';
import UseTestContainer from './usecase/UseTestContainer';
import { PointerEvent, useCallback, useState } from 'react';

import { useStoreSelector } from '@/hooks/useStore';
interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const TestContainer = function ({ store, serverSideStore }: Props) {
  const others = useOthers<PresenceUserData>();
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
  const [USE1LOAD2, setUSE1LOAD2] = useState<1 | 2>(1);

  const goUseTest = function () {
    setUSE1LOAD2(() => 1);
  };
  const goLoadTest = function () {
    setUSE1LOAD2(() => 2);
  };
  return (
    <>
      <div
        className="h-full w-full overflow-hidden"
        onPointerMove={pointerMoveHandler}
      >
        <EditTab
          goUseTest={goUseTest}
          goLoadTest={goLoadTest}
          isActive={USE1LOAD2}
        />
        {USE1LOAD2 % 2 ? <UseTestContainer /> : <LoadTestContainer />}
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

export default TestContainer;
