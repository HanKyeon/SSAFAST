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

interface ApiCreateForm {
  request: any;
  response: any;
}

const ApiCreateForm = function () {
  const methods = useForm<ApiCreateForm>({
    defaultValues: {
      response: [],
    },
  });
  const [data1, setData1] = useState<any>();
  const [data2, setData2] = useState<any>();
  const data1Getter = function (data: any) {
    setData1(() => data);
  };
  const data2Getter = function (data: any) {
    setData2(() => data);
  };
  const onSubmit = function (data: any) {
    data1Getter(data);
  };
  useEffect(
    function () {
      console.log(data1);
    },
    [data1]
  );
  return (
    <>
      <div>
        <form id="requestForm" action=""></form>
      </div>
      <div>
        <ResponseForm data1getter={data1Getter} />
      </div>
    </>
  );
};

export default ApiCreateForm;
