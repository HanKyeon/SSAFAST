import { SpaceFigma } from '@/hooks/queries/queries';
import syncedStore from '@syncedstore/core';
import { PropsWithChildren, useContext, createContext } from 'react';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';
import { PresenceUserData } from './presence-type';

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
  return value;
};

export default YjsProvider;
