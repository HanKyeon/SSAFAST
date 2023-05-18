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
import { FormEvent, useState, useEffect, useCallback, useRef } from 'react';
import Select from '@/components/common/Select';
import BoxHeader from '@/components/common/BoxHeader';
import { SpaceApiList } from '@/hooks/queries/queries';
import ApiWrite from './ApiWrite';
import Modal from '@/components/common/Modal';
import AnimationBox from '@/components/common/AnimationBox';
import useInput from '@/hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { useCreateCategory } from '@/hooks/queries/mutations';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

interface Props {
  store?: any;
}

const APIContainer = function ({ store }: Props) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [currentApiId, setCurrentApiId] = useState<number | string>(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  useEffect(() => {
    // selectedIdx가 바뀌면 api filter를 하든 뭐
  }, [selectedIdx]);

  const toggleAddHandler = function () {
    setIsAdd((v) => !v);
  };

  const apiIdHandler = function (id: string | number) {
    setCurrentApiId(id);
  };

  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);
  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);
  const categoryRef = useRef<HTMLInputElement>(null);
  const {
    inputData: categoryInput,
    onChangeHandler: categoryChange,
    onResetHandler: categoryReset,
  } = useInput(categoryRef);

  const { mutate, mutateAsync } = useCreateCategory(parseInt(spaceId));

  const categorySubmit = function (e: FormEvent) {
    e.preventDefault();
    console.log(categoryInput);
    mutate(categoryInput);
    closeModal();
  };
  return (
    <Box
      variant="one"
      fontType="header"
      className="h-full w-full flex flex-row justify-center items-cente gap-[1.12%]"
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
          // <ApiCreateForm toggleAddHandler={toggleAddHandler} />
          <ApiWrite
            toggleAddHandler={toggleAddHandler}
            apiIdHandler={apiIdHandler}
            currentApiId={currentApiId}
          />
        ) : (
          <>
            {isModal && (
              <Modal closeModal={closeModal} parentClasses="h-[50%] w-[50%]">
                <AnimationBox className="w-full h-full">
                  <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
                    <div className="text-[24px]">카테고리를 생성해 보세요.</div>
                    <div className="min-w-[220px]">
                      <Input
                        className="text-center"
                        type="text"
                        inputref={categoryRef}
                        onChange={categoryChange}
                        placeholder="카테고리를 입력해 주세요"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        className="flex items-center justify-center cursor-pointer text-center rounded-[8px]"
                        onClick={categorySubmit}
                      >
                        생성
                      </Button>
                      <Button
                        className="cursor-pointer text-center rounded-[8px] border !border-red-500 !bg-red-500"
                        onClick={closeModal}
                      >
                        닫기
                      </Button>
                    </div>
                  </Box>
                </AnimationBox>
              </Modal>
            )}

            {/* 헤더 */}
            <div
              className={`w-full h-[7%] mb-4 flex items-center justify-between`}
            >
              <div className={`flex items-center gap-2`}>
                <BsFilter className={`text-[26px]`} />
                {/* <EomSelect
                    type="methods"
                    selectedIdx={selectedIdx}
                    setSelectedIdx={setSelectedIdx}
                  /> */}
              </div>
              <div className={`flex items-center gap-2`}>
                {/* <Input placeholder="search" />
                  <HiOutlineSearch className={`text-[22px] cursor-pointer`} /> */}
              </div>
              <div className="h-full flex flex-row gap-4 items-center">
                <BsFolderPlus
                  className={`text-[22px] cursor-pointer hover:text-mincho-strong duration-[0.33s]`}
                  onClick={openModal}
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
            </div>
            {/* api 목록 */}
            <div className="w-full h-[92%] overflow-y-scroll">
              <APIList
                toggleAddHandler={toggleAddHandler}
                apiIdHandler={apiIdHandler}
                isFiltered={true}
              />
            </div>
          </>
        )}
      </Box>
    </Box>
  );
};

export default APIContainer;
