import { useState } from 'react';
import APIList from '../APIEditContainer/APIList';

const LeftContainer = function (): JSX.Element {
  const [curTab, setCurTab] = useState<'Figma' | 'All'>('Figma');

  const ToggleTab = (selected: 'Figma' | 'All'): void => {
    setCurTab(selected);
  };

  return (
    <div>
      {/* 상단 탭 */}
      <ul className={`flex items-center gap-10 text-content`}>
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
      {curTab === 'Figma' ? (
        //   화면별 api
        <div></div>
      ) : (
        //   전체 api
        <APIList />
      )}
    </div>
  );
};

export default LeftContainer;
