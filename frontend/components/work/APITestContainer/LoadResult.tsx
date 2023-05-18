import AnimationBox from '@/components/common/AnimationBox';
import { useEffect, useState } from 'react';
import LoadResultList from './LoadResultList';
import LoadResultDetail from './LoadResultDetail';

interface Props {
  isList: boolean;
  changeSetResponse: (data: any) => void;
  responseData: any;
  currentApiId: number;
}

const LoadResult = function ({
  changeSetResponse,
  responseData,
  currentApiId,
}: Props) {
  // useEffect(
  //   function () {
  //     console.log(isList);
  //     toggleIsList();
  //   },
  //   [isList]
  // );

  return (
    <>
      <>
        {!responseData && (
          <AnimationBox className="h-full w-full">
            <LoadResultList
              changeSetResponse={changeSetResponse}
              currentApiId={currentApiId}
            />
          </AnimationBox>
        )}
        {responseData && (
          <AnimationBox className="h-full w-full">
            <LoadResultDetail
              changeSetResponse={changeSetResponse}
              responseData={responseData}
            />
          </AnimationBox>
        )}
      </>
    </>
  );
};

export default LoadResult;
