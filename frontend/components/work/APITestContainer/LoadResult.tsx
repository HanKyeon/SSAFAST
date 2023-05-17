import AnimationBox from '@/components/common/AnimationBox';
import { useState } from 'react';
import LoadResultList from './LoadResultList';
import LoadResultDetail from './LoadResultDetail';

interface Props {
  isList: boolean;
  toggleIsList: () => void;
}

const LoadResult = function ({ isList, toggleIsList }: Props) {
  return (
    <>
      <AnimationBox isOpened={isList} className="h-full w-full">
        <LoadResultList toggleIsList={toggleIsList} />
      </AnimationBox>

      <AnimationBox isOpened={!isList} className="h-full w-full">
        <LoadResultDetail toggleIsList={toggleIsList} />
      </AnimationBox>
    </>
  );
};

export default LoadResult;
