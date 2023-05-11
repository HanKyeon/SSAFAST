import { Dispatch, SetStateAction, useState } from 'react';
import RequestForm from './RequestForm';
import { Box } from '@/components/common';
import AnimationBox from '@/components/common/AnimationBox';

interface Props {
  api: boolean;
  toggleIsList: () => void;
}

const LoadItem = function ({ api, toggleIsList }: Props) {
  return (
    <>
      <div className="w-full h-full">
        {api && (
          <AnimationBox className="h-[10%] w-full flex flex-col justify-center items-center">
            API 선택하기
          </AnimationBox>
        )}
        {!api && (
          <div className="h-[10%] w-full flex flex-col justify-center items-center">
            API ITEM 놓기
          </div>
        )}
        {api && (
          <AnimationBox className="h-[90%] w-full flex flex-col">
            <RequestForm toggleIsList={toggleIsList} />
          </AnimationBox>
        )}
        {!api && <div>hi</div>}
      </div>
    </>
  );
};

export default LoadItem;
