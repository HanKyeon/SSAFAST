import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './QueryKeys';
import axios from 'axios';

export interface FigmaBasic {
  id?: string;
  name?: string;
  visible?: boolean; // default: true
  type?: string;
  rotation?: number; // rotation 돌리기 관련
  pluginData?: any; // 플러그인 쓰지마!!!!
  sharedPluginData?: any; // 쓰지말라고!
  componentPropertyReferences?: Map<String, String>;
}

export interface FigmaNode extends FigmaBasic {
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number };
  absoluteRenderBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  background?: any[];
  backgroundColor?: any[];
  blendMode?: string;
  children?: FigmaNode[];
  clipsContent?: boolean;
  constraints?: object;
  effects?: any[];
  fills?: any[];
  scrollBehavior?: string;
  strokeAlign?: string;
  strokeWeight?: number;
  strokes?: any[];
}

export interface FigmaRawDepthOneDocument extends FigmaBasic {
  children: FigmaNode[];
  scrollBehavior?: string;
}

export interface FigmaRawDatas {
  componentSets: object;
  components: object;
  document: FigmaRawDepthOneDocument;
  editorType: string;
  lastModified: string;
  name: string;
  role: string;
  linkAccess: string;
  schemaVersion: number;
  styles: object;
  thumbnailUrl: string;
  version: string;
}

export const useFigmaTokens = function (figmaId: string) {
  return useQuery({
    queryKey: queryKeys.figmaTokens(figmaId),
    queryFn: async function () {
      return;
    },
    onSuccess: function () {},
    onError: function () {},
    refetchOnMount: false,
  });
};

export const useFigmaDatas = function (figmaId: string) {
  return useQuery<FigmaRawDatas>({
    queryKey: queryKeys.figmaAllDatas(figmaId),
    queryFn: async function () {
      return axios({
        // 이걸 figmaAxios로 따로 지정해야 할 것 같음.
        // 피그마 정보 받아오기
        method: `get`,
        baseURL: `https://api.figma.com`,
        url: `/v1/files/HIHVcGBjWhgE6sfaR6IKMj`, // figmaId 입력해야함.
        params: {
          depth: 3,
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIGMA_TEST_ACCESS_TOKEN}`, // 토큰 자동 입력되는 interceptor를 따로 생성해야 할듯
        },
      }).then((res) => {
        return res.data;
      });
    },
    onSuccess: function () {},
    onError: function () {},
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
  });
};

export const useFigmaSections = function (figmaId: string) {
  return useQuery({
    queryKey: queryKeys.figmaSections(figmaId),
    queryFn: async function () {
      return;
    },
    onSuccess: function () {},
    onError: function () {},
    refetchOnMount: false,
  });
};
