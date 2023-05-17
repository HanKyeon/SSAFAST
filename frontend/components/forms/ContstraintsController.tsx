import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Select, CircleBtn } from '../common';
import { useEffect } from 'react';

interface Props {
  item: Record<'id', string>;
  name: string;
  index: number;
}

const ConstraintsController = function ({ name, item }: Props) {
  const { control, getValues, getFieldState } = useFormContext();
  const {
    fields: constraintsFields,
    append: constraintsAppend,
    remove: constraintsRemove,
  } = useFieldArray({
    control,
    name: `${name}`,
  });
  const appendConstraint = function () {
    constraintsAppend(``);
  };
  useEffect(
    function () {
      if (!constraintsFields.length) {
        appendConstraint();
        return;
      } else if (
        getFieldState(`${name}.${constraintsFields.length - 1}`).isTouched
      ) {
        appendConstraint();
        return;
      }
      console.log(
        getFieldState(`${name}.${constraintsFields.length - 1}`).isTouched
      );
    },
    [
      constraintsFields.length,
      getFieldState(`${name}.${constraintsFields.length - 1}`).isTouched,
    ]
  );
  return (
    <>
      {constraintsFields.map((item, idx) => {
        return (
          <>
            {
              <Controller
                key={item.id}
                name={`${name}.${idx}`}
                render={({ field }) => {
                  return (
                    <div className="flex flex-row gap-2">
                      <Select
                        key={`${item.id}-constraint`}
                        name={`${name}.${idx}`}
                        onChange={field.onChange}
                      >
                        <option value={``}>선택하세욤 뿌우</option>
                        <option value={`NotNull`}>NotNull</option>
                        <option value={`NotOption`}>NotOption</option>
                        <option value={`SomeOption`}>SomeOption</option>
                        <option value={`AnyOption`}>AnyOption</option>
                      </Select>
                      <CircleBtn
                        btnType="delete"
                        onClick={() => constraintsRemove(idx)}
                      ></CircleBtn>
                    </div>
                  );
                }}
              />
            }
          </>
        );
      })}
    </>
  );
};

export default ConstraintsController;
