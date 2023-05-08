import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Box, Button, CircleBtn, Select, Input } from '../common';
import { FormEvent, useEffect, useState } from 'react';
import { RequestForm, ResponseForm } from './index';
import { useStoreSelector } from '@/hooks/useStore';
import AnimationBox from '../common/AnimationBox';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ResponseFormData } from './ResponseForm';
import { RequestFormData } from './RequestForm';
import { useRouter } from 'next/router';
import { useBaseUrl } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';

// Api interface
export interface ApiCreateForm {
  name: string;
  description: string;
  method: 1 | 2 | 3 | 4 | 5;
  baseUrl: number;
  categoryId: number;
  status: number;
  document: Document;
}
export interface Document {
  request: RequestFormData;
  response: ResponseFormData[];
}

// Form Tab 스타일
const selectedStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-b-[3px] border-mincho-strong active:border-teal-600 text-mincho-strong active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-b-[3px] active:text-mincho-normal'
      : 'border-b-[3px] border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong active:bg-grayscale-light active:bg-opacity-70 active:border-taro-normal active:border-b-[3px] active:text-taro-normal'
  }` as const;

interface ApiCreateProps {
  toggleAddHandler: (e: FormEvent) => void;
}
// Form을 모을 최상위 함수
const ApiCreateForm = function ({ toggleAddHandler }: ApiCreateProps) {
  const { dark } = useStoreSelector((state) => state.dark);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: baseUrlData,
    isLoading: baseUrlLoading,
    isError: baseUrlError,
  } = useBaseUrl(parseInt(spaceId));

  const methods = useForm<ApiCreateForm>({
    defaultValues: {
      name: '',
      description: '',
      method: undefined,
      baseUrl: 1,
      categoryId: undefined,
      status: undefined,
      document: {
        request: undefined,
        response: undefined,
      },
    },
  });

  const { control, handleSubmit } = methods;
  const onSubmit = function (data: ApiCreateForm) {
    console.log('hi', data);
  };

  // Request Tab 이동
  const requestTabHandler = function () {
    setStep(() => 1);
  };
  // Response Tab 이동
  const responseTabHandler = function () {
    setStep(() => 2);
  };

  return (
    <div className="flex flex-col gap-3 p-[3%] w-full h-full overflow-y-scroll">
      <div>
        <Button
          onClick={toggleAddHandler}
          isEmpty
          className="flex flex-row gap-2 items-center"
        >
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>

      <Box
        fontType="normal"
        className="flex justify-around flex-row items-center box-border"
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
      {/* <button onClick={onSubmit}>최종 제출</button> */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimationBox
            className={`${
              step === 1 ? '' : 'hidden'
            } flex flex-col w-full h-full justify-center`}
          >
            <div className="flex flex-row justify-around">
              <Controller
                name={`categoryId`}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    {/* <Select
                      className={`w-40 text-start items-start`}
                      {...field}
                    >
                      <option value="0">경로를 설정해주세요.</option>
                      <option value="1">/user</option>
                    </Select>
                    {fieldState.invalid && (
                      <span className="text-red-500">
                        경로는 반드시 입력해야합니다.
                      </span>
                    )} */}
                  </div>
                )}
              />
              <Controller
                name={`status`}
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    {/* <Select
                      className={`w-40 text-center items-start`}
                      {...field}
                    >
                      <option value="1">명세중</option>
                      <option value="2">명세완료</option>
                      <option value="3">개발중</option>
                      <option value="4">개발완료</option>
                    </Select> */}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 ">
              <Controller
                control={control}
                name={`name`}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Input
                      type="text"
                      placeholder="Name"
                      name={`name`}
                      className={`w-96 text-start`}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {fieldState.invalid && (
                      <span>API 이름은 반드시 입력해야합니다.</span>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`description`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Input
                      type="text"
                      placeholder="Description"
                      name={`description`}
                      className={`w-[512px] text-start`}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {fieldState.invalid && (
                      <span className="">API 설명에 대해서 적어주세요.</span>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`method`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Select
                      className={`w-24 text-start items-start`}
                      name={'method'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <option value="">Method</option>
                      <option value={1}>GET</option>
                      <option value={2}>POST</option>
                      <option value={3}>PUT</option>
                      <option value={4}>DELETE</option>
                      <option value={5}>PATCH</option>
                    </Select>
                    {fieldState.invalid && (
                      <span className="">Method를 지정해 주세요.</span>
                    )}
                  </div>
                )}
              />

              <Controller
                name={`baseUrl`}
                control={control}
                // rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Select
                      name={'baseUrl'}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-[512px] text-start items-start`}
                    >
                      <option value="1">Base URL</option>
                      <option value="2">또다른 Sub URL</option>
                    </Select>
                  </div>
                )}
              />
            </div>
            <RequestForm />
          </AnimationBox>

          <AnimationBox
            className={`${
              step === 2 ? '' : 'hidden'
            } flex w-full h-full justify-center`}
          >
            <ResponseForm />;
          </AnimationBox>
          <Button type="submit">저장</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ApiCreateForm;
