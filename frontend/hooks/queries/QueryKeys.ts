let queryKeyMap = `
Query Key               //                        // Mutation invalidate

user                    // 유저 정보              // 
  ㄴspace               // 유저 space 정보        // 
    ㄴlist              // 유저가 가진 space list //
    ㄴspaceId           // space 별 정보 디테일   //
      ㄴpreview             //                        // preview에 쓰일 data들
      ㄴapi               //                        // api 작성 관련 get
      ㄴpages
figma  피그마 파일 아이디
  ㄴfile     
    ㄴall          // 피그마 파일의 depth 3까지 모든 데이터
    ㄴsections     // 선택된 figma section들 사진 데이터
`;
export const queryKeys = {
  ////////////
  /* 최상단 */
  ////////////
  user: () => [`user`] as const,
  figma: (figmaId: string) => [`figma`, figmaId] as const,

  space: (spaceId: string | number) => [queryKeys.user(), spaceId] as const,
  selectedFrames: (spaceId: string | number) =>
    [queryKeys.space(spaceId), `frames`] as const,
  figmaTokens: () => [queryKeys.user(), `figma-tokens`] as const,

  ////////////
  /* figma */
  ////////////
  figmaFiles: (figmaId: string) =>
    [...queryKeys.figma(figmaId), `file`] as const,

  /////////////////////
  /* figmaFiles 하위 */
  /////////////////////
  figmaAllDatas: (figmaId: string) =>
    [...queryKeys.figmaFiles(figmaId), `all`] as const,
  figmaSections: (figmaId: string, ids: string) =>
    [
      ...queryKeys.figmaFiles(figmaId),
      `sections`,
      ids.slice(0, ids.length % 10),
    ] as const,
};
