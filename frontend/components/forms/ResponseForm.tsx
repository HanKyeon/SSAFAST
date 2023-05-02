import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from 'react-hook-form';
import { PropsWithChildren, FC, useState, useEffect, FormEvent } from 'react';
import { useStoreSelector } from '@/hooks/useStore';
import { inputTheme } from '@/utils/styleClasses';
import { Form, Input, Select } from './components';
import { Button, Box } from '../common';
import DtoForm from './DtoForm';

interface FormValues {
  response: {
    code: number;
    descriptions: string;
    headers: {
      key: object;
      type: string;
      description: string;
    }[];
    bodys: {
      key: string;
      type: string;
      description: string;
    }[];
  }[];
}

const EditHeaders = ({ update, index, value, control, register }: any) => {
  console.log('리렌더링?');
  return (
    <div>
      <input
        onChange={() => update(index, value)}
        placeholder="key"
        {...register(`key`, { required: true })}
      />
      <input
        onChange={() => update(index, value)}
        placeholder="type"
        {...register(`type`, { required: true })}
      />
      <input
        onChange={() => update(index, value)}
        placeholder="descriptions"
        {...register(`descriptions`, { required: true })}
      />
    </div>
  );
};

const ResponseForm = function () {
  const {
    control: headerControl,
    handleSubmit: headerHandleSubmit,
    register: headerRegister,
  } = useForm();
  const {
    fields: headersFields,
    append: appendHeaders,
    update: updateHeaders,
    remove: removeHeaders,
  } = useFieldArray({
    control: headerControl,
    name: 'headers',
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      {/* <form onSubmit={formHandleSubmit(onSubmit)}>
      <label>Headers:</label>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          appendHeaders({ key: '', type: '', description: '' });
        }}
      >
        추가
      </Button>
      {headersFields?.map((field, index) => (
        <fieldset key={field.id}>
          <EditHeaders
            register={headerRegister}
            update={updateHeaders}
            control={headerControl}
            value={field}
            index={index}
          />
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              removeHeaders(index);
              console.log(index);
            }}
          >
            삭제
          </Button>
        </fieldset>
      ))}

      <input type="submit" />
    </form> */}
    </>
  );
};

export default ResponseForm;
