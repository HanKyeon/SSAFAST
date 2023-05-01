import ToggleableHeader from '@/components/apis/ToggleableHeader';
import { Box } from '@/components/common';
import { SetStateAction, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const mockupData = {
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
    { key: 'user', type: 'userDTO', desc: 'user에 대한 DTO' },
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
    <Box className={`${isOpen && 'flex-1'} w-full duration-[0.33s]`}>
      <ToggleableHeader
        title="Request"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      {isOpen && (
        <>
          {headers && (
            <div>
              <ToggleableHeader
                title="Headers"
                isOpen={isOpenHeaders}
                setIsOpen={setIsOpenHeaders}
              />
              <div className="px-10">header의 내뇽</div>
            </div>
          )}
          {body && <div></div>}
          {pathVariable && <div></div>}
          {params && <div></div>}
        </>
      )}
    </Box>
  );
};

export default RequestBox;
