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
              mapped: false,
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
              mapped: false,
              value: paramOpt.value,
            };
          });
          // console.log(apiObj, '파람 넣기');
          // 바디
          apiObj.body = { fields: {}, nestedDtos: {}, nestedDtoList: {} };
          // 바디 필즈
          data.document.request.body?.fields?.map((bodyField) => {
            apiObj.body.fields[bodyField.keyName] = {
              type: bodyField.type,
              desc: bodyField.desc,
              itera: bodyField.itera,
              constraints: [...bodyField.constraints!],
              mapped: false,
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
                  mapped: false,
                  constraints: nestedDtoInnerFields.constraints,
                  value: nestedDtoInnerFields.value,
                };
              });

              apiObj.body.nestedDtos[nestedDtoInner.keyName!] = {
                name: nestedDtoInner.name,
                desc: nestedDtoInner.desc,
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
            headers: {},
            body: { fields: {}, nestedDtos: {}, nestedDtoLists: {} },
          };
          // 응답 헤더
          res200?.headers.forEach((header) => {
            apiObj.response.headers[header.keyName] = {
              type: header.type,
              desc: header.desc,
            };
          });
          // 응답 바디 필즈
          res200?.body.fields.forEach((resField) => {
            apiObj.response.body.fields[resField.keyName] = {
              type: resField.type,
              desc: resField.desc,
              itera: resField.itera,
            };
          });
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
                };
              });
              apiObj.response.body.nestedDtos[nestedDtoInner.keyName!] = {
                name: nestedDtoInner.name,
                desc: nestedDtoInner.desc,
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
