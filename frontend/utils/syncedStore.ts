import { workFigma } from '@/components/work/presence-type';
import { SpaceFigma } from '@/hooks/queries/queries';
import { syncedStore, getYjsDoc, getYjsValue } from '@syncedstore/core';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';
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

// export class YjsClasses {
//   yjsStore: typeof yjsStore;
//   doc: Doc;
//   rtcProvider: WebrtcProvider;
//   awareness: Awareness;

//   constructor(spaceId: string | number) {
//     this.yjsStore = yjsStore;
//     this.doc = doc;
//     this.rtcProvider = new WebrtcProvider(`${spaceId}:ssafast`, this.doc);
//     this.awareness = this.rtcProvider.awareness;
//   }
// }
