import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './QueryKeys';
import axios, { AxiosRequestConfig } from 'axios';
import figmaAxios from '@/utils/figmaAxios';
import apiRequest from '@/utils/axios';
import { useStoreDispatch, useStoreSelector } from '../useStore';
import { figmaTokenActions } from '@/store/figma-token-slice';

/**
 * dtoList: 디티오 리스트
 */
export interface DtoList {
  dtoList: DtoListItem[];
}

/**
 * key: 이름
 * type: 타입
 * desc: 설명
 * itera: 배열 여부
 * constraints: 제약조건 문자열 배열
 */
export interface DtoField {
  key: string;
  type: string | number;
  desc: string;
  itera: boolean;
  constraints: string[];
}

/**
 * id: dto Id
 * name: dto name
 * description : dto 설명
 * fields: 원시 필드 리스트
 * nestedDtos: 중첩된 dto들
 */
export interface DtoDetail {
  id: number | string;
  name: string;
  description: string;
  fields?: DtoField[];
  nestedDtos?: {
    [id: number]: DtoDetail;
  };
}

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

/**
 * users: {id, name, profileImg}[]
 */
export interface SearchUserResult {
  users: { id: number; name: string; profileImg: string }[];
}

/**
 * id, name, profileImg, email
 */
export interface User {
  id: string | number;
  name: string;
  profileImg: string;
  email: string;
}
/**
 * id: 아이디
 * name: 이름
 * favicon: 프로필 이미지
 */
export interface SpaceShortcut {
  id: string | number;
  name: string;
  favicon: string;
}

/**
 * id, figmaUrl, figmaFileId, figmaFileName, figmaImg, name, favicon, description, startDate, endDate, totalApiCount, completeApiCount, baseurls, leaderId, figmaToken: {}
 */
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

/**
 * id, profileImg, name
 */
export interface TeamMember {
  id: number;
  profileImg: string;
  name: string;
}

/**
 * members
 */
export interface TeamMemberList {
  members: TeamMember[];
}

/**
 * id, sectionUrl, sectionId, name
 */
export interface SpaceFigma {
  id: string | number;
  sectionUrl: string | null;
  sectionId: string;
  name: string;
}

/**
 * totalApiCount, completeApiCount
 */
export interface SpaceComplete {
  totalApiCount: number;
  completeApiCount: number;
}

/**
 * figmaAccessToken, figmaRefreshToken
 */
export interface SpaceFigmaToken {
  figmaAccessToken: string;
  figmaRefreshToken: string;
}

/**
 * id, name, description
 */
export interface DtoListItem {
  id: number | string;
  name: string;
  keyName: string;
  desc: string;
}

export interface WonsiAttr {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  Constraints: string[];
}

interface ApiResponse {
  id: string | number;
  name: string;
  apiInfoId: string | number;
  createdTime: any;
  member: { name: string; profileImg: string };
}

interface ApiResponseDetail {
  request: {
    method: number;
    headers: {
      [key: string]: string;
    };
    pathVars: {
      [key: string]: string;
    };
    params: {
      [key: string]: string;
    };
    body: string;
  };
  response: {
    headers: {
      [key: string]: string;
    };
    body: string; // json임
    statusCode: string;
    statusCodeValue: number;
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
        url: `/api/api-pre/class`,
        params: {
          apiId,
        },
      }).then((res) => res.data);
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
        url: `/api/api-pre/request`,
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
        url: `/api/api-pre/response`,
        params: {
          resId: responseId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!apiId && !!responseId,
  });
};

// ok
// Api 응답 결과 리스트
export const useApiResultResponseList = function (
  spaceId: string | number,
  apiId: string | number
) {
  return useQuery<{ resultList: ApiResponse[] }>({
    queryKey: queryKeys.spaceResultList(spaceId, apiId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api-exec/response/list`,
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
        url: `/api/api-pre/axios`,
        params: {
          apiId: apiId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!apiId,
  });
};

export interface DtoBECode {
  dtoClass: string;
}
// Dto class 코드
export const useDtoClasses = function (
  spaceId: number | string,
  dtoId: number | string
) {
  return useQuery<DtoBECode>({
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

export const getDtoDetail = async function (dtoId: string | number) {
  return apiRequest({
    method: `get`,
    url: `/api/dto/${dtoId}`,
  });
};

// Dto 디테일
export const useDtoDetail = function (
  spaceId: string | number,
  dtoId: string | number
) {
  return useQuery<DtoDetail>({
    queryKey: queryKeys.spaceDtoDetail(spaceId, dtoId),
    queryFn: async function () {
      return getDtoDetail(dtoId).then((res) => res.data);
    },
    enabled: !!spaceId && !!dtoId,
  });
};

// Dto List
export const useDtoList = function (spaceId: string | number) {
  return useQuery<DtoList>({
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

interface CategoryList {
  categorys: { id: number | string; name: string }[];
}

// ??
// 카테고리 조회
export const useSpaceCategory = function (spaceId: string | number) {
  return useQuery<CategoryList>({
    queryKey: queryKeys.spaceCategoryList(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api-pre/category/list`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
  });
};

// 섹션 별 api 목록 조회
export const useSectionsApi = function (
  spaceId: string | number,
  sectionId: string | number
) {
  return useQuery<SpaceApiList>({
    queryKey: queryKeys.spaceSectionApis(spaceId, sectionId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api-pre/figma-section`,
        params: {
          figmaSectionId: sectionId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!sectionId,
  });
};
// api 목록
export const useSectionsApiSearch = function (
  spaceId: string | number,
  sectionId: string | number
) {
  return useQuery<any>({
    queryKey: [...queryKeys.spaceApi(spaceId), `section`, `${sectionId}`],
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/figma-section/api-list`,
        params: {
          figmaSectionId: sectionId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId && !!sectionId,
  });
};

export interface EachCateApi {
  id: number;
  name: string;
  description: string;
  method: 1 | 2 | 3 | 4 | 5;
  status: 1 | 2 | 3 | 4; // 1 명세중 2명세완료 3개발중 4개발완료
  writter: {
    id: number;
    name: string;
    email: string;
    profileImg: string;
  };
}

export interface EachCate {
  categoryId: number;
  categoryName: string;
  apis: EachCateApi[];
}
export interface SpaceApiList {
  apiCategories: EachCate[];
}

// space api 목록 (api 전체 목록 조회)
export const useSpaceApis = function (spaceId: string | number) {
  return useQuery<SpaceApiList>({
    queryKey: queryKeys.spaceApiList(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api-pre/list`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// ok
// space baseUrl 목록
export const useBaseUrl = function (spaceId: string | number) {
  return useQuery<{ baseurls: { id: string | number; url: string }[] }>({
    queryKey: queryKeys.spaceBaseUrl(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/api-pre/baseurls`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// ok
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

// ok
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

interface SelectedSpaceFrames {
  figmaSections: SpaceFigma[];
}

// ok
// space가 가진 figma sections
export const useSpaceFrames = function (spaceId: string | number = ``) {
  return useQuery<SelectedSpaceFrames>({
    queryKey: queryKeys.spaceFigmas(spaceId),
    queryFn: async function () {
      return apiRequest({
        method: `get`,
        url: `/api/workspace/figma-section/list`,
        params: {
          workspaceId: spaceId,
        },
      }).then((res) => res.data);
    },
    enabled: !!spaceId,
  });
};

// ok
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

// ok
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

// ok
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

// ok
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

// ok
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

// ok
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

// ok
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

// ok
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
