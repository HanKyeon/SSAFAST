import { useForm } from 'react-hook-form';
import { Box, Button, CircleBtn } from '../common';
import { useEffect, useState } from 'react';
import { BaseForm, RequestForm, ResponseForm } from './index';
import { useStoreSelector } from '@/hooks/useStore';
import AnimationBox from '../common/AnimationBox';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ResponseFormData } from './ResponseForm';
import { RequestFormData } from './RequestForm';
import { BaseFormData } from './BaseForm';

// Form Tab 스타일
const selectedStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-b-[3px] border-mincho-strong active:border-teal-600 text-mincho-strong active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-b-[3px] active:text-mincho-normal'
      : 'border-b-[3px] border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong active:bg-grayscale-light active:bg-opacity-70 active:border-taro-normal active:border-b-[3px] active:text-taro-normal'
  }` as const;

// Form을 모을 최상위 함수
const ApiCreateForm = function () {
  const baseMethods = useForm<BaseFormData>();
  const responseMethods = useForm<ResponseFormData>();
  const requestMethods = useForm<RequestFormData>();
  const { dark } = useStoreSelector((state) => state.dark);
  const [step, setStep] = useState<number>(1);

  // Request Tab 이동
  const requestTabHandler = function () {
    setStep(() => 1);
  };
  // Response Tab 이동
  const responseTabHandler = function () {
    setStep(() => 2);
  };

  // base form data 가져오는 함수
  const baseGetter = function () {
    baseMethods.getValues();
  };
  // request form data 가져오는 함수
  const requestGetter = function () {
    requestMethods.getValues();
  };
  // response form data 가져오는 함수
  const responseGetter = function () {
    responseMethods.getValues();
  };

  // 폼 저장시 최종 호출을 할 버튼 함수.
  const onSubmit = function () {
    baseGetter();
    requestGetter();
    responseGetter();
    console.log('베이스', baseMethods.getValues());
    console.log('리퀘스트', requestMethods.getValues());
    console.log('리스폰스', responseMethods.getValues());
  };

  return (
    <>
      <div>
        <Button isEmpty className="flex flex-row gap-2 items-center">
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>

      <Box
        fontType="normal"
        className="flex justify-around flex-row items-center box-border pt-5"
      >
        <div
          className={`${step === 1 ? selectedStyle(dark) : ''} cursor-pointer `}
          onClick={requestTabHandler}
        >
          Request
        </div>
        <div
          className={`${step === 2 ? selectedStyle(dark) : ''} cursor-pointer `}
          onClick={responseTabHandler}
        >
          Response
        </div>
      </Box>
      <button onClick={onSubmit}>최종 제출</button>
      <AnimationBox
        className={`${
          step === 1 ? '' : 'hidden'
        } flex flex-col w-full h-full justify-center`}
      >
        <BaseForm methods={baseMethods} baseGetter={baseGetter} />
        <RequestForm methods={requestMethods} requestGetter={requestGetter} />
      </AnimationBox>

      <AnimationBox
        className={`${
          step === 2 ? '' : 'hidden'
        } flex w-full h-full justify-center`}
      >
        <ResponseForm
          methods={responseMethods}
          responseGetter={responseGetter}
        />
      </AnimationBox>
    </>
  );
};

export default ApiCreateForm;
