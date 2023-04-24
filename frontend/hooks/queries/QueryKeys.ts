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
  ㄴtokens      // 피그마 토큰들
  ㄴfile     
    ㄴall          // 피그마 파일의 depth 3까지 모든 데이터
    ㄴsections     // 선택된 figma section들 데이터
`;
export const queryKeys = {
  ////////////
  /* 최상단 */
  ////////////
  user: () => [`user`] as const,
  figma: (figmaId: string) => [`figma`, figmaId] as const,

  ////////////
  /* figma */
  ////////////
  figmaTokens: (figmaId: string) =>
    [...queryKeys.figma(figmaId), `tokens`] as const,
  figmaFiles: (figmaId: string) =>
    [...queryKeys.figma(figmaId), `file`] as const,

  /////////////////////
  /* figmaFiles 하위 */
  /////////////////////
  figmaDatas: (figmaId: string) =>
    [...queryKeys.figmaFiles(figmaId), `all`] as const,
  figmaSections: (figmaId: string) =>
    [...queryKeys.figmaFiles(figmaId), `sections`] as const,
};
