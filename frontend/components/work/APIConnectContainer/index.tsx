import { Box, Button, Input } from '@/components/common';
import BoxHeader from '@/components/common/BoxHeader';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import FigmaList from '../FigmaList';
import { EventHandler, FormEvent, useEffect, useState } from 'react';
import EomSelect from '@/components/common/EomSelect';
import { BsFilter, BsFolderPlus, BsCheckLg } from 'react-icons/bs';
import { HiOutlineSearch, HiPencil } from 'react-icons/hi';
import APIList, { APIListType } from '../APIEditContainer/APIList';
import { useSectionsApi } from '@/hooks/queries/queries';

const allAPIList: APIListType[] = [
  {
    categoryId: 1,
    categoryName: 'user',
    apis: [
      {
        id: 1,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 2,
        name: '회원 한명 조회',
        description: '한명 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 3,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: 'mypage',
    apis: [
      {
        id: 4,
        name: '내 정보 수정',
        description: '내 정보를 막 수정해버려',
        method: 'PUT',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 5,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 6,
        name: '회원 한명 조회',
        description: '한명 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 7,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 8,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 9,
        name: '회원 한명 조회',
        description: '한명 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 10,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 11,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 12,
        name: '회원 한명 조회',
        description: '한명 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 13,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 14,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 15,
        name: '회원 한명 조회',
        description: '한명 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 16,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 17,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 18,
        name: '회원 한명 조회',
        description: '한명 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 19,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
    ],
  },
];

const checkedAPIList: APIListType[] = [
  {
    categoryId: 1,
    categoryName: 'user',
    apis: [
      {
        id: 1,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: 'mypage',
    apis: [
      {
        id: 4,
        name: '내 정보 수정',
        description: '내 정보를 막 수정해버려',
        method: 'PUT',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 5,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 7,
        name: '회원가입',
        description: '아무튼 가입',
        method: 'POST',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
      {
        id: 8,
        name: '전체 회원 목록',
        description: '아무튼 다 가져오는거',
        method: 'GET',
        status: '명세중',
        writter: {
          id: 1,
          name: '로사짱',
          email: 'a@naver.com',
          profileImg: 'anjanj.png',
        },
      },
    ],
  },
];

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
              className={`w-[125px] flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
              onClick={handleButton}
            >
              편집
              <HiPencil />
            </Button>
          ) : (
            <Button
              className={`w-[125px] flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
              onClick={handleButton}
            >
              <b className={``}>{3}</b>저장
              <BsCheckLg />
            </Button>
          )}
        </div>
        <APIList
          apiList={isSaved ? checkedAPIList : allAPIList}
          checkedAPIList={!isSaved ? checkedAPIList : undefined}
          checkBox={!isSaved} // 체크박스 달고있을지 말지
        />
      </Box>
    </div>
  );
};

export default APIConnectContainer;
