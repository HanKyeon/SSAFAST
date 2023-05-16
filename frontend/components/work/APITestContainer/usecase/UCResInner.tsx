import { Input } from '@/components/forms/components';
import { ApiDetailAtTestItem } from '@/hooks/queries/queries';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { UseTestForm } from './UseTestContainer';

type UCResInnerPropsType = {
  item: ApiDetailAtTestItem;
  //   control: Control<UseTestForm, any>;
  control: any;
  formName: string | null;
};

const UCResInner = function ({
  item,
  control,
  formName,
}: UCResInnerPropsType): JSX.Element {
  const [mappedFormName, setMappedFormName] = useState<string | null>(null);
  const onClickResItem = (): void => {
    console.log('안뿡');
    if (formName) {
      console.log('뿡!');
      setMappedFormName(formName);
    }
  };
  return (
    <div onClick={onClickResItem} className={`flex gap-3`}>
      <div>{item.keyName}</div>
      <div>{item.type}</div>
      {mappedFormName && (
        <Controller
          name={`${mappedFormName}.value`}
          control={control}
          render={({ field, fieldState }) => (
            <Input
              name={`${mappedFormName}.value`}
              value={field.value}
              onCHange={field.onChange}
            />
          )}
        />
      )}
    </div>
  );
};

export default UCResInner;
