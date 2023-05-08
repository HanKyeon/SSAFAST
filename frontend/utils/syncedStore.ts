import { workFigma } from '@/components/work/presence-type';
import { SpaceFigma } from '@/hooks/queries/queries';
import { syncedStore, getYjsDoc, getYjsValue } from '@syncedstore/core';
import {
  DocTypeDescription,
  MappedTypeDescription,
} from '@syncedstore/core/types/doc';
import { Awareness } from '@y-presence/client';
import { WebrtcProvider } from 'y-webrtc';
import { Doc } from 'yjs';

export interface RTCSpaceData {
  figmaList: SpaceFigma[];
  apiConnectList: any[];
  apiList: any[];
  useCaseList: any[];
  overloadList: any[];
  baseURLList: string[];
}

// Create your SyncedStore store
export const yjsStore = syncedStore({
  figmaList: [] as SpaceFigma[],
  apiConnectList: [] as any[],
  apiList: [] as any[],
  useCaseList: [] as any[],
  overloadList: [] as any[],
  baseUrlList: [] as string[],
  fragment: 'xml',
});
// Create a document that syncs automatically using Y-WebRTC
// const doc = getYjsDoc(yjsStore);
// export const webrtcProvider = new WebrtcProvider('syncedstore-todos', doc);

// export const disconnect = () => webrtcProvider.disconnect();
// export const connect = () => webrtcProvider.connect();

export class YjsClasses {
  state: MappedTypeDescription<DocTypeDescription>;
  store: any;
  rtcProvider: WebrtcProvider;
  awareness: Awareness;

  constructor(spaceId: string | number) {
    this.state = syncedStore({
      figmaList: [] as SpaceFigma[],
      apiConnectList: [] as any[],
      apiList: [] as any[],
      useCaseList: [] as any[],
      overloadList: [] as any[],
      baseUrlList: [] as string[],
      fragment: 'xml',
    });
    this.store = getYjsValue(this.state);
    this.rtcProvider = new WebrtcProvider(`ssafast${spaceId}`, this.store);
    this.awareness = this.rtcProvider.awareness;
  }
  connect() {
    this.rtcProvider.connect();
  }
  disconnect() {
    this.rtcProvider.disconnect();
  }
}
