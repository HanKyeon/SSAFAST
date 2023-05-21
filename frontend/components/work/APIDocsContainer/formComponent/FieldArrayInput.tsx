import { useStoreSelector } from '@/hooks/useStore';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';

import Input from '@/components/common/Input';
import { Controller } from 'react-hook-form';
import { HeadersType, FieldsType, BodyType } from '..';
import { useFormContext, useController, useFieldArray } from 'react-hook-form';
import { getWonsiType } from '@/utils/constraints';

interface Props {
  className?: string;
  depth?: 0 | 1 | 2;
  formName: string;
  field?: any;
}

const FieldArrayInput = function ({ className, depth = 0, formName }: Props) {
  const { control } = useFormContext();
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const { field } = useController({ name: `${formName}`, control });
  const {
    fields: valueFields,
    append,
    remove,
  } = useFieldArray({
    name: `${formName}.value`,
  });

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-[8px] bg-grayscale-dark flex items-center justify-center"
        onClick={() => append(``)}
      >
        +
      </div>
      {valueFields.map((valueField, valueFieldIdx) => {
        return (
          <Controller
            key={`${valueField.id}-${formName}`}
            name={`${formName}.value[${valueFieldIdx}]`}
            control={control}
            render={({ field: ifield, fieldState }) => (
              <div className="w-full flex flex-row">
                <Input
                  name={`${formName}.value`}
                  value={ifield.value || ``}
                  onChange={ifield.onChange}
                  className={`w-[85%]`}
                  placeholder="value"
                />
                <div
                  className="cursor-pointer w-[15%]"
                  onClick={() => remove(valueFieldIdx)}
                >
                  -
                </div>
              </div>
            )}
          />
        );
      })}
    </>
  );
};

export default FieldArrayInput;
