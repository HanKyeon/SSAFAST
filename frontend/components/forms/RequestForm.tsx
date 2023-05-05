import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { Box, Button, CircleBtn, Input, Select } from '../common';
import { useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { inputTheme } from '@/utils/styleClasses';

interface RequestProps {
  requestGetter?: (data: any) => void;
}

interface Headers {
  key: string;
  type: string;
  desc: string;
  value: string | null;
}

interface Fields {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  constraints: string[];
  value: string | null;
}

const dtotype = undefined;

interface DTO {
  [id: number]: {
    fields: Fields[];
  };
  nestedDto: DTO;
}
interface Body {
  fields: Fields[];
  dtos: DTO;
}

interface Request {
  headers: Headers[];
  body: Body;
}

interface RequestFormData {
  request: Request;
}

const RequestForm = function ({ requestGetter }: RequestProps) {
  const methods = useForm<RequestFormData>({
    defaultValues: undefined,
  });
  const { control, handleSubmit, reset } = methods;
  // const {
  //   fields: requestFields,
  //   append,
  //   remove,
  // } = useFieldArray({
  //   name: 'request',
  //   control,
  // });

  const onSubmit = function (data: any) {
    if (requestGetter) {
      requestGetter(data);
    }
    // updateFuntion(data);
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-3 "
      >
        <label>
          Category:
          <Select name="category" className={`w-48 text-center`}></Select>
        </label>
        <label>
          Category:
          <Select name="category" className={`w-48 text-center`}></Select>
        </label>

        <Button>저장</Button>
      </form>
    </FormProvider>
  );
};

export default RequestForm;
