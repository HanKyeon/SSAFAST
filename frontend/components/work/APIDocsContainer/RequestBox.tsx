import ObjItem from '@/components/work/APIDocsContainer/ObjItem';
import ToggleableHeader from '@/components/work/APIDocsContainer/ToggleableHeader';
import { Box } from '@/components/common';
import { SetStateAction, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import RequestItem from './RequestItem';

export type MockupDataItemType = {
  key: string;
  type: string;
  desc: string;
  obj?: MockupDataItemType[];
};
export type MockupDataType = {
  headers?: MockupDataItemType[];
  body?: MockupDataItemType[];
  path?: MockupDataItemType[];
  params?: MockupDataItemType[];
};
const mockupData: MockupDataType = {
  headers: [
    {
      key: 'Content-type',
      type: 'string',
      desc: 'content-type 입력. application/json 해라',
    },
  ],
  body: [
    {
      key: 'userid',
      type: 'string',
      desc: '이건 userid임',
    },
    {
      key: 'user',
      type: 'userDTO',
      desc: 'user에 대한 DTO',
      obj: [
        { key: 'userid', type: 'int', desc: '이건 userid임' },
        { key: 'username', type: 'string', desc: 'username 입니당' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
        { key: 'age', type: 'ing', desc: 'age 입력. null일 수도 있음' },
      ],
    },
  ],
};

const RequestBox = function (): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [isOpenHeaders, setIsOpenHeaders] = useState<boolean>(true);
  const [isOpenBody, setIsOpenBody] = useState<boolean>(true);
  const [isOpenPath, setIsOpenPath] = useState<boolean>(true);
  const [isOpenParams, setIsOpenParams] = useState<boolean>(true);

  const [headers, setHeaders] = useState<boolean>(true);
  const [body, setBody] = useState<boolean>(true);
  const [pathVariable, setPathVariable] = useState<boolean>(true);
  const [params, setParams] = useState<boolean>(true);

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
        <div className={`p-2 pb-4 flex flex-col gap-5`}>
          {mockupData.headers && (
            <RequestItem name="headers" item={mockupData.headers} />
          )}
          {mockupData.body && (
            <RequestItem name="body" item={mockupData.body} />
          )}
          {mockupData.path && (
            <RequestItem name="path variable" item={mockupData.path} />
          )}
          {mockupData.params && (
            <RequestItem name="params" item={mockupData.params} />
          )}
        </div>
      )}
    </Box>
  );
};

export default RequestBox;
