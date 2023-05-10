import { PropsWithChildren } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
}

const FieldArrayCompo = function ({ name }: PropsWithChildren<Props>) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `${name}`,
    control,
  });
  return (
    <div>
      {fields.map((item, idx) => {
        return (
          <Controller
            key={item.id}
            control={control}
            name={`${name}.${idx}`}
            render={({ field }) => {
              return <input name={`${name}.${idx}`} />;
            }}
          />
        );
      })}
    </div>
  );
};
