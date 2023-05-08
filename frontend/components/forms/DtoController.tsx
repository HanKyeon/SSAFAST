import { DtoFieldInCompo, DtoInterfaceInForm } from './DtoForm';
import {
  Controller,
  FieldArrayWithId,
  useController,
  useFormContext,
  useFieldArray,
  useForm,
} from 'react-hook-form';

interface Props {
  item: FieldArrayWithId<DtoInterfaceInForm, 'fields', 'id'>;
  idx: number;
}

const DtoController = function ({ item, idx }: Props) {
  const { control } = useFormContext();
  // const { field: constraintField } = useController({
  //   control,
  //   name: `fields.${idx}.constraints`,
  // });
  const {
    fields: constraintsFields,
    append: constraintsAppend,
    remove: constraintsRemove,
  } = useFieldArray({
    control,
    name: `fields.${idx}.constraints`,
  });
  const appendConstraint = function () {
    constraintsAppend(``);
  };
  return (
    <div key={`${item.id}-container`} className="flex flex-col w-[50%] gap-2">
      <Controller
        key={`field-type-${item.id}`}
        name={`fields.${idx}.type`}
        control={control}
        render={({ field }) => (
          <div className="flex flex-row gap-2">
            <label>타입</label>
            <select
              name={`fields.${idx}.type`}
              onChange={field.onChange}
              value={field.value}
            >
              <option value={0}>타입을 선택하세요</option>
              <option value={1}>string</option>
              <option value={2}>float</option>
              <option value={3}>integer</option>
              <option value={11}>someDto</option>
            </select>
          </div>
        )}
      />
      <Controller
        key={`field-typeName-${idx}`}
        name={`fields.${idx}.typeName`}
        control={control}
        render={({ field }) => (
          <div className="flex flex-row gap-2">
            <label>이름</label>
            <input
              name={`fields.${idx}.typeName`}
              onChange={field.onChange}
              value={field.value}
            />
          </div>
        )}
      />
      <Controller
        key={`field-desc-${idx}`}
        name={`fields.${idx}.desc`}
        control={control}
        render={({ field }) => (
          <div className="flex flex-row gap-2">
            <label>설명</label>
            <input
              name={`fields.${idx}.desc`}
              onChange={field.onChange}
              value={field.value}
            />
          </div>
        )}
      />
      <Controller
        key={`field-itera-${idx}`}
        name={`fields.${idx}.itera`}
        control={control}
        render={({ field }) => (
          <div className="flex flex-row gap-2">
            <label>배열 여부</label>
            <input
              type="checkbox"
              name={`fields.${idx}.itera`}
              onChange={field.onChange}
              value={field.value} // 빨간줄이어도 돌아감. input이 text를 다루는데 checkbox 여부까지 TS가 쳐다보진 않는듯.
            />
          </div>
        )}
      />
      <Controller
        key={`field-constraints-${idx}`}
        name={`fields.${idx}.constraints`}
        control={control}
        render={({ field }) => {
          return (
            <div className="flex flex-col gap-1">
              <label>제약조건</label>
              {constraintsFields.map((item, iidx) => {
                return (
                  <Controller
                    key={`${item.id}-constraint`}
                    name={`fields.${idx}.constraints.${iidx}`}
                    render={({ field }) => {
                      return (
                        <div className="flex flex-row gap-2">
                          <select
                            key={`${item.id}-constraint`}
                            name={`fields.${idx}.constraints.${iidx}`}
                            onChange={field.onChange}
                          >
                            <option value={``}>선택하세욤 뿌우</option>
                            <option value={`NotNull`}>NotNull</option>
                            <option value={`NotOption`}>NotOption</option>
                            <option value={`SomeOption`}>SomeOption</option>
                            <option value={`AnyOption`}>AnyOption</option>
                          </select>
                          <div onClick={() => constraintsRemove(iidx)}>
                            제거
                          </div>
                        </div>
                      );
                    }}
                  />
                );
              })}
            </div>
          );
        }}
      />
      <div onClick={appendConstraint}>제약조건 추가</div>
      <div>----------------------</div>
    </div>
  );
};

export default DtoController;
