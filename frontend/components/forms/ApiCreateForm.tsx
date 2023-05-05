import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { Box, Button, CircleBtn } from '../common';
import { useEffect, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import ResponseForm from './ResponseForm';
import RequestForm from './RequestForm';
import { useStoreSelector } from '@/hooks/useStore';
import AnimationBox from '../common/AnimationBox';
import { IoMdArrowRoundBack } from 'react-icons/io';
interface ApiCreateForm {
  request: any;
  response: any;
}

const selectedStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-b-[3px] border-mincho-strong active:border-teal-600 text-mincho-strong active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-b-[3px] active:text-mincho-normal'
      : 'border-b-[3px] border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong active:bg-grayscale-light active:bg-opacity-70 active:border-taro-normal active:border-b-[3px] active:text-taro-normal'
  }` as const;

const ApiCreateForm = function () {
  const methods = useForm<ApiCreateForm>({
    defaultValues: {
      response: [],
    },
  });

  const { dark } = useStoreSelector((state) => state.dark);
  const [step, setStep] = useState<number>(1);

  const requestTabHandler = function () {
    setStep(() => 1);
  };
  const responseTabHandler = function () {
    setStep(() => 2);
  };

  const [requestData, setRequestData] = useState<any>();
  const [responseData, setResponseData] = useState<any>();
  const requestGetter = function (data: any) {
    setRequestData(() => data);
  };
  const responseGetter = function (data: any) {
    setResponseData(() => data);
  };
  const onSubmit = function (data: any) {
    requestGetter(data);
    responseGetter(data);
  };
  useEffect(
    function () {
      console.log(requestData);
    },
    [requestData]
  );
  useEffect(
    function () {
      console.log('이건 API 에서 찍힌 콘솔');
      console.log(responseData);
    },
    [responseData]
  );
  return (
    <>
      <div>
        <Button isEmpty className="flex flex-row gap-2 items-center">
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>
      <FormProvider {...methods}>
        <Box
          fontType="normal"
          className="flex justify-around flex-row items-center box-border pt-5"
        >
          <div
            className={`${
              step === 1 ? selectedStyle(dark) : ''
            } cursor-pointer `}
            onClick={requestTabHandler}
          >
            Request
          </div>
          <div
            className={`${
              step === 2 ? selectedStyle(dark) : ''
            } cursor-pointer `}
            onClick={responseTabHandler}
          >
            Response
          </div>
        </Box>

        <AnimationBox
          className={`${
            step === 1 ? '' : 'hidden'
          } flex w-full h-full items-center justify-center`}
        >
          <RequestForm requestGetter={requestGetter} />
        </AnimationBox>

        <AnimationBox
          className={`${
            step === 2 ? '' : 'hidden'
          } flex w-full h-full justify-center`}
        >
          <ResponseForm responseGetter={responseGetter} />
        </AnimationBox>
      </FormProvider>
    </>
  );
};

export default ApiCreateForm;
