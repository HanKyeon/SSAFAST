import { useState } from 'react';
import APIList, { APIInfoType } from '../APIEditContainer/APIList';
import FigmaList from '../FigmaList';
import FigmaListItem from '../FigmaListItem';

const apiMok: APIInfoType[] = [
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
];

type LeftContainerPropsType = {
  store?: any;
};

const LeftContainer = function ({
  store,
}: LeftContainerPropsType): JSX.Element {
  const [curTab, setCurTab] = useState<'Figma' | 'All'>('Figma');

  const ToggleTab = (selected: 'Figma' | 'All'): void => {
    setCurTab(selected);
  };

  return (
    <div className={`flex flex-col h-full w-full`}>
      {/* 상단 탭 */}
      <ul className={`flex items-center gap-10 text-content mb-4`}>
        <li
          onClick={() => ToggleTab('Figma')}
          className={`${
            curTab === 'Figma' ? `text-mincho-strong` : `text-grayscale-dark`
          } cursor-pointer`}
        >
          화면별 api
        </li>
        <li
          onClick={() => ToggleTab('All')}
          className={`${
            curTab === 'All' ? `text-mincho-strong` : `text-grayscale-dark`
          } cursor-pointer`}
        >
          전체 api
        </li>
      </ul>
      <div className={`flex-1 overflow-y-scroll scrollbar-hide`}>
        {curTab === 'Figma' ? (
          //   화면별 api
          <FigmaList apiData={apiMok} />
        ) : (
          //   전체 api
          <APIList />
        )}
      </div>
    </div>
  );
};

export default LeftContainer;
