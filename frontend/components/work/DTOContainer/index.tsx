import { useOthers, useUpdatePresence, useUsers } from '@y-presence/react';
import { PointerEvent, useCallback, useEffect, useRef } from 'react';
// import { PresenceUserData } from './WorkContainer';
import Cursor from '../../common/Cursor';
import { PresenceUserData } from '../presence-type';
import Badge from '@/components/common/Badge';
import useInput from '@/hooks/useInput';

interface DTOProps {
  store: any;
}

const DTOContainer = function ({ store }: DTOProps) {
  const others = useOthers<PresenceUserData>();
  const users = useUsers();
  //  프리센스커서 이동 관련 이벤트
  const updatePresence = useUpdatePresence<PresenceUserData>();
  const pointerMoveHandler = useCallback(
    function (e: PointerEvent) {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
        step: 1,
      });
    },
    [updatePresence]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputData, onChangeHandler, setFstData } = useInput(inputRef);
  useEffect(
    function () {
      store.space.inputData = inputData;
    },
    [inputData]
  );
  useEffect(
    function () {
      setFstData(store.space.inputData);
    },
    [store.space.inputData]
  );

  return (
    <>
      <div className="h-full w-full" onPointerMove={pointerMoveHandler}>
        <div>ㅇㅇㅇ</div>
        <div>ㅇㅇㅇ</div>
        <div>ㅇㅇㅇ</div>
        <input
          ref={inputRef}
          onChange={onChangeHandler}
          className="text-slate-900"
        />
        <div>{store.space.inputData}</div>
        {others
          .filter((user) => user.presence.step === 1)
          .map((user) => {
            return <Badge name={`asd`} />;
          })}
      </div>
      {others
        .filter((user) => user.presence.step === 1 && !user.presence.place)
        .map((user) => (
          <Cursor key={`${Math.random()}`} {...user.presence} />
        ))}
    </>
  );
};

export default DTOContainer;
