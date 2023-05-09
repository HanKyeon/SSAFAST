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
import { FormEvent, useState, useEffect } from 'react';
import Select from '@/components/common/Select';
import BoxHeader from '@/components/common/BoxHeader';

interface Props {
  store?: any;
}

const APIContainer = function ({ store }: Props) {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  useEffect(() => {
    // selectedIdx가 바뀌면 api filter를 하든 뭐
  }, [selectedIdx]);
  const toggleAddHandler = function () {
    setIsAdd((v) => !v);
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
        className="basis-[50%] w-[50%] flex-1 flex flex-col p-5"
      >
        {/* <div className="h-full w-full p-5 flex flex-col"> */}
        <BoxHeader title="Figma" />
        <div className={`flex-1 overflow-y-scroll scrollbar-hide`}>
          <FigmaList />
        </div>
        {/* </div> */}
      </Box>
      {/* 오른쪽 */}

      <Box
        variant="two"
        fontType="normal"
        className="h-full basis-[50%] w-[50%] flex-1 flex flex-col p-5"
      >
        {isAdd ? (
          <ApiCreateForm toggleAddHandler={toggleAddHandler} />
        ) : (
          <>
            {/* 헤더 */}
            <div className={`mb-5 flex items-center justify-between`}>
              <div className={`flex items-center gap-2`}>
                <BsFilter className={`text-[26px]`} />
                <EomSelect
                  type="methods"
                  selectedIdx={selectedIdx}
                  setSelectedIdx={setSelectedIdx}
                />
              </div>
              <div className={`flex items-center gap-2`}>
                <Input placeholder="search" />
                <HiOutlineSearch className={`text-[22px] cursor-pointer`} />
              </div>
              <BsFolderPlus
                className={`text-[22px] cursor-pointer hover:text-mincho-strong duration-[0.33s]`}
              />
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
