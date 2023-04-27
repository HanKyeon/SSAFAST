import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { PropsWithChildren, FC } from 'react';
import { Input } from '../common';

interface formProps {
  data: string;
}

const TestForm = function () {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      data: '기현아 안녕',
    },
  });

  const onSubmit: SubmitHandler<formProps> = (data) => console.log(data);
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register('data')} />
    //   <input type="submit" />
    // </form>
    <form onSubmit={handleSubmit(onSubmit)} className="text-black">
      <input {...register('data')} />
      <input type="submit" />
      <Input {...register('data')} />
      <Input type="submit" />
    </form>
  );
};

export default TestForm;
