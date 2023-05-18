import apiRequest from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { queryKeys } from './QueryKeys';
import { useStoreDispatch } from '../useStore';
import { DispatchLogout, DispatchToast } from '@/store';
import { UsecaseDetailType } from './queries';

export const useExample = function () {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function () {
      return apiRequest({});
    },
    onSuccess: function () {},
    onError: function () {},
  });
};

// 로그아웃
export const useLogoutMutation = function () {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function () {
      return apiRequest({
        method: `post`,
        url: `/api/auth/logout`,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.user());
      dispatch(DispatchLogout());
      dispatch(DispatchToast('로그아웃 성공!', true));
    },
    onError: function () {
      dispatch(DispatchToast('로그아웃 실패!', false));
    },
  });
};

// figmaToken 업데이트
export const useFigmaTokenMutation = function () {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function ({
      figmaAccess,
      figmaRefresh,
    }: {
      figmaAccess: string;
      figmaRefresh: string;
    }) {
      return apiRequest({
        method: `put`,
        url: `/api/user/figma-token`,
        data: {
          figmaAccess: figmaAccess,
          figmaRefresh: figmaRefresh,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.figmaTokens(),
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.length === 5 && query.queryKey[4] === 'figma-tokens',
      });
      dispatch(DispatchToast('피그마 토큰 갱신 완료!', true));
    },
    onError: function () {
      dispatch(DispatchToast('피그마 토큰 갱신 실패! 재시도 바랍니다.', false));
    },
  });
};

interface CreateSpaceData {
  figmaUrl: string;
  figmaFileId: string;
  figmaFileName: string;
  figmaImg: string;
  name: string;
  favicon: string;
  description: string;
  startDate: any;
  endDate: string;
  baseurls: string[];
  figmaAccessToken?: string;
  figmaRefreshToken?: string;
}
// space 생성
export const useCreateSpaceMutation = function () {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (data: CreateSpaceData) {
      return apiRequest({
        method: `post`,
        url: `/api/workspace/project`,
        data,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceList(),
      });
      dispatch(DispatchToast('생성 완료!', true));
    },
    onError: function () {
      dispatch(DispatchToast('생성 실패! 재시도 바랍니다.', false));
    },
  });
};

// space 수정
export const useUpdateSpaceMutation = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (data: CreateSpaceData) {
      return apiRequest({
        method: `put`,
        url: `/api/workspace/project`,
        data,
        params: {
          workspaceId: spaceId,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceList(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceDetail(spaceId),
      });
      dispatch(DispatchToast('수정 완료!', true));
    },
    onError: function () {
      dispatch(DispatchToast('수정 실패! 재시도 바랍니다.', false));
    },
  });
};
// space 삭제
export const useDeleteSpaceMutation = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (data: CreateSpaceData) {
      return apiRequest({
        method: `delete`,
        url: `/api/workspace/project`,
        data,
        params: {
          workspaceId: spaceId,
        },
      });
    },
    onSuccess: function () {
      queryClient.removeQueries({
        queryKey: queryKeys.spaceList(),
      });
      queryClient.removeQueries({
        queryKey: queryKeys.spaceDetail(spaceId),
      });
      dispatch(DispatchToast('삭제 완료!', true));
    },
    onError: function () {
      dispatch(DispatchToast('삭제 실패! 재시도 바랍니다.', false));
    },
  });
};

interface Section {
  sectionUrl: string | null;
  sectionId: string;
  name: string;
}
// space에 섹션 추가. 없는 것만 post로.
export const useSaveFigmaSections = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (sectionList: Section[]) {
      return apiRequest({
        method: `post`,
        url: `api/workspace/figma-section`,
        params: {
          workspaceId: spaceId,
        },
        data: {
          figmaSections: sectionList,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceFigmas(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('화면 추가 성공!', true));
    },
    onError: function () {
      dispatch(DispatchToast('화면 추가 실패! 재시도 바랍니다.', false));
    },
  });
};

export const useUpdateFigmaSections = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (sectionList: Section[]) {
      return apiRequest({
        method: `put`,
        url: `api/workspace/figma-section`,
        params: {
          workspaceId: spaceId,
        },
        data: {
          figmaSections: sectionList,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceFigmas(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('갱신 성공!', true));
    },
    onError: function () {
      dispatch(DispatchToast('갱신 실패! 재시도 바랍니다.', false));
    },
  });
};

// 멤버 초대
export const useAddMember = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (memberIds: []) {
      return apiRequest({
        method: `post`,
        url: `/api/workspace/member`,
        params: {
          workspaceId: spaceId,
        },
        data: {
          memberIds: memberIds,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceMembers(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('팀원 추가가 완료되었습니다.', true));
    },
    onError: function () {
      dispatch(DispatchToast('다시 시도해주세요!', false));
    },
  });
};

// 멤버 삭제
export const useDeleteMember = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (memberId: string | number) {
      return apiRequest({
        method: `delete`,
        url: `api/workspace/member/${memberId}`,
        params: {
          workspaceId: spaceId,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceMembers(spaceId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('팀원 삭제가 완료되었습니다.', true));
    },
    onError: function () {
      dispatch(DispatchToast('다시 시도해주세요!', false));
    },
  });
};

// 카테고리 생성
export const useCreateCategory = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async function (categoryName: string) {
      return apiRequest({
        method: `post`,
        url: `/api/api-pre/category`,
        params: {
          workspaceId: spaceId,
        },
        data: {
          name: categoryName,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('카테고리가 생성되었습니다.', true));
    },
    onError: function () {
      dispatch(
        DispatchToast(
          '카테고리의 이름이 중복되었습니다. 다시 시도해주세요.',
          false
        )
      );
    },
  });
};

