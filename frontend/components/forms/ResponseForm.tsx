import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from 'react-hook-form';
import { PropsWithChildren, FC, useState, useEffect } from 'react';
import { useStoreSelector } from '@/hooks/useStore';
import { inputTheme } from '@/utils/styleClasses';
import { Form, Input, Select } from './components';
import { Button } from '../common';
import DtoForm from './DtoForm';
interface FormValues {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
  data2: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

interface formProps {
  category: string;
  ApiName: string;
  ApiDescription: string;
  baeURL: any;
  method: any;
  urn: any;
  headers: any;
  body: any | {};
  path: any | null;
  params: any | null;
}

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: ['cart'],
    control,
  });
};

const onSubmit: SubmitHandler<formProps> = function (data) {
  // updateFuntion(data);
  console.log(data);
};

const ResponseForm = function () {
  const { register, handleSubmit } = useForm();
  const { dark } = useStoreSelector((state) => state.dark);
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    <DtoForm />;
  }, [selectedValue]);
  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-3 "
      defaultValues={'s'}
      handleSubmit={handleSubmit}
      register={register}
    >
      <Select
        selectType={2}
        onChange={handleSelectChange}
        name="status"
        className={`${
          dark ? inputTheme['dark-underline'] : inputTheme['light-underline']
        } w-48 text-center`}
      >
        <option value={''}>SELECT</option>
        <option value={'DTO'}>DTO</option>
        <option value={'하이'}>하이</option>
        <option value={'안녕'}>안녕</option>
      </Select>
      <div>
        {selectedValue === 'DTO' ? (
          <>
            <label>
              DTO 폼 입니당.
              <DtoForm />
            </label>
          </>
        ) : null}
      </div>
      <Button>저장</Button>
    </Form>
  );
};

export default ResponseForm;
