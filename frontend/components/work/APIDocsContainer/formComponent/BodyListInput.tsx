import { useState } from 'react';
import { BodyType, FieldsType, NestedDtosType } from '..';
import ToggleableHeader from '../ToggleableHeader';
import ReqItemInnerPostman from './FieldInput';
import { useObjToArr } from '@/hooks/useObjToArr';
import styles from './BodyListInput.module.css';
import {
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
  useController,
} from 'react-hook-form';
import FieldInput from './FieldInput';
import FieldListInput from './FieldListInput';
import { useApiSingleTestDetail } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

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
  formName: string;
  typeName: string;
  selectedId: number;
};

const BodyListInput = function ({
  formName,
  typeName, // 그냥 이름
  selectedId,
}: ReqItemBodyPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [isOpen, setisOpen] = useState<boolean>(true);
  const { control } = useFormContext();
  const { fields: bodyFields } = useFieldArray({ name: `${formName}.fields` });
  const a = 1;
  const { data: spaceSingleTestDetail } = useApiSingleTestDetail(
    spaceId,
    selectedId
  );
  const { field: nestedDtos } = useController({
    name: `${formName}.nestedDtos`,
  });
  const { field: nestedDtoLists } = useController({
    name: `${formName}.nestedDtoLists`,
  });
  console.log(nestedDtos.value);

  const Styles = {
    style: `${
      isOpen ? `${styles['act']} ${styles[`slide`]}` : `${styles[`slide`]}`
    }`,
  };

  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
    wrapper: `overflow-hidden mt-0 mx-auto text-content`,
  };

  return (
    <div className={`${styles1[`style`]} w-full`}>
      <ToggleableHeader title={`body`} isOpen={isOpen} setIsOpen={setisOpen} />
      <div
        className={`${styles1['wrapper']} ${Styles['style']} rounded-[13px] w-[87%] flex flex-col`}
      >
        {bodyFields.map((bodyFieldItem, bodyFieldIdx) => {
          return (
            <Controller
              key={`${bodyFieldItem.id}-${typeName}-postman`}
              name={`${formName}.fields[${bodyFieldIdx}]`}
              control={control}
              render={({ field }) => {
                return (
                  <div
                    key={bodyFieldItem.id}
                    className={`w-full rounded-[13px] overflow-hidden mt-0 mx-auto text-content duration-[0.33s] ${
                      bodyFields.length !== bodyFieldIdx + 1 ? 'mb-3' : ''
                    }`}
                  >
                    <FieldInput
                      formName={`${formName}.fields[${bodyFieldIdx}]`}
                    />
                  </div>
                );
              }}
            />
          );
        })}
        {/* 첫번째 DTO */}
        {...Object.keys(nestedDtos.value).map((dtoId) => {
          return nestedDtos.value[dtoId].map((dto: any, dtoidx: any) => {
            return (
              <div className="w-full flex flex-row">
                <FieldListInput
                  depth={1}
                  typeName={nestedDtos.value[dtoId][dtoidx].name}
                  key={`${dtoId}-dto-${dtoidx}-${dto.keyName}`}
                  formName={`${formName}.nestedDtos.${dtoId}[${dtoidx}].fields`}
                >
                  {nestedDtos.value[dtoId][dtoidx].nestedDtos &&
                    Object.keys(nestedDtos.value[dtoId][dtoidx].nestedDtos).map(
                      (nestedDtoId, nestedDtoIdx) => {
                        return (
                          <FieldListInput
                            depth={2}
                            typeName={`${nestedDtos.value[dtoId][dtoidx].nestedDtos[nestedDtoId][nestedDtoIdx].name}`}
                            key={`${dtoId}-dto-${dtoidx}-${dto.keyName}`}
                            formName={`${formName}.nestedDtos.${dtoId}[${dtoidx}].nestedDtos[${nestedDtoId}][${nestedDtoIdx}].fields`}
                          />
                        );
                      }
                    )}
                  {nestedDtos.value[dtoId][dtoidx].nestedDtoLists &&
                    Object.keys(
                      nestedDtos.value[dtoId][dtoidx].nestedDtoLists
                    ).map((nestedDtoId, nestedDtoIdx) => {
                      return (
                        <FieldListInput
                          depth={2}
                          typeName={`${nestedDtos.value[dtoId][dtoidx].nestedDtoLists[nestedDtoId][nestedDtoIdx].name}`}
                          key={`${dtoId}-dto-${dtoidx}-${dto.keyName}`}
                          formName={`${formName}.nestedDtos.${dtoId}[${dtoidx}].nestedDtoLists[${nestedDtoId}][${nestedDtoIdx}].fields`}
                        />
                      );
                    })}
                  {nestedDtos.value[dtoId][dtoidx].itera ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        console.log('디티오 만들기');
                      }}
                    >{`${nestedDtos.value[dtoId][dtoidx].keyName} 추가 입력`}</div>
                  ) : null}
                </FieldListInput>
              </div>
            );
          });
        })}
        {/* nestedDtoLists */}
        {...Object.keys(nestedDtoLists.value).map((dtoId) => {
          return nestedDtoLists.value[dtoId].map((dto: any, dtoidx: any) => {
            return (
              <>
                <FieldListInput
                  depth={1}
                  typeName={nestedDtoLists.value[dtoId][dtoidx].name}
                  key={`${dtoId}-dto-${dtoidx}-${dto.keyName}`}
                  formName={`${formName}.nestedDtoLists.${dtoId}[${dtoidx}].fields`}
                >
                  {nestedDtoLists.value[dtoId][dtoidx].nestedDtos &&
                    Object.keys(
                      nestedDtoLists.value[dtoId][dtoidx].nestedDtos
                    ).map((nestedDtoId, nestedDtoIdx) => {
                      return (
                        <FieldListInput
                          depth={2}
                          typeName={`${nestedDtoLists.value[dtoId][dtoidx].nestedDtos[nestedDtoId][nestedDtoIdx].name}`}
                          key={`${dtoId}-dto-${dtoidx}-${dto.keyName}`}
                          formName={`${formName}.nestedDtoLists.${dtoId}[${dtoidx}].nestedDtos[${nestedDtoId}][${nestedDtoIdx}].fields`}
                        />
                      );
                    })}
                  {nestedDtoLists.value[dtoId][dtoidx].nestedDtoLists &&
                    Object.keys(
                      nestedDtoLists.value[dtoId][dtoidx].nestedDtoLists
                    ).map((nestedDtoId, nestedDtoIdx) => {
                      return (
                        <FieldListInput
                          depth={2}
                          typeName={`${nestedDtoLists.value[dtoId][dtoidx].nestedDtoLists[nestedDtoId][nestedDtoIdx].name}`}
                          key={`${dtoId}-dto-${dtoidx}-${dto.keyName}`}
                          formName={`${formName}.nestedDtoLists.${dtoId}[${dtoidx}].nestedDtoLists[${nestedDtoId}][${nestedDtoIdx}].fields`}
                        />
                      );
                    })}
                </FieldListInput>
                {/* 중첩 DTO */}
              </>
            );
          });
        })}
        {/* {...Object.keys(nestedDtos.value).map((dtoId) => {
          return nestedDtos.value[dtoId].map((dto: any, dtoidx: any) => {
            return (
              <div>
                <div>하이</div>
                <div>하이</div>
                <div>하이</div>
              </div>
            );
          });
        })} */}
        {/* {Object.keys(item.nestedDtos as NestedDtosType)?.map(
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
                      <ReqItemInnerPostman
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

                    {(dtoItem.fields as FieldsType[])?.map(
                      (item: FieldsType, idx: number) => (
                        <Controller
                          key={`${Math.random()}`}
                          name={`${formName}.nestedDtos.${dtoId}.fields.${idx}`}
                          control={control}
                          render={({ field }) => (
                            <ReqItemInnerPostman
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
                                  <ReqItemInnerPostman
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
                                        <ReqItemInnerPostman
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
        )} */}
      </div>
    </div>
  );
};

export default BodyListInput;