// 카테고리 수정
export const useUpdateCategory = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async function ({
      categoryName,
      categoryId,
    }: {
      categoryName: string;
      categoryId: number;
    }) {
      return apiRequest({
        method: `put`,
        url: `/api/api-pre/category/${categoryId}}`,
        params: {
          workspaceId: spaceId,
        },
        data: {
          name: categoryName,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('카테고리 이름이 수정되었습니다.', true));
    },
    onError: function () {
      dispatch(
        DispatchToast('카테고리 수정에 실패했습니다. 다시 시도해주세요.', false)
      );
    },
  });
};

// 카테고리 삭제
export const useDeleteCategory = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async function (categoryId: number) {
      return apiRequest({
        method: `delete`,
        url: `/api/api-pre/category/${categoryId}}`,
        params: {
          workspaceId: spaceId,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('카테고리가 삭제되었습니다.', true));
    },
    onError: function () {
      dispatch(
        DispatchToast('카테고리 삭제에 실패했습니다. 다시 시도해주세요.', false)
      );
    },
  });
};

// 섹션별 api 맵핑 정보 수정 (추가 및 삭제)
export const useMappingApi = function (
  spaceId: string | number,
  figmaSectionId: string | number
) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async function (apiIds: (string | number)[]) {
      return apiRequest({
        method: `post`,
        url: `api/api-pre/figma-section`,
        params: {
          figmaSectionId,
        },
        data: {
          apiIds,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApi(spaceId),
      });
      dispatch(DispatchToast('변경사항이 저장되었습니다', true));
    },
    onError: function () {
      dispatch(DispatchToast('변경사항 저장에 실패했습니다.', false));
    },
  });
};

export const useUserMutation = function () {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (request: AxiosRequestConfig) {
      return apiRequest(request);
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.user());
    },
    onError: function () {},
  });
};

// Api 명세 생성
export const useCreateApi = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: function (data: any) {
      return apiRequest({
        method: `post`,
        url: `/api/api`,
        data: data,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApiList(spaceId),
      });

      dispatch(DispatchToast('API 생성이 완료되었습니다!', true));
    },
    onError: function () {
      dispatch(DispatchToast('다시 시도해주세요!', false));
    },
  });
};

// Api 명세 수정
export const useUpdateApi = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: function (data: any) {
      return apiRequest({
        method: `put`,
        url: `/api/api/${data.apiId}`,
        data: data.data,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApiList(spaceId),
      });

      dispatch(DispatchToast('API 수정이 완료되었습니다!', true));
    },
    onError: function () {
      dispatch(DispatchToast('다시 시도해주세요!', false));
    },
  });
};

// Api 명세 삭제
export const useDeleteApi = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: function (apiId: number) {
      return apiRequest({
        method: `delete`,
        url: `/api/api/${apiId}`,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApiList(spaceId),
      });

      dispatch(DispatchToast('API가 성공적으로 삭제되었습니다!', true));
    },
    onError: function () {
      dispatch(
        DispatchToast('삭제를 실패하였습니다. 다시 시도해주세요!', false)
      );
    },
  });
};

// Api 단일 테스트 요청
export const useSingleApiTest = function (
  spaceId: string | number,
  apiId: string | number
) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (data: any) {
      return apiRequest({
        method: `post`,
        url: `/api/api-exec`,
        data: data.execReqData,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceResult(spaceId, apiId),
      });

      dispatch(DispatchToast('Api가 성공적으로 실행되었습니다!', true));
    },
    onError: function () {
      dispatch(
        DispatchToast('요구사항에 맞지 않는 데이터를 입력하셨습니다!', false)
      );
    },
  });
};

// Api 단일테스트 결과 저장
export const useSaveSingleApiTest = function (spaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (data: any) {
      return apiRequest({
        method: `put`,
        url: `/api/api-exec/response`,
        data: data.data,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.spaceApiList(spaceId),
      });
      dispatch(DispatchToast('Api 테스트 결과가 저장되었습니다.', true));
    },
    onError: function () {
      dispatch(DispatchToast('Api 테스트 결과 저장에 실패하였습니다.', false));
    },
  });
};

// 유스케이스 테스트 생성
export const useNewUsecase = function (workspaceId: string | number) {
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (usecaseData: {
      name: string;
      description: string;
      workspaceId: number | string;
    }) {
      return apiRequest({
        method: `post`,
        url: `/api/usecase`,
        data: usecaseData,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.usecaseList(workspaceId),
      });
      dispatch(DispatchToast('새 유스케이스 테스트가 생성되었습니다.', true));
    },
    onError: function () {
      dispatch(
        DispatchToast('새 유스케이스 테스트 생성에 실패하였습니다.', false)
      );
    },
  });
};

export interface TestResponseType {
  success: boolean; // 끝까지 성공했는지
  lastApiId: string | number; // 마지막으로 실행한 apiId
  // 마지막으로 실행한 api 응답메세지
  lastApiResponse: {
    headers: any;
    body: {
      result: any;
    };
    statusCode: string;
    statusCodeValue: number;
  };
}

// 유스케이스 테스트 실행 & 수정
export const useTestUsecase = function (spaceId: string | number) {
  const queryClient = useQueryClient();
  const dispatch = useStoreDispatch();
  return useMutation({
    mutationFn: function (testData: UsecaseDetailType) {
      return apiRequest({
        method: `put`,
        url: `/api/usecase/exec`,
        data: testData,
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: queryKeys.usecase(spaceId),
      });
      dispatch(
        DispatchToast('유스케이스 테스트가 현재 상태로 저장되었습니다.', true)
      );
    },
    onError: function () {
      dispatch(
        DispatchToast('유스케이스 테스트 실행 및 저장에 실패하였습니다.', false)
      );
    },
  });
};
