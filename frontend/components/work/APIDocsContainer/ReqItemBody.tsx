import { useState } from 'react';
import { BodyType, FieldsType, NestedDtosType } from '.';
import ToggleableHeader from './ToggleableHeader';
import ReqItemInner from './ReqItemInner';
import { useObjToArr } from '@/hooks/useObjToArr';
import styles from './ReqItemBody.module.css';
import { Controller, FieldArrayWithId, useFieldArray } from 'react-hook-form';

export type DtoInfoType = {
  id: string | number;
  workspace_id?: string | number;
  name: string;
  description: string;
  has_parent?: string | number;
  has_child?: string | number;
};

export type RefinedDtosType = {
  dtoID: string | number;
  dtoInfo: DtoInfoType;
  nestedDtos: {
    fields: FieldsType[];
    nestedDtos?: RefinedDtosType[];
  };
};

export type ReqItemBodyPropsType = {
  // fields: FieldArrayWithId[];
  formName: string;
  control?: any;
  name: string;
  item: BodyType;
};

const ReqItemBody = function ({
  // fields,
  formName,
  control,
  name, // 그냥 이름
  item, // item
}: ReqItemBodyPropsType): JSX.Element {
  const refinedDtos = useObjToArr(item);
  const [isOpen, setisOpen] = useState<boolean>(true);

  const a = refinedDtos?.length + 1;

  const Styles = {
    style: `${
      isOpen ? `${styles['act']} ${styles[`slide`]}` : `${styles[`slide`]}`
    }`,
  };

  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
    wrapper: `overflow-hidden mt-0 mx-auto text-content`,
  };

  const {
    fields: bodyFields,
    append: bodyAppend,
    remove: bodyRemove,
  } = useFieldArray({ control, name: `request.body` });

  return (
    <div className={`${styles1[`style`]} w-full`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {/* {isOpen && ( */}
      <div
        className={`${styles1['wrapper']} ${Styles['style']} rounded-[13px] w-[87%]`}
      >
        {item.fields?.map((item: FieldsType, idx: number) => (
          <Controller
            key={`${Math.random()}`}
            name={`${formName}.fields.${idx}`}
            control={control}
            render={({ field }) => (
              <ReqItemInner
                formName={`${formName}.fields.${idx}`}
                field={field}
                key={item.keyName}
                item={item}
                control={control}
                depth={0}
                className={`mb-3 rounded-[13px]`}
              />
            )}
          />
        ))}
        {/* 첫번째 DTO */}
        {Object.keys(item.nestedDtos as NestedDtosType)?.map(
          (dtoId: string | number, idx: number) => {
            if (item.nestedDtos) {
              const dtoItem = item.nestedDtos[`${dtoId as number}`] as BodyType;
              return (
                <>
                  <Controller
                    key={`${Math.random()}`}
                    name={`${formName}.nestedDtos.${dtoId}`}
                    control={control}
                    render={({ field }) => (
                      <ReqItemInner
                        formName={`${formName}.nestedDtos.${dtoId}`}
                        field={field}
                        key={`${Math.random()}`}
                        item={dtoItem}
                        control={control}
                        depth={0}
                        className={`rounded-[13px]`}
                      />
                    )}
                  />
                  <div
                    className={`${styles1['wrapper']} rounded-b-[13px] mb-3 w-[95%]`}
                  >
                    {/* DTO의 fields */}
                    {(dtoItem.fields as FieldsType[])?.map(
                      (item: FieldsType, idx: number) => (
                        <Controller
                          key={`${Math.random()}`}
                          name={`${formName}.nestedDtos.${dtoId}.fields.${idx}`}
                          control={control}
                          render={({ field }) => (
                            <ReqItemInner
                              formName={`${formName}.nestedDtos.${dtoId}.fields.${idx}`}
                              field={field}
                              key={`${Math.random()}`}
                              item={item}
                              control={control}
                              depth={1}
                              className={`last:rounded-b-[13px]`}
                            />
                          )}
                        />
                      )
                    )}
                    {/* DTO의 nestedDtos */}
                    {Object.keys(dtoItem.nestedDtos as NestedDtosType).map(
                      (nDtoId: string | number, idx: number) => {
                        if (dtoItem.nestedDtos) {
                          const nDtoItem = dtoItem.nestedDtos[
                            `${nDtoId as number}`
                          ] as BodyType;
                          return (
                            <>
                              <Controller
                                key={`${Math.random()}`}
                                name={`${formName}.nestedDtos.${dtoId}.nestedDtos.${nDtoId}`}
                                control={control}
                                render={({ field }) => (
                                  <ReqItemInner
                                    formName={`${formName}.nestedDtos.${dtoId}.nestedDtos.${nDtoId}`}
                                    field={field}
                                    key={`${Math.random()}`}
                                    item={nDtoItem}
                                    control={control}
                                    depth={1}
                                    className={`rounded-[13px]`}
                                  />
                                )}
                              />
                              <div className={`${styles1['wrapper']} w-[95%]`}>
                                {nDtoItem.fields?.map(
                                  (item: FieldsType, idx: number) => (
                                    <Controller
                                      key={`${Math.random()}`}
                                      name={`${formName}.nestedDtos.${dtoId}.nestedDtos.${nDtoId}.fields.${idx}`}
                                      control={control}
                                      render={({ field }) => (
                                        <ReqItemInner
                                          formName={`${formName}.nestedDtos.${dtoId}.nestedDtos.${nDtoId}.fields.${idx}`}
                                          field={field}
                                          key={`${Math.random()}`}
                                          item={item}
                                          control={control}
                                          depth={2}
                                          className={`last:rounded-b-[13px]`}
                                        />
                                      )}
                                    />
                                  )
                                )}
                              </div>
                            </>
                          );
                        }
                      }
                    )}
                  </div>
                </>
              );
            }
          }
        )}
        {/* 첫번째 DTOlist */}
      </div>
      {/* )} */}
    </div>
  );
};

export default ReqItemBody;
