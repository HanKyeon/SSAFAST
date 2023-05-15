import {
  commonConstraints,
  defaultTypes,
  stringConstraints,
} from '@/utils/constraints';
import AnimationBox from '@/components/common/AnimationBox';
import { ApiCreateForm } from './ApiWrite';

import {
  Controller,
  FieldArrayWithId,
  useFormContext,
  useFieldArray,
} from 'react-hook-form';
import { Box, CircleBtn } from '@/components/common';
import { useState } from 'react';
import { useDtoList } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useStoreSelector } from '@/hooks/useStore';
import { IoAddCircle } from 'react-icons/io5';
import { RiDeleteBack2Fill } from 'react-icons/ri';

interface Props {
  item: FieldArrayWithId<
    ApiCreateForm,
    | 'document.request.params'
    | 'document.request.pathVars'
    | 'document.request.body.fields',
    'id'
  >;
  index: number;
  formName: string;
  remove: (index: number) => void;
}

const NonHeaderController = function ({
  item,
  index,
  formName,
  remove,
}: Props) {
  const { control, getValues, watch } = useFormContext();
  const { dark } = useStoreSelector((state) => state.dark);
  const [typeData, setTypeData] = useState<string | number>(``);
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: dtoListData } = useDtoList(spaceId);

  const {
    fields: constraintsFields,
    append: constraintsAppend,
    remove: constraintsRemove,
  } = useFieldArray({
    control,
    name: `${formName}.${index}.constraints`,
  });

  const appendConstraint = function () {
    constraintsAppend({ mainName: ``, minV: null, maxV: null });
  };

  const getTypeValue = function () {
    // console.log(getValues(formName)[index].type);
    setTypeData(() => getValues(formName)[index].type);
  };
  const removeHandler = function () {
    remove(index);
  };

  return (
    <AnimationBox
      key={`${item.id}-container`}
      className="flex flex-col w-full items-center pl-12"
    >
      <Box
        variant="three"
        className="px-3 py-2 flex flex-row gap-3 w-full items-center"
      >
        <Controller
          key={`${formName}-keyName-${index}`}
          name={`${formName}.${index}.keyName`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[23%] px-5">
              {/* <label>이름</label> */}
              <input
                name={`${formName}.${index}.typeName`}
                onChange={field.onChange}
                value={field.value}
                title={field.value}
                placeholder="Key"
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light truncate px-2"
              />
            </div>
          )}
        />
        <Controller
          key={`${formName}-type-${item.id}`}
          name={`${formName}.${index}.type`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[17%] px-3">
              {/* <label>타입</label> */}
              <select
                name={`${formName}.${index}.type`}
                onChange={(v) => {
                  field.onChange(v);
                  getTypeValue();
                }}
                value={field.value}
                placeholder="Type"
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light aria-selected:bg-black px-2"
              >
                <option value={``}>Type</option>
                {defaultTypes.map((type) => {
                  return (
                    <option
                      key={`${type.id}-${type.desc}-${index}`}
                      value={type.id}
                      title={type.desc}
                    >
                      {type.name}
                    </option>
                  );
                })}
                {dtoListData &&
                  dtoListData?.dtoList.map((dto) => {
                    return (
                      <option
                        key={`${dto.id}-dtoType-${index}`}
                        value={dto.id}
                        title={dto.desc}
                      >
                        {dto.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
        />
        <Controller
          key={`${formName}.${index}.itera`}
          name={`${formName}.${index}.itera`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col w-[7%] items-center justify-center">
              <label className="text-[16.6px]">배열</label>
              <input
                type="checkbox"
                name={`${formName}.${index}.itera`}
                onChange={field.onChange}
                value={field.value}
                className="flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light px-2"
              />
            </div>
          )}
        />
        <Controller
          key={`${formName}.${index}.desc`}
          name={`${formName}.${index}.desc`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[48%] px-4">
              {/* <label>설명</label> */}
              <input
                name={`${formName}.${index}.desc`}
                onChange={field.onChange}
                value={field.value}
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light"
                placeholder="Description"
              />
            </div>
          )}
        />
        <CircleBtn
          type="button"
          btnType="delete"
          onClick={() => remove(index)}
        ></CircleBtn>
      </Box>
      {/* 제약 조건 */}
      <Controller
        key={`${formName}-constraints-${index}`}
        name={`${formName}.${index}.constraints`}
        control={control}
        render={({ field }) => {
          return (
            <div
              className={`flex flex-col gap-1 w-[95%] justify-center rounded-b-[13px] px-3 py-2 ${
                dark
                  ? 'bg-grayscale-deepdarkdeep'
                  : 'bg-grayscale-deeplightlight'
              }`}
            >
              <div className="w-full flex flex-row gap-3 items-center">
                <span className="text-[22px]">Constraints</span>
                <IoAddCircle
                  className={`text-[24px] cursor-pointer hover:scale-105 duration-[0.33s] ${
                    dark ? 'text-taro-strong' : 'text-mincho-strong'
                  }`}
                  onClick={appendConstraint}
                />
              </div>
              {/* <ConstraintsOption
                typeData={typeData}
                AddConstraint={constraintsAddHandler}
              /> */}
              {constraintsFields.map((item, idx) => {
                return (
                  <Controller
                    key={`${item.id}-constraint`}
                    name={`${formName}.${index}.constraints.${idx}.mainName`}
                    render={({ field: ifield }) => {
                      return (
                        <AnimationBox className="flex flex-row gap-2">
                          <select
                            key={`${item.id}-constraint-${idx}`}
                            name={`${formName}.${index}.constraints.${idx}.mainName`}
                            onChange={ifield.onChange}
                            value={ifield.value}
                            className="w-[25%] flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light aria-selected:bg-black px-2"
                          >
                            <option value={``}>선택</option>
                            {commonConstraints.map((con) => {
                              return (
                                <option
                                  key={`${con.name}-wonsi-${idx}`}
                                  value={con.name}
                                  title={con.desc}
                                >
                                  {con.name}
                                </option>
                              );
                            })}
                            {typeData === 'String' &&
                              stringConstraints.map((con) => {
                                return (
                                  <option
                                    key={`${con.name}-string-wonsi-${idx}`}
                                    value={`${con.name}`}
                                    title={con.desc}
                                  >
                                    {con.name}
                                  </option>
                                );
                              })}
                            {typeData === 'String' && (
                              <>
                                <option
                                  key={`pattern-string-${idx}`}
                                  value={`Pattern`}
                                >
                                  Pattern
                                </option>
                                <option
                                  key={`length-string-${idx}`}
                                  value={`Length`}
                                >
                                  Length
                                </option>
                              </>
                            )}
                            {(typeData === 'int' ||
                              typeData === `long` ||
                              typeData === `float` ||
                              typeData === `double`) && (
                              <option key={`max-number-${idx}`} value={`Max`}>
                                Max
                              </option>
                            )}
                            {(typeData === 'int' ||
                              typeData === `long` ||
                              typeData === `float` ||
                              typeData === `double`) && (
                              <option key={`min-number-${idx}`} value={`Min`}>
                                Min
                              </option>
                            )}
                            {(typeData === 'int' ||
                              typeData === `long` ||
                              typeData === `float` ||
                              typeData === `double`) && (
                              <option
                                key={`range-number-${idx}`}
                                value={`Range`}
                              >
                                Range
                              </option>
                            )}
                          </select>
                          {ifield.value === `Pattern` && (
                            <>
                              <Controller
                                key={`${item.id}-constraint-validateReg-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.validateReg`}
                                render={({ field: validateRegField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.validateReg`}
                                      type="text"
                                      value={validateRegField.value}
                                      onChange={validateRegField.onChange}
                                      placeholder="regexp"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                            </>
                          )}
                          {ifield.value === `Max` && (
                            <>
                              <Controller
                                key={`${item.id}-constraint-maxV-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.maxV`}
                                render={({ field: maxVField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.maxV`}
                                      type="number"
                                      value={maxVField.value}
                                      step={typeData === `int` ? 1 : 0.01}
                                      onChange={maxVField.onChange}
                                      placeholder="Maximum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                            </>
                          )}
                          {ifield.value === `Min` && (
                            <>
                              <Controller
                                key={`${item.id}-constraint-minV-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.minV`}
                                render={({ field: minVField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.minV`}
                                      type="number"
                                      value={minVField.value}
                                      step={typeData === `int` ? 1 : 0.01}
                                      onChange={minVField.onChange}
                                      placeholder="Minimum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                            </>
                          )}
                          {ifield.value === `Range` && (
                            <>
                              <Controller
                                key={`${item.id}-constraint-minV-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.minV`}
                                render={({ field: minVField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.minV`}
                                      type="number"
                                      value={minVField.value}
                                      step={typeData === `int` ? 1 : 0.01}
                                      onChange={minVField.onChange}
                                      placeholder="Minimum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                              <Controller
                                key={`${item.id}-constraint-maxV-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.maxV`}
                                render={({ field: maxVField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.maxV`}
                                      type="number"
                                      value={maxVField.value}
                                      step={typeData === `int` ? 1 : 0.01}
                                      onChange={maxVField.onChange}
                                      placeholder="Maximum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                            </>
                          )}
                          {ifield.value === `Length` && (
                            <>
                              <Controller
                                key={`${item.id}-constraint-minV-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.minV`}
                                render={({ field: minVField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.minV`}
                                      type="number"
                                      value={minVField.value}
                                      onChange={minVField.onChange}
                                      placeholder="Minimum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                              <Controller
                                key={`${item.id}-constraint-maxV-${idx}`}
                                name={`${formName}.${index}.constraints.${idx}.maxV`}
                                render={({ field: maxVField }) => {
                                  return (
                                    <input
                                      name={`${formName}.${index}.constraints.${idx}.maxV`}
                                      type="number"
                                      value={maxVField.value}
                                      onChange={maxVField.onChange}
                                      placeholder="Maximum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                            </>
                          )}
                          <RiDeleteBack2Fill
                            className="cursor-pointer hover:scale-105 text-red-400"
                            onClick={() => constraintsRemove(idx)}
                          />
                        </AnimationBox>
                      );
                    }}
                  />
                );
              })}
            </div>
          );
        }}
      />
    </AnimationBox>
  );
};

export default NonHeaderController;
