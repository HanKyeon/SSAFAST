import { Box, Button } from '@/components/common';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import FigmaList from '../FigmaList';
import APIList from './APIList';
import Input from '@/components/common/Input';
import { BsFilter, BsFolderPlus } from 'react-icons/bs';
import { HiOutlineSearch, HiPencil } from 'react-icons/hi';
import EomSelect from '@/components/common/EomSelect';
import ApiCreateForm from '@/components/forms/ApiCreateForm';
import Select from '@/components/common/Select';
import { useEffect, useState } from 'react';
import BoxHeader from '@/components/common/BoxHeader';

const mok = [
  {
    figmaSectionId: `1`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e56c89a6-34b7-4c8b-9e49-22c7fd82c48a',
    refreshId: `4:14`,
    name: `홈 페이지 1`,
  },
  {
    figmaSectionId: `2`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbcc8976-b92d-4454-8e61-0050b7a42f95',
    refreshId: `115:522`,
    name: `space - space메인 - Dark`,
  },
  {
    figmaSectionId: `3`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d3ac41b-03ec-4491-9c63-1f4744d45650',
    refreshId: `101:417`,
    name: `space - space메인 - Light`,
  },
  {
    figmaSectionId: `4`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dba880b8-18c0-4835-ac27-b5af934d5806',
    refreshId: `232:1897`,
    name: `Figma화면에 api 연결 - 편집`,
  },
  {
    figmaSectionId: `5`,
    sectionUrl:
      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/35599cc7-27ff-4584-834a-e53af3849446',
    refreshId: `232:2481`,
    name: `api명세 작성 - postman - dark`,
  },
];

interface Props {
  store?: any;
}

const APIContainer = function ({ store }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  useEffect(() => {
    // selectedIdx가 바뀌면 api filter를 하든 뭐
  }, [selectedIdx]);
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
          <FigmaList store={store} />
        </div>
        {/* </div> */}
      </Box>
      {/* 오른쪽 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] flex-1 items-center justify-center p-5"
      >
        {/* <ApiCreateForm /> */}
        {/* 헤더 */}
        <div className={`mb-5 flex items-center justify-between`}>
          <div className={`flex items-center gap-2`}>
            <BsFilter />
            <EomSelect />
          </div>
          <div className={`flex items-center gap-2`}>
            <Input placeholder="search" />
            <HiOutlineSearch />
          </div>
          <BsFolderPlus />
          <Button
            isEmpty
            className={`flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
          >
            Add API
            <HiPencil />
          </Button>
        </div>
        {/* api 목록 */}
        <APIList />
      </Box>
    </Box>
  );
};

export default APIContainer;
