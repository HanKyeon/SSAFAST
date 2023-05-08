import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
  UseFormReturn,
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
  methods: UseFormReturn<RequestFormData>;
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

export interface RequestFormData {
  request: Request;
}

const RequestForm = function ({ requestGetter, methods }: RequestProps) {
  const { control, handleSubmit, reset } = methods;
  // const {
  //   fields: requestFields,
  //   append,
  //   remove,
  // } = useFieldArray({
  //   name: 'request',
  //   control,
  // });

  const onSubmit = function (data: RequestFormData) {
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
          Category: 1
          <Select name="category" className={`w-48 text-center`}>
            <ul>
              <li value={1}>hi</li>
            </ul>
          </Select>
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
