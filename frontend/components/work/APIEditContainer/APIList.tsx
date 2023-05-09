import APIlistItem from '@/components/apis/APIlistItem';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { AiOutlineMore } from 'react-icons/ai';
import { useState } from 'react';

export type APIWritterType = {
  id: string | number;
  name: string;
  email: string;
  profileImg: string;
};

export type APIInfoType = {
  id: string | number;
  name: string;
  description: string;
  method:
    | 'PUT'
    | 'GET'
    | 'POST'
    | 'DEL'
    | 'PATCH'
    | `put`
    | `get`
    | `post`
    | `del`
    | `patch`;
  status: '명세중' | '명세완료' | '개발중' | '개발완료';
  writter: APIWritterType;
};

type APIListType = {
  categoryId: string | number;
  categoryName: string;
  apis: APIInfoType[];
};

type APIListPropsType = {};

const mockupAPIList: APIListType[] = [
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
        id: 1,
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
    ],
  },
];

const APIList = function ({}: APIListPropsType): JSX.Element {
  const [curCateIdx, setCurCateIdx] = useState<number>(0);

  const onClickOpenCate = (cateID: string | number, cateIdx: number): void => {
    setCurCateIdx(cateIdx);
  };
  return (
    <ul className={`w-full flex flex-col items-center gap-3`}>
      {mockupAPIList.map((cate, cateIdx) => (
        <li key={cate.categoryId} className={`w-full`}>
          <div className={`mb-1 flex items-center gap-3`}>
            <div
              className={`flex items-center gap-3 cursor-pointer`}
              onClick={() => onClickOpenCate(cate.categoryId, cateIdx)}
            >
              <i className={`text-[20px]`}>
                {curCateIdx === cateIdx ? (
                  <BsFolder2Open />
                ) : (
                  <BsFolder className={`mt-[2px]`} />
                )}
              </i>
              <span>{cate.categoryName}</span>
            </div>
            <AiOutlineMore
              className={`text-grayscale-dark hover:text-theme-white-strong`}
            />
          </div>
          <ul
            className={`w-[90%] my-0 mx-auto flex flex-col items-center gap-1 duration-[0.33s]`}
          >
            {curCateIdx === cateIdx &&
              cate.apis.map((api, apiIdx) => (
                <APIlistItem
                  key={api.id}
                  item={api}
                  className={`w-full duration-[0.33s] hover:scale-[101%]`}
                />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default APIList;
