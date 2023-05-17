import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { BodyType, FieldsType, HeadersType } from '..';
import ToggleableHeader from '../ToggleableHeader';
import ReqItemInnerPostman from './FieldInput';
import {
  Controller,
  FieldArrayWithId,
  useFormContext,
  useFieldArray,
  useController,
} from 'react-hook-form';
import styles from './FieldListInput.module.css';
import FieldInput from './FieldInput';

type ReqtemPropsType = {
  typeName?: string;
  formName: string;
  depth?: 0 | 1 | 2;
};
const FieldListInput = function ({
  typeName,
  formName,
  depth = 0,
  children,
}: PropsWithChildren<ReqtemPropsType>): JSX.Element {
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    name: `${formName}`,
    control,
  });
  const a = fields.length + 1;
  const [isOpen, setisOpen] = useState<boolean>(true);
  const { field } = useController({ name: `${formName}` });
  const Styles = {
    style: `${
      isOpen ? `${styles['act']} ${styles[`slide`]}` : `${styles[`slide`]}`
    }`,
  };
  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
  };

  return (
    <div className={`${styles1[`style`]} w-full`}>
      <ToggleableHeader
        title={`${typeName}`}
        isOpen={isOpen}
        setIsOpen={setisOpen}
      />
      <div className={`${Styles['style']} flex flex-col items-center`}>
        {fields.map((item, idx) => {
          return (
            <Controller
              key={`${item.id}-${typeName}-postman`}
              name={`${formName}[${idx}]`}
              control={control}
              render={({ field }) => {
                return (
                  <div
                    key={item.id}
                    className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content duration-[0.33s]`}
                  >
                    <FieldInput
                      depth={depth}
                      formName={`${formName}[${idx}]`}
                    />
                  </div>
                );
              }}
            />
          );
        })}
        <div className="w-[88%] flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FieldListInput;
