import { SpaceFigma } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';
import syncedStore, { getYjsDoc, getYjsValue } from '@syncedstore/core';
import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';
import { WebrtcProvider } from 'y-webrtc';
import {
  DocTypeDescription,
  MappedTypeDescription,
} from '@syncedstore/core/types/doc';
import { Awareness } from '@y-presence/client';
import { SpinnerDots } from '../common/Spinner';
import Modal from '../common/Modal';

interface YjsInterface {
  state: MappedTypeDescription<{
    figmaList: SpaceFigma[];
    apiConnectList: any[];
    apiList: any[];
    useCaseList: any[];
    overloadList: any[];
    baseUrlList: string[];
    fragment: 'xml';
  }>;
  // rtcProvider?: WebrtcProvider | undefined;
  // awareness?: Awareness | undefined;
  // connect?: (() => void) | undefined;
  // disconnect?: (() => void) | undefined;
}

const YjsContext = createContext<YjsInterface>({
  state: syncedStore({
    figmaList: [] as SpaceFigma[],
    apiConnectList: [] as any[],
    apiList: [] as any[],
    useCaseList: [] as any[],
    overloadList: [] as any[],
    baseUrlList: [] as string[],
    fragment: 'xml',
  }),
  // rtcProvider: undefined,
  // awareness: undefined,
  // connect: undefined,
  // disconnect: undefined,
});

const YjsProvider = function ({ children }: PropsWithChildren) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { Provider } = YjsContext;
  const { state } = useContext(YjsContext);
  const [rtcProvider, setRtcProvider] = useState<WebrtcProvider>();
  const [awareness, setAwareness] = useState<Awareness>();
  const [connect, setConnect] = useState<() => void>();
  const [disconnect, setDisconnect] = useState<() => void>();

  useEffect(
    function () {
      if (spaceId && state) {
        setRtcProvider(function () {
          const innerProvider = new WebrtcProvider(
            `ssafast:${spaceId}`,
            getYjsDoc(state)
          );
          const {
            awareness: innerAwareness,
            connect: innerConnect,
            disconnect: innerDisconnect,
          } = innerProvider;
          setAwareness(() => innerAwareness);
          setConnect(() => innerConnect);
          setDisconnect(() => innerDisconnect);
          return innerProvider;
        });
      }
    },
    [spaceId]
  );
  if (!spaceId) {
    return <Modal closeModal={() => null}>잠시 기다려주세요...</Modal>;
  }
  return <Provider value={{ state }}>{children}</Provider>;
};

export const useYjsState = function () {
  const value = useContext(YjsContext) as YjsInterface;
  return value;
};

export default YjsProvider;
