import ToggleableHeader from '@/components/work/APIDocsContainer/ToggleableHeader';
import { Box } from '@/components/common';
import { useState } from 'react';
import ReqItem from './ReqItem';
import ReqItemBody from './ReqItemBody';

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
  dtos: NestedDtosType | NestedDtosType[];
};
export type MockupData2Type = {
  headers: HeadersType[];
  body: BodyType;
  path_variable: FieldsType[];
  params: FieldsType[];
};
const mockupData2: MockupData2Type = {
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
    dtos: {
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
  path_variable: [
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
};

const ReqBox = function (): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Box
      className={`${
        isOpen && 'flex-1'
      } w-full relative min-h-0 overflow-scroll scrollbar-hide duration-[0.33s]`}
    >
      <ToggleableHeader
        title="Request"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      {isOpen && (
        <div className={`p-2 pb-4 flex flex-col gap-3`}>
          {mockupData2.headers && (
            <ReqItem name="headers" item={mockupData2.headers} />
          )}
          {mockupData2.body && (
            <ReqItemBody name="body" item={mockupData2.body} />
          )}
          {mockupData2.path_variable && (
            <ReqItem name="path variable" item={mockupData2.path_variable} />
          )}
          {mockupData2.params && (
            <ReqItem name="params" item={mockupData2.params} />
          )}
        </div>
      )}
    </Box>
  );
};

export default ReqBox;
