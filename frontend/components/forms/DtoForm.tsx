import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { Form, Input, Select } from './components';
import { Button } from '../common';
import {
  UseFormRegister,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from 'react-hook-form/dist/types';

interface FormValues {
  headerType: {
    key: string;
    type: string;
    description: string;
  }[];
}

interface DtoProps {
  register: UseFormRegister<FormValues>;
  fields?: FieldArrayWithId<FormValues, 'headerType', 'id'>[];
  remove: UseFieldArrayRemove;
}

const DtoForm = function ({ register, fields, remove }: DtoProps) {
  // const {
  //   register,
  //   control,
  //   formState: { errors },
  // } = useForm<FormValues>({
  //   defaultValues: {
  //     headerType: [{ key: 'Content-Type', type: 'string', description: '' }],
  //   },
  //   mode: 'onBlur',
  // });
  // const { fields, append, remove } = useFieldArray({
  //   name: 'headerType',
  //   control,
  // });

  return (
    <div>
      {fields?.map((field, index) => {
        return (
          <div key={field.id}>
            <input
              placeholder="Key"
              {...register(`headerType.${index}.key` as const, {
                required: true,
              })}
              defaultValue={field.key}
            ></input>
            <Button
              onClick={(e) => {
                e.preventDefault();
                remove(index);
              }}
            >
              삭제
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default DtoForm;
