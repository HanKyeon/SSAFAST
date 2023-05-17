import { ApiDetailAtTestItem } from '@/hooks/queries/queries';
import { useContext, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { UseTestForm } from './UseTestContainer';
import { UCContext, UCContextInterface } from '.';
import { Input } from '@/components/common';

type UCResInnerPropsType = {
  item: ApiDetailAtTestItem;
  //   control: Control<UseTestForm, any>;
  control: any;
  formName: string;
};

const UCResItemInner = function ({
  item,
  control,
  formName,
}: UCResInnerPropsType): JSX.Element {
  const { contextFormName, setContextFormName } =
    useContext<UCContextInterface>(UCContext);
  const [mapped, setMapped] = useState<boolean>(false);

  const onClickResItem = (): void => {
    console.log('안뿡');
    if (contextFormName) {
      console.log('뿡!');
      setMapped(true);
    }
  };
  return (
    <div onClick={onClickResItem} className={`flex gap-3`}>
      <div>{item.keyName}</div>
      <div>{item.type}</div>
      {mapped && (
        <Controller
          name={`${contextFormName}.value`}
          control={control}
          defaultValue={formName}
          render={({ field, fieldState }) => {
            return (
              <Input
                name={`${contextFormName}.value`}
                value={field.value}
                onChange={field.onChange}
                className={`w-full`}
                placeholder="value"
              />
            );
          }}
        />
      )}
      {/* )} */}
    </div>
  );
};

export default UCResItemInner;
