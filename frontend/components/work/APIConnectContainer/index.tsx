import { Box, Button, Input } from '@/components/common';
import BoxHeader from '@/components/common/BoxHeader';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import FigmaList from '../FigmaList';
import { EventHandler, FormEvent, useEffect, useState } from 'react';
import EomSelect from '@/components/common/EomSelect';
import { BsFilter, BsFolderPlus, BsCheckLg } from 'react-icons/bs';
import { HiOutlineSearch, HiPencil } from 'react-icons/hi';
import APIList from '../APIEditContainer/APIList';
import { useSectionsApi } from '@/hooks/queries/queries';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const APIConnectContainer = function ({ store, serverSideStore }: Props) {
  // const {data:sectionApiList, isLoading, isError} = useSectionsApi(store.);

  const [sectionId, setSectionId] = useState<string | number | null>(null);
  const [filterIdx, setFilterIdx] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const onChangeSection = (id: string | number): void => {
    setSectionId(id);
  };
  const handleButton = (e: FormEvent) => {
    e.preventDefault();
    setIsSaved((prev) => !prev);
  };

  useEffect(() => {
    // sectionId가 변하면 거기 연결되어있는 api list 목록 가져와서 뿌림
    console.log('sectionId', sectionId);
  }, [sectionId]);

  useEffect(() => {}, []);

  return (
    <div className={`h-full flex justify-center items-center gap-3`}>
      {/* 왼쪽 */}
      <Box variant="two" className={`h-full p-5 flex-1 flex flex-col`}>
        <BoxHeader title="Figma" />
        <div className={`flex-1 overflow-y-scroll scrollbar-hide`}>
          <FigmaList onChangeSection={onChangeSection} />
        </div>
      </Box>
      {/* 오른쪽 */}
      <Box className={`h-full p-5 flex-1 flex flex-col`}>
        {/* 헤더 */}
        <div className={`mb-5 py-[12px] flex items-center justify-between`}>
          <div className={`flex items-center gap-2`}>
            <BsFilter className={`text-[26px]`} />
            <EomSelect
              type="methods"
              selectedIdx={filterIdx}
              setSelectedIdx={setFilterIdx}
            />
          </div>
          <div className={`flex items-center gap-2`}>
            <Input placeholder="search" />
            <HiOutlineSearch className={`text-[22px] cursor-pointer`} />
          </div>
          <BsFolderPlus
            className={`text-[22px] cursor-pointer hover:text-mincho-strong duration-[0.33s]`}
          />
          {isSaved ? (
            <Button
              isEmpty
              className={`flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
              onClick={handleButton}
            >
              편집
              <HiPencil />
            </Button>
          ) : (
            <Button
              className={`flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
              onClick={handleButton}
            >
              저장
              <BsCheckLg />
            </Button>
          )}
        </div>
        {/* api 목록 */}
        <APIList />
      </Box>
    </div>
  );
};

export default APIConnectContainer;
