import StatusBadge from '@/components/apis/StatusBadge';
import { Box } from '@/components/common';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import { BsDownload } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';
import { HiOutlineFolderArrowDown } from 'react-icons/hi2';
import { IoSaveOutline } from 'react-icons/io5';
import MethodBadge from '@/components/apis/MethodBadge';
import ReqBox from './ReqBox';
import ResBox from './ResBox';
import LeftContainer from './LeftContainer';
import { useCallback, useEffect, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import {
  ApiDetailInTest,
  DtoDetailForTestBody,
  DtoField,
  useApiDetail,
  useApiSingleTestDetail,
  useBaseUrl,
} from '@/hooks/queries/queries';
import { useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/utils/axios';
import ReqBoxPostman from './formComponent/ReqBoxPostman';
import ResBoxPostman from './formComponent/ResBoxPostman';
import { queryKeys } from '@/hooks/queries/QueryKeys';

const status: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
export type MockupData2Type = {
  request: {
    headers: HeadersType[];
    body: BodyType;
    pathVars: FieldsType[];
    params: FieldsType[];
  };
};
export interface ApiTestForm {
  request: {
    url: string; // request.url
    method: 1 | 2 | 3 | 4 | 5; // request.method

    // useFieldArray
    headers: HeadersType[]; // request.headers
    pathVars: FieldsType[]; // request.pathVars
    params: FieldsType[]; // request.params

    body: BodyType; // request.body
  };
}
export type HeadersType = {
  keyName: string;
  type: string | number;
  desc: string;
  value: null;
};
export type FieldsType = {
  keyName: string;
  type: string | number;
  desc: string;
  itera?: boolean;
  constraints: string[];
  value?: null | any;
};

export type NestedDtosType = {
  [key: string | number]: BodyType;
};
export type BodyType = {
  name?: string;
  keyName?: string | null;
  desc?: string;
  itera?: boolean;
  fields: FieldsType[];
  nestedDtos?: NestedDtosType | NestedDtosType[];
  nestedDtoList?: NestedDtosType | NestedDtosType[];
};

const mockupData2: ApiDetailInTest = {
  apiId: 1,
  name: `api이름`,
  description: `api설명`,
  method: 1,
  status: 1,
  baseurlId: 4,
  categoryId: 1,
  member: { id: 1, name: `작성자`, email: `asdf@asdf.com`, profileImg: `` },
  createdTime: `2023-05-17`,
  document: {
    request: {
      additionalUrl: `/api/:userId`,
      headers: [
        {
          keyName: 'Content-Type',
          type: 'String',
          desc: 'Define request data type',
          value: null,
        },
        {
          keyName: 'Age',
          type: 'Integer',
          desc: 'Fields for cashing',
          value: null,
        },
      ],
      body: {
        fields: [
          {
            keyName: 'ID',
            type: 1,
            desc: '사용자 ID',
            itera: false,
            constraints: ['NotNull'],
            value: null,
          },
          {
            keyName: 'PW',
            type: 1,
            desc: '배열 값',
            itera: true,
            constraints: ['NotNull'],
            value: null,
          },
        ],
        nestedDtos: {
          11: [
            {
              name: 'UserInfo', // 실제 dto class 이름
              keyName: '11Dto', // 사용자가 지정한 변수명 e.g) Test test2;
              desc: '사용자 정보를 저장하는 class',
              itera: false,
              fields: [
                {
                  keyName: 'userID',
                  type: 1,
                  desc: '추천인ID',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
                {
                  keyName: 'userPW',
                  type: 1,
                  desc: '추천인PW',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
              ],
              nestedDtos: {},
            },
          ],
          8: [
            {
              name: 'UserInfo', // 실제 dto class 이름
              keyName: '8Dto', // 사용자가 지정한 변수명 e.g) Test test2;
              desc: '사용자 정보를 저장하는 class',
              itera: true,
              fields: [
                {
                  keyName: 'userID',
                  type: 1,
                  desc: '추천인ID',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
                {
                  keyName: 'userPW',
                  type: 1,
                  desc: '추천인PW',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
              ],
              nestedDtos: {
                7: [
                  {
                    name: 'UserInfo', // 실제 dto class 이름
                    keyName: '7Dto', // 사용자가 지정한 변수명 e.g) Test test2;
                    desc: '사용자 정보를 저장하는 class',
                    itera: false,
                    fields: [
                      {
                        keyName: 'userID',
                        type: 1,
                        desc: '추천인ID',
                        value: null,
                        itera: false,
                        constraints: ['NotNull'],
                      },
                      {
                        keyName: 'userPW',
                        type: 1,
                        desc: '추천인PW',
                        value: null,
                        itera: false,
                        constraints: ['NotNull'],
                      },
                    ],
                    nestedDtos: {},
                  },
                ],
              },
            },
          ],
        },
        nestedDtoLists: {
          12: [
            {
              name: 'RecUserInfo',
              keyName: `recommendedPeople`,
              desc: '추천한 사용자들의 정보를 담는 class',
              itera: true,
              fields: [
                {
                  keyName: 'userID',
                  type: 1,
                  desc: '추천인ID',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
              ],
              nestedDtos: {},
            },
          ],
        },
      },
      pathVars: [
        {
          keyName: 'userid',
          type: 'String',
          desc: 'for login',
          constraints: ['NotNull'],
          value: null,
        },
      ],
      params: [
        {
          keyName: 'age',
          type: 'int',
          desc: 'user age',
          constraints: ['NotNull'],
          value: null,
        },
      ],
    },
    response: {
      statusCode: 200,
      desc: `성공`,
      headers: [],
      body: {
        fields: [],
      },
    },
  },
};

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}
const APIDocsContainer = function ({ store, serverSideStore }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { spaceId } = router.query as SpaceParams;
  const [selectedId, setSelectedId] = useState<number>(0);
  const { data: selectedApiData } = useApiSingleTestDetail(spaceId, selectedId);
  const { data: baseUrlListdata } = useBaseUrl(spaceId);
  const [curStatus, setCurStatus] = useState<number>(0);
  // status 변경
  const onChangeStatus = (): void => {
    setCurStatus((prev) => {
      apiRequest({
        method: `put`,
        url: `/api/api/status`,
        data: {
          apiId: selectedId,
          status: prev === 3 ? 0 : prev + 1,
        },
      }).then((res) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.spaceSection(spaceId),
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.spaceApiList(spaceId),
        });
      });
      return prev === 3 ? 0 : prev + 1;
    });
  };
  const methods = useForm<ApiDetailInTest>({ defaultValues: mockupData2 });
  const { control, handleSubmit, reset } = methods;

  useEffect(
    function () {
      if (selectedApiData) {
        reset(selectedApiData);
        setCurStatus(() => selectedApiData.status);
      } else {
      }
    },
    [selectedApiData]
  );

  const changeSelectedIdHandler = useCallback(function (id: number) {
    setSelectedId(() => id);
  }, []);

  const formDataSettingHandler = function (data: ApiDetailInTest) {
    console.log(data);
    let url: string = `${
      baseUrlListdata?.baseurls.find((v) => v.id === data.baseurlId)?.url! +
      selectedApiData?.document.request.additionalUrl
    }`;
    console.log(`url :`, url);
    let method = data.method;
    console.log(
      `method :`,
      [``, `GET`, `POST`, `PUT`, `DEL`, `PATCH`][data.method]
    );
    let headers: any = {};
    data.document.request.headers.forEach((v) => {
      headers[v.keyName] = v.value;
    });
    console.log(`headers :`, headers);
    let pathVars: any = {};
    data.document.request.pathVars.forEach((v) => {
      pathVars[v.keyName] = v.value;
    });
    console.log(`path variables :`, pathVars);
    let params: any = {};
    data.document.request.params.forEach((v) => {
      params[v.keyName] = v.value;
    });
    console.log(`params :`, params);
    let body: any = {};
    // fields
    data.document.request.body.fields.map((v) => {
      body[v.keyName] = v.value;
    });
    // nestedDtos
    Object.keys(data.document.request.body.nestedDtos || {}).map((dtoId) => {
      data.document.request.body.nestedDtos![dtoId].map((dto) => {
        // nestedDtos = dto
        let ret: any = {}; // 이게 dto의 value
        // dto 값의 fields
        dto.fields!.map((v) => {
          ret[v.keyName] = v.value;
        });
        // 이중 중첩 dto
        Object.keys(dto.nestedDtos!).map((idtoId) => {
          dto.nestedDtos![idtoId].map((inDto) => {
            let ininRet: any = {};
            inDto.fields!.map((innerField) => {
              ininRet[innerField.keyName] = innerField.value;
            });
            ret[inDto.keyName!] = { ...ininRet };
          });
        });
        body[dto.keyName!] = { ...ret };
      });
    });
    console.log(`body :`, body);
    console.log('최종 RequestConfig는 아래');
    console.log({
      method: `post`,
      url: `/api/api-exec`,
      data: {
        execReqData: {
          url,
          method,
          headers,
          pathVars,
          params,
          body: JSON.stringify(body),
        },
      },
    });
    // 요청 결과도 처리해야함.
    apiRequest({
      method: `post`,
      url: `/api/api-exec`,
      data: {
        execReqData: {
          url,
          method,
          headers,
          pathVars,
          params,
          body: JSON.stringify(body),
        },
      },
    }).then((res) => {
      queryClient.invalidateQueries(queryKeys.spaceResult(spaceId, selectedId));
      console.log('처리해야함');
    });
  };
  return (
    <div className="h-full w-full flex justify-center items-center gap-[1.12%]">
      {/* 왼쪽 화면 */}
      <Box className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center p-5 flex flex-col overflow-hidden">
        <LeftContainer
          store={store}
          selectedId={selectedId}
          changeSelectedId={changeSelectedIdHandler}
        />
      </Box>
      {/* 오른쪽 화면 */}
      <div className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center flex flex-col overflow-hidden">
        <FormProvider {...methods}>
          <form
            className="w-full h-full"
            onSubmit={handleSubmit(formDataSettingHandler)}
          >
            <div className={`h-full w-full flex flex-col items-center gap-3`}>
              {/* api detail */}
              <Box className="w-full p-5 gap-3">
                <div className="flex justify-between items-center">
                  <div className={`flex items-center justify-between w-[75px]`}>
                    <StatusBadge
                      status={status[selectedApiData?.status || curStatus]}
                      small
                    />
                    {/* <IoMdArrowDropright */}
                    <MdOutlineKeyboardArrowRight
                      className={`text-[22px] duration-[0.33s] text-grayscale-deepdark hover:text-grayscale-light cursor-pointer`}
                      onClick={onChangeStatus}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[20px]">
                    <BsDownload />
                    <HiOutlineFolderArrowDown />
                    <IoSaveOutline />
                    <button title="submit-btn" type="submit">
                      <TbSend className="text-mincho-normal cursor-pointer" />
                    </button>
                  </div>
                </div>
                <p className="mt-[12px] text-header">
                  {selectedApiData?.name || '게시글 목록 불러오기'}
                </p>
                <p className="mt-1 text-content text-grayscale-dark">
                  {selectedApiData?.description ||
                    '게시글 목록 쭈루리 불러오는 것'}
                </p>
                <div className="mt-[12px] flex gap-3 items-center">
                  <MethodBadge
                    method={(selectedApiData?.method as 1 | 2 | 3 | 4 | 5) || 1}
                    small
                  />
                  <p className="text-[14px] text-grayscale-light">
                    {baseUrlListdata?.baseurls.find(
                      (v) => v.id === selectedApiData?.baseurlId
                    )?.id || 'https://localhost:8080/user/:userid'}
                  </p>
                </div>
              </Box>
              {/* Request */}
              <ReqBoxPostman selectedId={selectedId} />
              {/* Response */}
              <ResBoxPostman selectedId={selectedId} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default APIDocsContainer;
