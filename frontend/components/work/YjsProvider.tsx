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
import { PresenceUserData } from './presence-type';
import * as Y from 'yjs';
import { YArray } from 'yjs/dist/src/internals';

interface YjsInterface {
  state: MappedTypeDescription<{
    figmaList: SpaceFigma[];
    apiConnectList: any[];
    apiList: any[];
    useCaseList: any[];
    overloadList: any[];
    baseUrlList: string[];
    editors: PresenceUserData[];
    fragment: 'xml';
  }>;
}

const YjsContext = createContext<YjsInterface>({
  state: syncedStore({
    figmaList: [] as SpaceFigma[],
    apiConnectList: [] as any[],
    apiList: [] as any[],
    useCaseList: [] as any[],
    overloadList: [] as any[],
    baseUrlList: [] as string[],
    editors: [] as PresenceUserData[],
    fragment: 'xml',
  }),
});

const YjsProvider = function ({ children }: PropsWithChildren) {
  const { Provider } = YjsContext;
  const { state } = useContext(YjsContext);
  return <Provider value={{ state }}>{children}</Provider>;
};

export const useYjsState = function () {
  const value = useContext(YjsContext) as YjsInterface;
  const { state } = value;
  const doc = getYjsDoc(state);
  const figmaY: YArray<SpaceFigma> = doc.getArray('figmaList');
  return { state, doc, figmaY };
};

export default YjsProvider;
