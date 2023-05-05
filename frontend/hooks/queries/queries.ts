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
  figmaAccessToken: string;
  figmaRefreshToken: string;
}

export interface SearchUserResult {
  users: { id: string | number; name: string; profileImg: string }[];
}

export interface User {
  id: string | number;
  name: string;
  profileImg: string;
  email: string;
}

export interface SpaceShortcut {
  id: string | number;
  name: string;
}

export interface SpaceDetail {
  id: number | string;
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
  baseurls: string[];
  leaderId: string | number;
  figmaToken: {
    figmaAccessToken: string;
    figmaRefreshToken: string;
  };
}

export interface TeamMember {
  id: string | number;
  profileImg: string;
  name: string;
}

export interface TeamMemberList {
  members: TeamMember[];
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

export interface DtoListItem {
  id: number | string;
  name: string;
  description: string;
}

export interface WonsiAttr {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  Constraints: string[];
}

export interface DepthDto {
  [key: number]: {
    fields: WonsiAttr[];
    nestedDtos?: DepthDto;
  };
}

interface ApiResponse {
  id: string | number;
  name: string;
  createdTime: any;
  member: { name: string; profileImg: string };
}

interface ApiResponseDetail {
  [key: string | number]: {
    url: string;
    request: AxiosRequestConfig;
    response: any;
  };
}

export const useApiResultResponseDtoCode = function (
  spaceId: string | number,
  apiId: string | number
) {
  return useQuery({
    queryKey: queryKeys.spaceResultDtoClass(spaceId, apiId),
    queryFn: function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/class`,
        params: {
          apiId,
        },
      });
    },
    enabled: !!spaceId && !!apiId,
  });
};

// api 테스트 요청 코드
export const useApiResultRequest = function (
  spaceId: string | number,
  apiId: string | number
) {
  return useQuery({
    queryKey: queryKeys.spaceResultRequest(spaceId, apiId),
    queryFn: function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/request`,
        params: {
          apiId: apiId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!apiId,
  });
};

// api 응답 상세
export const useApiResultResponseDetail = function (
  spaceId: string | number,
  apiId: string | number,
  responseId: string | number
) {
  return useQuery<ApiResponseDetail>({
    queryKey: queryKeys.spaceResultDetail(spaceId, apiId, responseId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/response`,
        params: {
          resId: responseId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!apiId && !!responseId,
  });
};

// Api 응답 결과
export const useApiResultResponseList = function (
  spaceId: string | number,
  apiId: string | number
) {
  return useQuery<ApiResponse[]>({
    queryKey: queryKeys.spaceResultList(spaceId, apiId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/response/list`,
        params: {
          apiId: apiId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!apiId,
  });
};

// API axios config
export const useDtoAxiosConfig = function (
  spaceId: number | string,
  apiId: number | string
) {
  return useQuery<AxiosRequestConfig>({
    queryKey: queryKeys.spaceApiCodeFE(spaceId, apiId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/axios`,
        params: {
          apiId: apiId,
        },
      });
    },
    enabled: !!spaceId && !!apiId,
  });
};
// Dto class 코드
export const useDtoClasses = function (
  spaceId: number | string,
  dtoId: number | string
) {
  return useQuery({
    queryKey: queryKeys.spaceDtoCodeBE(spaceId, dtoId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/dto/class`,
        params: {
          dtoId: dtoId,
        },
      });
    },
    enabled: !!spaceId && !!dtoId,
  });
};

// Dto 디테일
export const useDtoDetail = function (
  spaceId: string | number,
  dtoId: string | number
) {
  return useQuery<WonsiAttr | DepthDto>({
    queryKey: queryKeys.spaceDtoDetail(spaceId, dtoId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/dto/${dtoId}`,
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!dtoId,
  });
};

// Dto List
export const useDtoList = function (spaceId: string | number) {
  return useQuery<DtoListItem[]>({
    queryKey: queryKeys.spaceDtoList(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/dto/list`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// 카테고리 조회
export const useSpaceCategory = function (spaceId: string | number) {
  return useQuery({
    queryKey: queryKeys.spaceCategoryList(spaceId),
    queryFn: function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/category`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
  });
};

// api 목록 조회
export const useSectionsApi = function (
  spaceId: string | number,
  sectionId: string | number
) {
  return useQuery<any>({
    queryKey: queryKeys.spaceSectionApis(spaceId, sectionId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/figma-section/api-list`,
        params: {
          figmaSectionId: sectionId,
          method: null,
          name: null,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!sectionId,
  });
};
// api 목록 검색 캐싱.
export const useSectionsApiSearch = function (
  spaceId: string | number,
  sectionId: string | number,
  restType: string = ``,
  searchData: string = ``
) {
  return useQuery<any>({
    queryKey: [
      ...queryKeys.spaceApi(spaceId),
      `section`,
      `${sectionId}`,
      restType,
      searchData,
    ],
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/figma-section/api-list`,
        params: {
          figmaSectionId: sectionId,
          method: restType || null,
          name: searchData || null,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!sectionId,
  });
};

// space api 목록
export const useSpaceApis = function (spaceId: string | number) {
  return useQuery<
    {
      id: string | number;
      name: string;
      method: string;
      status: string | number;
    }[]
  >({
    queryKey: queryKeys.spaceApiList(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/list`,
        params: {
          workspaceId: spaceId,
        },
      });
    },
    enabled: !!spaceId,
  });
};

// space baseUrl 목록
export const useBaseUrl = function (spaceId: string | number) {
  return useQuery<{ id: string | number; url: string }[]>({
    queryKey: queryKeys.spaceBaseUrl(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api/baseurl`,
        params: {
          workspaceId: spaceId,
        },
      });
    },
    enabled: !!spaceId,
  });
};

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
        url: `/api/workspace/project/token`,
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
  return useQuery<SpaceFigma[]>({
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
  return useQuery<TeamMemberList>({
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
  return useQuery<{ workspaces: SpaceShortcut[] }>({
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
  return useQuery<SearchUserResult>({
    queryKey: queryKeys.search(email),
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
        url: `/api/user/figma-token`,
      }).then((res) => res.data);
    },
    onSuccess: function (data) {
      if (data) {
        dispatch(
          figmaTokenActions.setAccessToken({
            figmaAccess: data.figmaAccessToken,
          })
        );
        dispatch(
          figmaTokenActions.setRefreshToken({
            figmaRefresh: data.figmaRefreshToken,
          })
        );
      }
    },
    enabled: !!accessToken,
  });
};

// figma 데이터 받아오기
export const useFigmaDatas = function (figmaId: string) {
  const { figmaAccess, figmaRefresh } = useStoreSelector(
    (state) => state.figmatoken
  );
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
    enabled: !!figmaId && !!figmaAccess,
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
