import { Button, Input } from '@/components/common';
import EomSelect from '@/components/common/EomSelect';
import { BsCheckLg, BsFilter, BsFolderPlus } from 'react-icons/bs';
import { HiOutlineSearch, HiPencil } from 'react-icons/hi';
import APIList, { APIInfoType, APIListType } from '../APIEditContainer/APIList';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useMappingApi } from '@/hooks/queries/mutations';
import {
  EachCate,
  EachCateApi,
  SpaceApiList,
  useSectionsApi,
  useSpaceApis,
} from '@/hooks/queries/queries';

// const allAPIList: sectionsApi = [
//   {
//     categoryId: 1,
//     categoryName: 'user',
//     apis: [
//       {
//         id: 1,
//         name: '전체 회원 목록',
//         description: '아무튼 다 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 2,
//         name: '회원 한명 조회',
//         description: '한명 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 3,
//         name: '회원가입',
//         description: '아무튼 가입',
//         method: 'POST',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//     ],
//   },
//   {
//     categoryId: 2,
//     categoryName: 'mypage',
//     apis: [
//       {
//         id: 4,
//         name: '내 정보 수정',
//         description: '내 정보를 막 수정해버려',
//         method: 'PUT',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 5,
//         name: '전체 회원 목록',
//         description: '아무튼 다 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 6,
//         name: '회원 한명 조회',
//         description: '한명 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 7,
//         name: '회원가입',
//         description: '아무튼 가입',
//         method: 'POST',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 8,
//         name: '전체 회원 목록',
//         description: '아무튼 다 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 9,
//         name: '회원 한명 조회',
//         description: '한명 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 10,
//         name: '회원가입',
//         description: '아무튼 가입',
//         method: 'POST',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 11,
//         name: '전체 회원 목록',
//         description: '아무튼 다 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 12,
//         name: '회원 한명 조회',
//         description: '한명 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 13,
//         name: '회원가입',
//         description: '아무튼 가입',
//         method: 'POST',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 14,
//         name: '전체 회원 목록',
//         description: '아무튼 다 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 15,
//         name: '회원 한명 조회',
//         description: '한명 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 16,
//         name: '회원가입',
//         description: '아무튼 가입',
//         method: 'POST',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 17,
//         name: '전체 회원 목록',
//         description: '아무튼 다 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 18,
//         name: '회원 한명 조회',
//         description: '한명 가져오는거',
//         method: 'GET',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//       {
//         id: 19,
//         name: '회원가입',
//         description: '아무튼 가입',
//         method: 'POST',
//         status: '명세중',
//         writter: {
//           id: 1,
//           name: '로사짱',
//           email: 'a@naver.com',
//           profileImg: 'anjanj.png',
//         },
//       },
//     ],
//   },
// ];
const checkedMok: SpaceApiList = {
  apiCategories: [
    {
      categoryId: 1,
      categoryName: 'user',
      apis: [
        {
          id: 1,
          name: '전체 회원 목록',
          description: '아무튼 다 가져오는거',
          method: 'GET',
          status: 1,
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
          status: 1,
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
          status: 2,
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
          status: 4,
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
          status: 3,
          writter: {
            id: 1,
            name: '로사짱',
            email: 'a@naver.com',
            profileImg: 'anjanj.png',
          },
        },
      ],
    },
  ],
};

type RightContainerPropsType = {
  sectionId: string | number;
};

const RightContainer = function ({
  sectionId,
}: RightContainerPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: checkedAPIList,
    // isLoading,
    // isError,
  } = useSectionsApi(spaceId, sectionId);
  const {
    data: allAPIList,
    //  isLoading,
    //   isError,
  } = useSpaceApis(spaceId);
  const { mutate } = useMappingApi(spaceId, sectionId);

  const [filterIdx, setFilterIdx] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [refinedCheckedList, setRefinedCheckedList] = useState<
    (number | string)[]
  >([]);

  const handleButton = (e: FormEvent, saveBtn: boolean) => {
    e.preventDefault();
    if (saveBtn) {
      // refinedCheckList DB에 날려!
      mutate(refinedCheckedList);
    }
    setIsSaved((prev) => !prev);
  };

  useEffect(() => {
    console.log(refinedCheckedList, '<<<<<<<<<<<<<<<<<<<<<');
  }, [refinedCheckedList]);

  const onToggleCheck = (apiId: number | string, check: boolean): void => {
    setRefinedCheckedList((prev) =>
      check ? [...prev, apiId] : [...prev.filter((id) => id !== apiId)]
    );
  };

  useEffect(() => {
    setRefinedCheckedList(() => {
      let selectedIds: (number | string)[] = [];
      // sectionApiList?.apiCategories;
      checkedAPIList?.apiCategories
        ?.map((cate: EachCate) => {
          return cate.apis.map((api: EachCateApi) => api.id);
        })
        .map((arr: (number | string)[]) => {
          selectedIds = [...selectedIds, ...arr];
        });
      return selectedIds;
    });
  }, [checkedAPIList]);

  return (
    <>
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
        {/* <BsFolderPlus
          className={`text-[22px] cursor-pointer hover:text-mincho-strong duration-[0.33s]`}
        /> */}
        {isSaved ? (
          <Button
            isEmpty
            className={`w-[125px] flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
            onClick={(e) => handleButton(e, false)}
          >
            편집
            <HiPencil />
          </Button>
        ) : (
          <Button
            className={`w-[125px] flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
            onClick={(e) => handleButton(e, true)}
          >
            <b className={``}>{refinedCheckedList.length}</b>저장
            <BsCheckLg />
          </Button>
        )}
      </div>
      <APIList
        apiList={
          isSaved && checkedAPIList
            ? checkedAPIList
            : isSaved && allAPIList
            ? allAPIList
            : checkedMok
        }
        checkedIds={!isSaved ? refinedCheckedList : undefined}
        checkBox={!isSaved} // 체크박스 달고있을지 말지
        onToggleCheck={onToggleCheck}
      />
    </>
  );
};

export default RightContainer;
