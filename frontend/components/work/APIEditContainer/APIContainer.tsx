import { Box, Button } from '@/components/common';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import FigmaList from '../FigmaList';
import APIList from './APIList';
import Input from '@/components/common/Input';
import { BsFilter, BsFolderPlus } from 'react-icons/bs';
import { HiOutlineSearch, HiPencil } from 'react-icons/hi';
import EomSelect from '@/components/common/EomSelect';
import { ApiCreateForm } from '@/components/forms/';
import { FormEvent, useState } from 'react';
interface Props {
  store?: any;
}

const APIContainer = function ({ store }: Props) {
  const [isAdd, setAdd] = useState<boolean>(false);
  const toggleAddHandler = function (e: FormEvent) {
    e.preventDefault();
    setAdd((v) => !v);
  };
  return (
    <Box
      variant="one"
      fontType="header"
      className="h-full w-full flex flex-row gap-[1.12%]"
    >
      {/* 왼쪽 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] flex-1 items-center justify-center overflow-y-scroll scrollbar-hide"
      >
        <FigmaList store={store} />
      </Box>
      {/* 오른쪽 */}

      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] flex-1 items-center justify-center p-5"
      >
        {isAdd ? (
          <ApiCreateForm toggleAddHandler={toggleAddHandler} />
        ) : (
          <>
            {/* 헤더 */}
            <div className={`mb-5 flex items-center justify-between`}>
              <div className={`flex items-center gap-2`}>
                <BsFilter />
                <EomSelect />
                {/* <select
              title="ApiFilterOption"
              name="method"
              defaultValue="method"
              // key="method"
              placeholder="method"
            >
              <option value="" selected>
                method
              </option>
              <option value="PUT">PUT</option>
              <option value="POST">POST</option>
              <option value="PATCH">PATCH</option>
              <option value="GET">GET</option>
              <option value="DEL">DEL</option>
            </select> */}
              </div>
              <div className={`flex items-center gap-2`}>
                <Input placeholder="search" />
                <HiOutlineSearch />
              </div>
              <BsFolderPlus />
              <Button
                isEmpty
                className={`flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
                onClick={toggleAddHandler}
              >
                Add API
                <HiPencil />
              </Button>
            </div>
            {/* api 목록 */}
            <APIList />
          </>
        )}
      </Box>
    </Box>
  );
};

export default APIContainer;
