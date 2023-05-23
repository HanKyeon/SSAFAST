import { useQueries, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queries/QueryKeys';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import apiRequest from '@/utils/axios';
import { ApiDetailAtTest, ApiDetailInTest } from './queries/queries';
import { useMemo } from 'react';

const useUcWithIds = function (ids: string) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const idList = ids.split(`,`);
  const rootApiId = idList.length ? idList[0] : 0;

  const a = useQueries({
    queries: idList.map((id, idx) => {
      return {
        queryKey: queryKeys.spaceUseCaseApiDetailSpecial(spaceId, id),
        queryFn: async function () {
          return apiRequest({
            method: `get`,
            url: `/api/api/${id}/detail`,
          }).then((res) => {
            return res.data;
          });
        },
        enabled: !!id && !!ids,
      };
    }),
  });

  // console.log(testDetails);
  const testDetails: any = useMemo(
    function () {
      let itestDetails: any = {};
      a.map((v, idx) => {
        if (v.data) {
          const data: ApiDetailInTest = v.data;
          // 각 api에 들어갈 Object. testDetail에 넣어줄 것이다.
          let apiObj: any = {};
          // url
          apiObj.additionalUrl = data.document.request.additionalUrl;
          // 부모
          if (idx !== 0) {
            apiObj.parent = idList[idx - 1]; // 루트일 경우 무슨 값일지 모름.
          }
          // 자식
          if (idx !== idList.length - 1) {
            apiObj.child = idList[idx + 1]; // 맨 바닥일 경우 모름
          }
          // console.log(apiObj, '부모자식 넣기');
          // 헤더
          apiObj.headers = {};
          data.document.request.headers?.forEach((headerOpt) => {
            apiObj.headers[headerOpt.keyName] = {
              type: headerOpt.type,
              desc: headerOpt.desc,
              mapped: false as boolean,
              value: headerOpt.value,
            };
          });
          // console.log(apiObj, '헤더 넣기');
          // 파람
          apiObj.params = {};
          data.document.request.params?.forEach((paramOpt) => {
            apiObj.params[paramOpt.keyName] = {
              type: paramOpt.type,
              desc: paramOpt.desc,
              itera: paramOpt.itera,
              constraints: [...paramOpt.constraints!],
              mapped: false as boolean,
              value: paramOpt.value,
            };
          });
          // console.log(apiObj, '파람 넣기');
          // 패스
          apiObj.pathVars = {};
          data.document.request.pathVars.forEach((pathOpt) => {
            apiObj.pathVars[pathOpt.keyName] = {
              type: pathOpt.type,
              desc: pathOpt.desc,
              constraints: [...pathOpt.constraints!],
              mapped: false as boolean,
              value: pathOpt.value,
            };
          });
          // 바디
          apiObj.body = { fields: {}, nestedDtos: {}, nestedDtoList: {} };
          // 바디 필즈
          data.document.request.body?.fields?.map((bodyField) => {
            apiObj.body.fields[bodyField.keyName] = {
              type: bodyField.type,
              desc: bodyField.desc,
              itera: bodyField.itera,
              constraints: [...bodyField.constraints!],
              mapped: false as boolean,
              value: bodyField.value,
            };
          });
          // nestedDtos
          for (const [dtoId, dtoDetail] of Object.entries(
            data.document.request.body?.nestedDtos || {}
          )) {
            dtoDetail.forEach((nestedDtoInner) => {
              let nestedDtoInnerFieldsObj: any = {};
              nestedDtoInner.fields?.map((nestedDtoInnerFields) => {
                nestedDtoInnerFieldsObj[nestedDtoInnerFields.keyName!] = {
                  type: nestedDtoInnerFields.type,
                  desc: nestedDtoInnerFields.desc,
                  itera: nestedDtoInnerFields.itera,
                  mapped: false as boolean,
                  constraints: nestedDtoInnerFields.constraints,
                  value: nestedDtoInnerFields.value,
                };
              });

              apiObj.body.nestedDtos[nestedDtoInner.keyName!] = {
                name: nestedDtoInner.name,
                desc: nestedDtoInner.desc,
                mapped: false as boolean,
                fields: { ...nestedDtoInnerFieldsObj },
              };
            });
          }
          // console.log(apiObj, '바디 넣기');

          // 응답
          const res200 = data.document.response.find(
            (ress) => ress.statusCode === 200
          );
          apiObj.response = {
            // headers: {},
            // body: { fields: {}, nestedDtos: {}, nestedDtoLists: {} },
            // body: {},
          };
          // 응답 헤더
          if (res200?.headers.length && res200?.headers.length > 0) {
            apiObj.response = { headers: {} };
            res200?.headers.forEach((header) => {
              apiObj.response.headers[header.keyName] = {
                type: header.type,
                desc: header.desc,
                // mapped: false as boolean,
              };
            });
          }

          // 응답 바디 필즈
          if (res200?.body && 'fields' in res200?.body) {
            ///////////ㅡㅇㅁ,,,
            res200?.body.fields.forEach((resField) => {
              apiObj.response.body.fields[resField.keyName] = {
                type: resField.type,
                desc: resField.desc,
                itera: resField.itera,
                mapped: false as boolean,
              };
            });
          }
          // 응답 바디 nestedDtos
          for (const [dtoId, dtoDetail] of Object.entries(
            res200?.body?.nestedDtos || {}
          )) {
            dtoDetail.forEach((nestedDtoInner) => {
              let nestedDtoInnerFieldsObj: any = {};
              nestedDtoInner.fields?.map((nestedDtoInnerFields) => {
                nestedDtoInnerFieldsObj[nestedDtoInnerFields.keyName!] = {
                  type: nestedDtoInnerFields.type,
                  desc: nestedDtoInnerFields.desc,
                  itera: nestedDtoInnerFields.itera,
                  mapped: false as boolean,
                };
              });
              apiObj.response.body.nestedDtos[nestedDtoInner.keyName!] = {
                name: nestedDtoInner.name,
                desc: nestedDtoInner.desc,
                mapped: false as boolean as boolean,
                fields: { ...nestedDtoInnerFieldsObj },
              };
            });
          }
          itestDetails[data.apiId] = apiObj;
        }
      });
      return itestDetails;
    },
    [ids]
  );
  return {
    rootApiId,
    testDetails,
  };
};

export default useUcWithIds;
