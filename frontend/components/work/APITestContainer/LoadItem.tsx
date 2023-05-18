import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import RequestForm from './RequestForm';
import { Box, Button } from '@/components/common';
import AnimationBox from '@/components/common/AnimationBox';
import ReqBoxPostman from '../APIDocsContainer/formComponent/ReqBoxPostman';
import { HiPlusCircle } from 'react-icons/hi';
import MethodBadge from '@/components/apis/MethodBadge';
import { ApiDetailInTest } from '@/hooks/queries/queries';
interface Props {
  api: boolean;
  selectApi: () => void;
  item: ApiDetailInTest | undefined;
  currentApiId: number;
  changeSetResponse: (data: any) => void;
}

const LoadItem = function ({
  api,
  selectApi,
  item,
  currentApiId,
  changeSetResponse,
}: Props) {
  return (
    <>
      <div className="w-full h-full">
        {!api && (
          <AnimationBox className="h-full w-full flex flex-col justify-center items-center">
            <div
              className={`flex h-[40px] w-[50%] gap-2 justify-center items-center border-[1px] border-grayscale-dark py-2 border-dashed rounded-[8px] text-grayscale-dark mt-4 cursor-pointer`}
              onClick={selectApi}
            >
              Add api <HiPlusCircle />
            </div>
            <AnimationBox className="flex h-[90%] items-center justify-center">
              아직 선택된 API 가 없습니다.
            </AnimationBox>
          </AnimationBox>
        )}
        {api && (
          <AnimationBox className="h-[2.5%] w-full flex flex-col justify-center items-center"></AnimationBox>
        )}
        {api && item && (
          <AnimationBox className="h-[90%] w-full flex flex-col gap-7">
            <div className="flex flex-1 flex-row gap-4 justify-between">
              <div className="flex flex-1 items-center justify-start gap-24">
                <MethodBadge className="" method={item.method} />
                <div className="text-content flex flex-row truncate hover:text-clip">
                  {item.name}
                </div>
              </div>
              <Button isEmpty onClick={selectApi}>
                Change Api
              </Button>
            </div>
            <RequestForm
              selectedId={currentApiId}
              changeSetResponse={changeSetResponse}
            />
          </AnimationBox>
        )}
      </div>
    </>
  );
};

export default LoadItem;
