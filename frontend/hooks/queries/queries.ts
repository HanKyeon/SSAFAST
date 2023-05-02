import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './QueryKeys';
import axios, { AxiosRequestConfig } from 'axios';
import figmaAxios from '@/utils/figmaAxios';
import apiRequest from '@/utils/axios';
import { useStoreDispatch, useStoreSelector } from '../useStore';
import { figmaTokenActions } from '@/store/figma-token-slice';

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

export interface FigmaServerData {
  name: string;
  figmaId: string;
  image?: string | null | undefined;
  selected?: boolean;
}
export interface FigmaRefineData {
  ids: string;
  thumbnails: string;
  name: string;
  noz: FigmaServerData[];
}

export interface FigmaTokenData {
  figmaAccess: string;
  figmaRefresh: string;
}

export interface SearchUserResult {
  id: string | number;
  name: string;
  profileImg: string;
}

export interface User extends SearchUserResult {
  email: string;
}

export interface SpaceShortcut {
  workspaceId: string | number;
  name: string;
}

export interface SpaceDetail {
  figmaUrl: string;
  figmaFileId: string;
  figmaFileName: string;
  figmaImg: string;
  name: string;
  favicon: string;
  description: string;
  startDate: any;
  endDate: any;
  totalApiCount: number;
  completeApiCount: number;
  leaderId: string | number;
}

export interface TeamMember {
  id: string | number;
  memberProfileImg: string;
  memberName: string;
}

export interface SpaceFigma {
  id: string | number;
  sectionUrl: string | null;
  sectionId: string;
  name: string;
}

export interface SpaceComplete {
  totalApiCount: number;
  completeApiCount: number;
}

export interface SpaceFigmaToken {
  figmaAccessToken: string;
  figmaRefreshToken: string;
}

// space 팀 리더의 figma의 access/refresh 토큰들
export const useSpaceFigmaTokens = function (
  spaceId: string | number,
  leaderId: string | number
) {
  return useQuery<SpaceFigmaToken>({
    queryKey: queryKeys.spaceFigmaTokens(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/figma-section/token`,
        params: {
          leaderId: leaderId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!`${leaderId}`,
  });
};

// space의 api들 몇개 중 몇개 완성인지
export const useSpaceApiComplete = function (spaceId: string | number) {
  return useQuery<SpaceComplete>({
    queryKey: queryKeys.spaceApiComplete(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/project/complete`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// space가 가진 figma sections
export const useSpaceFrames = function (spaceId: string | number = ``) {
  return useQuery<SpaceFigma>({
    queryKey: queryKeys.spaceFigmas(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/figma-section/list`, // 여기에 spaceID를 같이 보내야 함. 아니면 params
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// space 멤버 확인
export const useSpaceMembers = function (spaceId: string | number) {
  return useQuery<TeamMember[]>({
    queryKey: queryKeys.spaceMembers(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/member`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// 유저 space 상세
export const useSpaceDetail = function (spaceId: string | number) {
  return useQuery<SpaceDetail>({
    queryKey: queryKeys.spaceDetail(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/project`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// 유저 space 목록
export const useSpaceList = function () {
  const { accessToken, refreshToken } = useStoreSelector(
    (state) => state.token
  );
  return useQuery<SpaceShortcut[]>({
    queryKey: queryKeys.spaceList(),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/project/list`,
      }).then((res) => res.data);
    },
    enabled: !!accessToken,
  });
};

// 토큰으로 정보 갖고 오기
export const useUserData = function () {
  const { accessToken, refreshToken } = useStoreSelector(
    (state) => state.token
  );
  return useQuery<User>({
    queryKey: queryKeys.user(),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/user`,
      }).then((res) => res.data);
    },
    enabled: !!accessToken,
  });
};

// 검색
export const useSearchUser = function (email: string) {
  return useQuery<SearchUserResult[]>({
    queryKey: queryKeys.search(),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/user/list`,
        params: {
          email,
        },
      }).then((res) => res.data);
    },
    enabled: !!email,
  });
};

// 유저 개인 피그마 토큰 확인
export const useUserFigmaTokens = function () {
  const { accessToken, refreshToken } = useStoreSelector(
    (state) => state.token
  );
  const dispatch = useStoreDispatch();
  return useQuery<FigmaTokenData>({
    queryKey: queryKeys.figmaTokens(),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/figma`, // 여기 아직임
      }).then((res) => res.data);
    },
    onSuccess: function (data) {
      dispatch(
        figmaTokenActions.setAccessToken({ figmaAccess: data.figmaAccess })
      );
      dispatch(
        figmaTokenActions.setRefreshToken({ figmaRefresh: data.figmaRefresh })
      );
    },
    enabled: !!accessToken,
  });
};

// figma 데이터 받아오기
export const useFigmaDatas = function (figmaId: string) {
  return useQuery<FigmaRefineData>({
    queryKey: queryKeys.figmaAllDatas(figmaId),
    queryFn: async function () {
      return figmaAxios({
        method: `get`,
        baseURL: `${process.env.NEXT_PUBLIC_HOSTNAME}`,
        url: `/api/figma`,
        params: {
          figmaId,
        },
      }).then((res) => {
        const data: FigmaRawDatas = res.data;
        let ret: FigmaServerData[] = [];
        let ids = ``;
        data.document.children[0].children?.map((nod) => {
          nod.children?.map((inod) => {
            if (inod.type === 'FRAME') {
              ids += inod.id + `,`;
              ret.push({
                name: inod.name!,
                figmaId: inod.id!,
              });
            }
          });
          if (nod.type === 'FRAME') {
            ids += nod.id + `,`;
            ret.push({
              name: nod.name!,
              figmaId: nod.id!,
            });
          }
        });
        return {
          ids: ids.slice(0, -1),
          thumbnails: `${data.thumbnailUrl}`,
          name: `${data.name}`,
          noz: ret,
        };
      });
    },
    enabled: !!figmaId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true,
  });
};

// figma 이미지 파일 링크 받아오기
export const useFigmaSections = function (figmaId: string, ids: string) {
  return useQuery({
    queryKey: queryKeys.figmaSections(figmaId, ids),
    queryFn: async function () {
      return figmaAxios({
        method: `get`,
        baseURL: `${process.env.NEXT_PUBLIC_HOSTNAME}`,
        url: `/api/figma-images`,
        params: {
          figmaId,
          ids,
        },
      }).then((res) => {
        return res.data;
      });
    },
    enabled: !!figmaId && !!ids,
    refetchOnMount: false,
    keepPreviousData: false,
  });
};
