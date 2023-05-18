import { Box } from '@/components/common';
import { useApiSingleTestDetail, useBaseUrl } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';
import { getWonsiType } from '@/utils/constraints';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  selectedApiId: number;
  closeModal: () => void;
}

const CodeFEComp = function ({ selectedApiId, closeModal }: Props) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: apiDetail } = useApiSingleTestDetail(spaceId, selectedApiId);
  const { data: baseURLData } = useBaseUrl(spaceId);
  const [showData, setShowData] = useState<any>(`api를 선택하세요!`);
  useEffect(
    function () {
      if (apiDetail && baseURLData) {
        let ret: any = {};
        let baseurls = baseURLData?.baseurls.find(
          (url) => url.id === apiDetail.baseurlId
        )?.url;
        let url = apiDetail.document.request.additionalUrl;
        let adUrl = apiDetail.document.request.additionalUrl.split(`/`);
        let method = [``, `get`, `post`, `put`, `delete`, `patch`][
          apiDetail.method
        ];
        let data: any = {};
        let params: any = {};
        let headers: any = {};

        // 파라미터
        apiDetail.document.request.params.forEach((field) => {
          params[field.keyName] =
            `${getWonsiType[field.type as number]} 타입, ` + `${field.desc}`;
        });
        // 헤더
        apiDetail.document.request.headers.forEach((field) => {
          headers[field.keyName] =
            `${getWonsiType[field.type as number]} 타입, ` + `${field.desc}`;
        });
        // path variable
        apiDetail.document.request.pathVars.forEach((field) => {
          adUrl = adUrl.map((prt) => {
            if (prt === `:${field.keyName}`) {
              return `\$\{${field.keyName}\}`;
            }
            return prt;
          });
        });
        // 데이터 필드
        apiDetail.document.request.body.fields.forEach((field) => {
          data[field.keyName] =
            getWonsiType[field.type as number] +
            `${field.itera ? '[]' : ''} 타입, ` +
            `${field.desc}`;
        });
        // 데이터 nested
        for (const [dtoId, bodydtodetail] of Object.entries(
          apiDetail.document.request.body.nestedDtos || {}
        )) {
          bodydtodetail.forEach((dto) => {
            let innerFields: any = {};
            dto.fields?.forEach((field) => {
              innerFields[dto.keyName!] = getWonsiType[field.type as number];
            });

            for (const [innerDtoId, InnerDetail] of Object.entries(
              dto.nestedDtos || {}
            )) {
              let innerinnerData: any = {};
              InnerDetail.map((innerdddd) => {
                innerFields[innerdddd.keyName!] =
                  innerdddd.name + ` 타입, ${innerdddd.desc}`;
              });
            }
            data[dto.name!] = innerFields;
          });
        }

        setShowData(() => {
          return {
            headers,
            method,
            url: adUrl.join(`/`),
            baseUrl: baseurls,
            params,
            data,
          };
        });
      }
    },
    [apiDetail, baseURLData]
  );
  return (
    <>
      <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
        <div className="text-[36px]">AxiosRequestConfig</div>
        <div className="text-[24px] text-red-500">
          {`${
            apiDetail?.name || ``
          } 가장 최근에 저장된 데이터 기반 코드입니다.`}
        </div>
        <Box variant="three" className="w-full h-full p-5 overflow-scroll">
          <pre>{JSON.stringify(showData, null, 2)}</pre>
        </Box>
        <div className="flex flex-row gap-4">
          <Box
            variant="three"
            className="w-[80px] h-[60px] rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
            onClick={closeModal}
          >
            닫기
          </Box>
        </div>
      </Box>
    </>
  );
};

export default CodeFEComp;
