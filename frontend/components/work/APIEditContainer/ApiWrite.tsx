import { useForm, FormProvider, Controller } from 'react-hook-form';
import { FormEvent, useEffect, useState } from 'react';
import { useStoreSelector } from '@/hooks/useStore';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useBaseUrl, useSpaceCategory } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';
import { RequestFormData } from './RequestForm';
import { ResponseFormData } from './ResponseForm';
import { MockupData2Type } from '../APIDocsContainer';
import { Box, Button, Input, Select } from '@/components/common';
import AnimationBox from '@/components/common/AnimationBox';
import RequestForm from './RequestForm';
import ResponseForm from './ResponseForm';
import { useCreateApi } from '@/hooks/queries/mutations';

// Api interface
export interface ApiCreateForm {
  workspaceId: number;
  name: string;
  description: string;
  method?: 1 | 2 | 3 | 4 | 5;
  baseUrl: number;
  categoryId?: number;
  status: number;
  document: Document;
}
export interface Document {
  request: RequestFormData;
  response: ResponseFormData[];
}

export interface ServerData {
  name: string;
  description: string;
  method?: 1 | 2 | 3 | 4 | 5;
  baseUrl: number;
  categoryId?: number;
  status: number;
  document: {
    request: MockupData2Type;
    response: Body;
  };
}

// Form Tab 스타일
const selectedStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-b-[3px] border-mincho-strong active:border-teal-600 text-mincho-strong active:bg-theme-dark-normal active:bg-opacity-70 active:border-mincho-normal active:border-b-[3px] active:text-mincho-normal'
      : 'border-b-[3px] border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong active:bg-grayscale-light active:bg-opacity-70 active:border-taro-normal active:border-b-[3px] active:text-taro-normal'
  }` as const;

interface ApiCreateProps {
  toggleAddHandler: () => void;
}
// Form을 모을 최상위 함수
const ApiWrite = function ({ toggleAddHandler }: ApiCreateProps) {
  const { dark } = useStoreSelector((state) => state.dark);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: baseUrlData,
    isLoading: baseUrlLoading,
    isError: baseUrlError,
  } = useBaseUrl(parseInt(spaceId));

  const { data: categoryListData } = useSpaceCategory(parseInt(spaceId));
  const { data: baseUrlListData } = useBaseUrl(parseInt(spaceId));

  const methods = useForm<ApiCreateForm>({
    defaultValues: {
      workspaceId: parseInt(spaceId),
      name: '',
      description: '',
      method: undefined,
      baseUrl: 5,
      categoryId: undefined,
      status: undefined,
      document: {
        request: undefined,
        response: [
          {
            status_code: 200,
            desc: 'success',
            headers: [],
            body: undefined,
          },
        ],
      },
    },
  });
  const { mutate: createMutate, mutateAsync: createMutateAsync } = useCreateApi(
    parseInt(spaceId)
  );
  const { control, handleSubmit } = methods;

  const onSubmit = function (data: ApiCreateForm) {
    console.log('API 데이터', data);
    createMutateAsync(data).then(() => toggleAddHandler());
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
      <div className="h-[5%]">
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
        className="flex justify-around flex-row items-center box-border h-[5%]"
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
        <form onSubmit={handleSubmit(onSubmit)} className="h-[80%]">
          <div
            className={`${
              step === 1 ? '' : 'hidden'
            } flex flex-col w-full h-full overflow-y-scroll`}
          >
            <div className="flex flex-row items-center pt-10 h-[10%]">
              <Controller
                name={`categoryId`}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-full h-full items-center">
                    <Select
                      className={`w-[30%] text-start items-center`}
                      value={field.value}
                      onChange={(v) => {
                        field.onChange(v);
                        console.log(field.value);
                      }}
                    >
                      {categoryListData?.categorys?.map((item, index) => (
                        <>
                          <option value={item.id}>{item.name}</option>
                        </>
                      ))}
                    </Select>
                    {fieldState.invalid && (
                      <span className="text-red-500">
                        경로는 반드시 입력해야합니다.
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`status`}
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-full items-center h-full">
                    <Select
                      className={`w-[20%] text-center items-center`}
                      {...field}
                    >
                      <option value="1">명세중</option>
                      <option value="2">명세완료</option>
                      <option value="3">개발중</option>
                      <option value="4">개발완료</option>
                    </Select>
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col w-full items-center justify-center gap-4 py-10">
              <Controller
                control={control}
                name={`name`}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-[90%]">
                    <Input
                      type="text"
                      placeholder="Name"
                      name={`name`}
                      className={`w-full text-start`}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {fieldState.invalid && (
                      <span className="text-red-500">
                        API 이름은 반드시 입력해야합니다.
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`description`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-[90%]">
                    <Input
                      type="text"
                      placeholder="Description"
                      name={`description`}
                      className={`w-full text-start`}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {fieldState.invalid && (
                      <span className="text-red-500">
                        API 설명에 대해서 적어주세요.
                      </span>
                    )}
                  </div>
                )}
              />
              <div className="flex w-[90%] gap-4">
                <Controller
                  name={`method`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col w-[21%]">
                      <Select
                        className={`w-full text-center items-start`}
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
                        <span className="text-red-500">
                          Method를 지정해 주세요.
                        </span>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name={`baseUrl`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col w-[79%]">
                      <Select
                        name={'baseUrl'}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full text-start items-start`}
                      >
                        {baseUrlListData?.baseurls?.map((item, index) => (
                          <>
                            <option value={item.id}>{item.url}</option>
                          </>
                        ))}
                      </Select>
                    </div>
                  )}
                />
              </div>
            </div>
            <RequestForm />
          </div>

          <AnimationBox
            className={`${
              step === 2 ? '' : 'hidden'
            } flex w-full h-full justify-center`}
          >
            <ResponseForm />
          </AnimationBox>
          <div className="flex justify-end pt-10">
            <Button type="submit">저장</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ApiWrite;