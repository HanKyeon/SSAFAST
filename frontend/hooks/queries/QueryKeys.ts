let queryKeyMap = `
Query Key

search                                // 그냥 안할듯

user                                  // 로그인or로그아웃 시 invalidate
  ㄴspace                             // space CRUD 관련
    ㄴlist
    ㄴdetail, [spaceId]               // 하위 중 멤버, 피그마토큰 싹다 invalidate
      ㄴmembers                       // 멤버 관련 변경
      ㄴfigmas
      ㄴapicomplete
      ㄴfigmaTokens
      ㄴbaseUrl
      ㄴapi
        ㄴlist
        ㄴdetail, [apiId]
          ㄴtestdetail
          ㄴresult
            ㄴlist
            ㄴdetail, [resId]
            ㄴrequest
            ㄴdto
        ㄴsectionApi, [sectionId]
        ㄴcategoryApi, [categoryId]
        ㄴusecase
          ㄴlist
          ㄴdetail, [usecaseId]
            ㄴresponses
        ㄴoverload
          ㄴauth // 인증 확인
          ㄴlist // 결과 목록
          ㄴdetail, [overloadId] // 성능테스트 상세 조회
      ㄴdto
        ㄴlist
        ㄴdetail, [dtoId]
          ㄴcodeBE
          ㄴcodeFE

figma // 로그아웃 정도 초기화 고민할듯
  ㄴtokens // 유저 로그아웃, figmaToken변경 시
  ㄴfile
    ㄴall
    ㄴsections
`;
export const queryKeys = {
  // 검색 기능 => 사용
  search: (email: string) => [`search`, { email }] as const,

  // 유저 개인 기능 => 사용
  user: () => [`user`] as const,

  // invalid, remove를 위한 space 위치
  space: () => [...queryKeys.user(), `space`] as const,

  // space 목록. 이름, id => 사용
  spaceList: () => [...queryKeys.space(), `list`] as const,
  // space 상세. => 사용
  spaceDetail: (spaceId: string | number) =>
    [...queryKeys.space(), `detail`, `${spaceId}`] as const,
  // space에 멤버 조회 => 사용
  spaceMembers: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `member`] as const,
  // space에 선택된 figma Image List => 사용
  spaceFigmas: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `frames`] as const,
  // space의 api 완성도 => 사용
  spaceApiComplete: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `complete`] as const,
  // space의 피그마 토큰 => 사용
  spaceFigmaTokens: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `figma-tokens`] as const,
  // space의 baseURL => 사용
  spaceBaseUrl: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `baseurls`] as const,

  // space의 api들, 상단 => 사용
  spaceApi: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `api`] as const,

  // space에 귀속된 api 목록 => 사용
  spaceApiList: (spaceId: string | number) =>
    [...queryKeys.spaceApi(spaceId), `list`] as const,
  // space에 귀속된 api 상세
  spaceApiDetail: (spaceId: string | number, apiId: string | number) =>
    [...queryKeys.spaceApi(spaceId), `detail`, `${apiId}`] as const,
  spaceTestApiDetail: (spaceId: string | number, apiId: string | number) =>
    [...queryKeys.spaceApiDetail(spaceId, apiId), `test-detail`] as const,
  spaceUseCaseApiDetail: (spaceId: string | number, apiId: string | number) =>
    [
      ...queryKeys.spaceApiDetail(spaceId, apiId),
      `test-detail`,
      `usecase`,
    ] as const,
  spaceUseCaseApiDetailSpecial: (
    spaceId: string | number,
    apiId: string | number
  ) =>
    [
      ...queryKeys.spaceApiDetail(spaceId, apiId),
      `test-detail`,
      `usecase`,
      `refined`,
    ] as const,
  // space의 section 하나에 귀속된 api들 => 사용
  spaceSection: (spaceId: string | number) =>
    [...queryKeys.spaceApi(spaceId), `section`] as const,
  spaceSectionApis: (spaceId: string | number, sectionId: string | number) =>
    [...queryKeys.spaceSection(spaceId), `${sectionId}`] as const,
  // space의 category 목록 => 사용
  spaceCategoryList: (spaceId: string | number) =>
    [...queryKeys.spaceApi(spaceId), `category`, `list`] as const,
  // space의 카테고리에 종속된 api 목록들
  spaceCategoryApis: (spaceId: string | number, categoryId: string | number) =>
    [...queryKeys.spaceApi(spaceId), `category`, `${categoryId}`] as const,
  // api code => 사용
  spaceApiCodeFE: (spaceId: string | number, apiId: string | number) =>
    [...queryKeys.spaceApiDetail(spaceId, apiId), `front`] as const,

  // invalidate 용
  usecase: (spaceId: string | number) =>
    [...queryKeys.spaceApi(spaceId), `usecase`] as const,
  // usecase list
  usecaseList: (spaceId: string | number) =>
    [...queryKeys.usecase(spaceId), `list`] as const,
  // usecase detail
  usecaseDetail: (spaceId: string | number, usecaseId: string | number) =>
    [...queryKeys.usecase(spaceId), `detail`, `${usecaseId}`] as const,
  // response 응답 (apis(: usecase test실행 api들 id 목록)에 따른 response 목록)
  usecaseResponses: (spaceId: string | number, ids: string) =>
    [...queryKeys.usecase(spaceId), `detail`, `${ids}`] as const,

  // 부하 테스트
  overload: (spaceId: number | string) =>
    [...queryKeys.spaceApi(spaceId), `overload`] as const,
  // 오버로드 성능테스트 목록
  overloadList: (spaceId: number | string) =>
    [...queryKeys.overload(spaceId), `list`] as const,
  // 오버로드 상세 조회
  overloadDetail: (spaceId: number | string, overloadId: string | number) =>
    [...queryKeys.overload(spaceId), `detail`, `${overloadId}`] as const,
  // 오버로드 서버 url 인증
  overloadCertUrl: (spaceId: number | string) =>
    [...queryKeys.overload(spaceId), `auth`] as const,
  // 오버로드 인증 url 리스트
  overloadCertUrlList: (spaceId: number | string) =>
    [...queryKeys.overload(spaceId), `auth`, `list`] as const,

  // space의 dto
  spaceDto: (spaceId: string | number) =>
    [...queryKeys.spaceDetail(spaceId), `dto`] as const,
  // dto 목록 => 사용
  spaceDtoList: (spaceId: string | number) =>
    [...queryKeys.spaceDto(spaceId), `list`] as const,
  //  dto 상세 => 사용
  spaceDtoDetail: (spaceId: string | number, dtoId: string | number) =>
    [...queryKeys.spaceDto(spaceId), `detail`, `${dtoId}`] as const,
  // dto bE 코드 => 사용
  spaceDtoCodeBE: (spaceId: string | number, dtoId: string | number) =>
    [...queryKeys.spaceDtoDetail(spaceId, dtoId), `back`] as const,

  // 포스트맨
  spaceResult: (spaceId: string | number, apiId: number | string) =>
    [...queryKeys.spaceApiDetail(spaceId, apiId), `result`] as const,
  // 포스트맨 결과 리스트 => 사용
  spaceResultList: (spaceId: string | number, apiId: number | string) =>
    [...queryKeys.spaceResult(spaceId, apiId), `list`] as const,
  // 포스트맨 결과 상세 => 사용
  spaceResultDetail: (
    spaceId: string | number,
    apiId: number | string,
    responseId: number | string
  ) => [...queryKeys.spaceResult(spaceId, apiId), `${responseId}`] as const,
  // 포스트맨 결과의 요청 객체 => 사용
  spaceResultRequest: (spaceId: string | number, apiId: number | string) =>
    [...queryKeys.spaceResult(spaceId, apiId), `request`] as const,
  // 포스트맨 결과의 응답 DTO 코드 => 사용
  spaceResultDtoClass: (spaceId: string | number, apiId: number | string) =>
    [...queryKeys.spaceResult(spaceId, apiId), `dto`] as const,

  /////////////////////
  /* 피그마 API 기능 */
  /////////////////////
  figma: (figmaId: string) => [`figma`, figmaId] as const,
  // 유저 개인 피그마 토큰 => 사용
  figmaTokens: () => [...queryKeys.user(), `figma-tokens`] as const,
  // 피그마 파일 구분
  figmaFiles: (figmaId: string) =>
    [...queryKeys.figma(figmaId), `file`] as const,
  // 피그마 파일로 데이터 호출 => 사용
  figmaAllDatas: (figmaId: string) =>
    [...queryKeys.figmaFiles(figmaId), `all`] as const,
  // 피그마 섹션 이미지들. => 사용
  figmaSections: (figmaId: string, ids: string) =>
    [
      ...queryKeys.figmaFiles(figmaId),
      `sections`,
      ids.slice(0, ids.length % 10),
    ] as const,
};
