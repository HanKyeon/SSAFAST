import { useState } from 'react';
import { BodyType, FieldsType, HeadersType } from '.';
import ToggleableHeader from './ToggleableHeader';
import ReqItemInner from './ReqItemInner';
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form';

type ReqtemPropsType = {
  fields: FieldArrayWithId[];
  formName: string;
  control?: any;
  name: string;
  item?: HeadersType[] | BodyType | FieldsType[];
};
const ReqItem = function ({
  fields,
  formName,
  name, // 그냥 이름
  item, // item
  control,
}: ReqtemPropsType): JSX.Element {
  const [isOpen, setisOpen] = useState<boolean>(true);
  return (
    <div className={`w-full duratoin-[0.33s]`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {/* {fields.map((iitem, idx) => {
        return <Controller 
          key={iitem.id}
          name={`${formName}.${idx}`}
          control={control}
          render={({field}) => {
            return <div
            key={item.key}
            className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content ${
              isOpen ? '' : 'hidden'
            }`}
          >
            <ReqItemInner item={item} control={control} name={name} />
          </div>
          }}
        />
      })} */}
      {(item as HeadersType[] | FieldsType[])?.map((item, idx) => (
        <Controller
          key={`${Math.random()}`} // fields[idx].id
          name={`${formName}.${idx}`}
          control={control}
          render={({ field }) => {
            return (
              <div
                key={item.key}
                className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content ${
                  isOpen ? '' : 'hidden'
                }`}
              >
                <ReqItemInner
                  formName={`${formName}.${idx}`}
                  field={field}
                  item={item}
                  control={control}
                  name={name}
                />
              </div>
            );
          }}
        />
      ))}
    </div>
  );
};

export default ReqItem;
