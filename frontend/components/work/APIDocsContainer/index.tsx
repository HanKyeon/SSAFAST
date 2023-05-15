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
import { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';

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

const mockupData2: MockupData2Type = {
  request: {
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
          desc: '사용자 PW',
          itera: false,
          constraints: ['NotNull'],
          value: null,
        },
      ],
      nestedDtos: {
        '11': {
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
        '8': {
          name: 'UserInfo', // 실제 dto class 이름
          keyName: '8Dto', // 사용자가 지정한 변수명 e.g) Test test2;
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
          nestedDtos: {
            '7': {
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
          },
        },
      },
      nestedDtoList: {
        '12': {
          name: 'RecUserInfo',
          keyName: null,
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
};

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}
const APIDocsContainer = function ({ store, serverSideStore }: Props) {
  const [curStatus, setCurStatus] = useState<number>(0);
  const onChangeStatus = (): void => {
    setCurStatus((prev) => (curStatus === 3 ? 0 : prev + 1));
  };
  const methods = useForm<ApiTestForm>({
    defaultValues: {
      request: mockupData2.request,
    },
  });
  const { control, handleSubmit } = methods;

  const checkData = function (data: ApiTestForm) {
    console.log(data);
  };
  return (
    <div className="h-full flex justify-center items-center gap-3">
      {/* 왼쪽 화면 */}
      <Box className="h-full p-5 flex-1">
        <LeftContainer store={store} />
      </Box>
      {/* 오른쪽 화면 */}
      <div className="h-full flex-1 min-w-0">
        <FormProvider {...methods}>
          <form className="w-full h-full" onSubmit={handleSubmit(checkData)}>
            <div className={`h-full w-full flex flex-col items-center gap-3`}>
              {/* api detail */}
              <Box className="w-full p-5 gap-3">
                <div className="flex justify-between items-center">
                  <div className={`flex items-center justify-between w-[75px]`}>
                    <StatusBadge status={status[curStatus]} small />
                    {/* <IoMdArrowDropright */}
                    <MdOutlineKeyboardArrowRight
                      className={`text-[22px] duration-[0.33s] text-grayscale-deepdark hover:text-grayscale-light`}
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
                <p className="mt-[12px] text-header">게시글 목록 불러오기</p>
                <p className="mt-1 text-content text-grayscale-dark">
                  게시글 목록 쭈루리 불러오는 것
                </p>
                <div className="mt-[12px] flex gap-3 items-center">
                  <MethodBadge method={1} small />
                  <p className="text-[14px] text-grayscale-light">
                    https://localhost:8080/user/:userid
                  </p>
                </div>
              </Box>
              {/* Request */}
              <ReqBox control={control} data={mockupData2} />
              {/* Response */}
              <ResBox />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default APIDocsContainer;
