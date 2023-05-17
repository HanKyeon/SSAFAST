import { FormProvider, Controller, UseFormReturn } from 'react-hook-form';
import { Input, Select } from '../common';
import { useStoreSelector } from '@/hooks/useStore';

interface BaseProps {
  baseGetter?: (data: any) => void;
  methods: UseFormReturn<BaseFormData>;
}

const selectedStyle = (dark: boolean) =>
  `${dark ? 'text-mincho-strong' : 'text-taro-strong'}` as const;

export interface BaseFormData {
  name?: string;
  description?: string;
  method?: 1 | 2 | 3 | 4 | 5;
  baseUrl?: number;
  categoryId?: number;
  status?: 1 | 2 | 3 | 4;
}

const BaseForm = function ({ baseGetter, methods }: BaseProps) {
  const { control, handleSubmit } = methods;
  const { dark } = useStoreSelector((state) => state.dark);
  const onSubmit = function (data: BaseFormData) {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onBlur={handleSubmit(onSubmit)} className="">
        <div className="flex flex-row justify-around">
          <Controller
            name={`categoryId`}
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <Select className={`w-40 text-start items-start`} {...field}>
                  <option value="0">경로를 설정해주세요.</option>
                  <option value="1">/user</option>
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
              <div className="flex flex-col">
                <Select className={`w-40 text-center items-start`} {...field}>
                  <option value="1">명세중</option>
                  <option value="2">명세완료</option>
                  <option value="3">개발중</option>
                  <option value="4">개발완료</option>
                </Select>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 ">
          <Controller
            name={`name`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Name"
                  className={`w-96 text-start`}
                  {...field}
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
                  className={`w-[512px] text-start`}
                  {...field}
                />
                {fieldState.invalid && (
                  <span className="">API 설명에 대해서 적어주세요.</span>
                )}
              </div>
            )}
          />
          <Controller
            name={`baseUrl`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <Select
                  className={`w-[512px] text-start items-start`}
                  {...field}
                >
                  <option value="1">Base URL</option>
                  <option value="2">또다른 Sub URL</option>
                </Select>
              </div>
            )}
          />
          <Controller
            name={`method`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex">
                <Select className={`w-24 text-start items-start`} {...field}>
                  <option value="">Method</option>
                  <option value="1">GET</option>
                  <option value="2">POST</option>
                  <option value="3">PUT</option>
                  <option value="4">DELETE</option>
                  <option value="5">PATCH</option>
                </Select>
              </div>
            )}
          />
          {/* <Controller
            name={`description`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Description"
                  className={`w-[512px] text-start`}
                  {...field}
                />
                {fieldState.invalid && (
                  <span className="">API 설명에 대해서 적어주세요.</span>
                )}
              </div>
            )}
          /> */}
        </div>
      </form>
    </FormProvider>
  );
};

export default BaseForm;
