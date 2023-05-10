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

const status: string[] = ['명세중', '명세완료', '개발중', '개발완료'];
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
    method: number; // request.method

    // useFieldArray
    headers: HeadersType[]; // request.headers
    pathVars: FieldsType[]; // request.pathVars
    params: FieldsType[]; // request.params

    body: BodyType; // request.body
  };
}
export type MockupDataItemType = {
  key: string;
  type: string;
  desc: string;
  obj?: MockupDataItemType[] | null;
};
export type HeadersType = {
  key: string;
  type: string;
  desc: string;
  value: null;
};
export type FieldsType = {
  key: string;
  type: string;
  desc: string;
  constraints: string[];
  itera?: boolean;
  value?: null | any;
};
export type DtosNestedDtoType = {
  [key: string | number]: DtoType | DtoType[];
};
export type DtoType = {
  fields: FieldsType[];
  nestedDtos: DtosNestedDtoType | DtosNestedDtoType[];
};
export type NestedDtosType = {
  [key: string | number]: DtoType;
};
export type BodyType = {
  fields: FieldsType[];
  nestedDtos?: NestedDtosType | NestedDtosType[];
};

const mockupData2: MockupData2Type = {
  request: {
    headers: [
      {
        key: 'Content-Type',
        type: 'String',
        desc: 'Define request data type',
        value: null,
      },
      {
        key: 'Age',
        type: 'Integer',
        desc: 'Fields for cashing',
        value: null,
      },
    ],
    body: {
      fields: [
        {
          key: 'ID',
          type: 'String',
          desc: 'Login User ID',
          itera: false,
          constraints: ['NotBlank', 'Size(min=4, max=10)', 'NotNull'],
          value: null,
        },
        {
          key: 'telephones',
          type: 'String',
          desc: 'cell-phone numbers with candidates',
          itera: true,
          constraints: ['NotBlank', 'NotNull', 'Length(min=2, max=5)'],
          value: null,
        },
      ],
      nestedDtos: {
        //dto id
        '15': {
          fields: [
            {
              key: 'ID',
              type: 'String',
              desc: 'User Identify Info',
              itera: false,
              constraints: ['notNull'],
            },
          ],
          nestedDtos: {
            '5': {
              fields: [
                {
                  key: 'content',
                  type: 'String',
                  desc: 'comment for user',
                  itera: true,
                  constraints: ['NotNull', 'NotEmpty'],
                },
                {
                  key: 'CreatedDate',
                  type: 'Date',
                  desc: 'Sign up date',
                  itera: false,
                  constraints: ['NotNull'],
                },
              ],
              nestedDtos: {},
            },
            '3': {
              fields: [
                {
                  key: 'content',
                  type: 'String',
                  desc: 'comment for user',
                  itera: true,
                  constraints: ['NotNull', 'NotEmpty'],
                },
                {
                  key: 'CreatedDate',
                  type: 'Date',
                  desc: 'Sign up date',
                  itera: false,
                  constraints: ['NotNull'],
                },
              ],
              nestedDtos: {},
            },
          },
        },
        //dto id
        '8': {
          fields: [
            {
              key: 'ID',
              type: 'String',
              desc: 'User Identify Info',
              itera: false,
              constraints: ['notNull'],
            },
          ],
          nestedDtos: {},
        },
      },
    },
    pathVars: [
      {
        key: 'userid',
        type: 'String',
        desc: 'for login',
        constraints: ['NotNull'],
        value: null,
      },
    ],
    params: [
      {
        key: 'age',
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
                    <button type="submit">
                      <TbSend className="text-mincho-normal cursor-pointer" />
                    </button>
                  </div>
                </div>
                <p className="mt-[12px] text-header">게시글 목록 불러오기</p>
                <p className="mt-1 text-content text-grayscale-dark">
                  게시글 목록 쭈루리 불러오는 것
                </p>
                <div className="mt-[12px] flex gap-3 items-center">
                  <MethodBadge method="GET" small />
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
