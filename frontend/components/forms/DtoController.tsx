import {
  commonConstraints,
  defaultTypes,
  stringConstraints,
} from '@/utils/constraints';
import { Box } from '../common';
import { DtoFieldInCompo, DtoInterfaceInForm } from './DtoForm';
import {
  Controller,
  FieldArrayWithId,
  useController,
  useFormContext,
  useFieldArray,
  useForm,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { useDtoList } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useStoreSelector } from '@/hooks/useStore';
import { IoAddCircle } from 'react-icons/io5';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { useState } from 'react';
import AnimationBox from '../common/AnimationBox';
import ConstraintsOption, { StringOption } from './ConstraintsOption';

interface Props {
  item: FieldArrayWithId<DtoInterfaceInForm, 'fields', 'id'>;
  idx: number;
  remove: (idx: number) => void;
}
``;
const DtoController = function ({ item, idx, remove }: Props) {
  const { control, getValues, watch } = useFormContext();
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { dark } = useStoreSelector((state) => state.dark);
  const [typeData, setTypeData] = useState<number>(0);
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
    constraintsAppend({
      mainName: ``,
      minV: null,
      maxV: null,
      validateReg: ``,
    });
  };
  const { data: dtoListData } = useDtoList(spaceId);
  const removeHandler = function () {
    remove(idx);
  };

  const getTypeValue = function () {
    // console.log(getValues().fields[idx].type);
    setTypeData(() => parseInt(getValues().fields[idx].type));
  };

  return (
    <AnimationBox
      key={`${item.id}-container`}
      className="flex flex-col w-full items-center"
    >
      <Box
        variant="three"
        className="px-3 py-2 flex flex-row gap-3 w-full items-center"
      >
        <Controller
          key={`field-keyName-${idx}`}
          name={`fields.${idx}.keyName`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[23%]">
              {/* <label>이름</label> */}
              <input
                name={`fields.${idx}.keyName`}
                onChange={field.onChange}
                title={field.value}
                placeholder="Key"
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light truncate px-2"
              />
            </div>
          )}
        />
        <Controller
          key={`field-type-${item.id}`}
          name={`fields.${idx}.type`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[17%]">
              {/* <label>타입</label> */}
              <select
                name={`fields.${idx}.type`}
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
                      key={`${type.id}-${type.desc}-${idx}`}
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
                        key={`${dto.id}-dtoType-${idx}`}
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
          key={`field-itera-${idx}`}
          name={`fields.${idx}.itera`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col w-[7%] items-center justify-center">
              <label className="text-[16.6px]">배열</label>
              <input
                type="checkbox"
                name={`fields.${idx}.itera`}
                onChange={field.onChange}
                value={field.value}
                className="flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light px-2"
              />
            </div>
          )}
        />
        <Controller
          key={`field-desc-${idx}`}
          name={`fields.${idx}.desc`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[48%]">
              {/* <label>설명</label> */}
              <input
                name={`fields.${idx}.desc`}
                onChange={field.onChange}
                title={field.value}
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light"
                placeholder="Description"
              />
            </div>
          )}
        />
        <RiDeleteBack2Fill
          className={`text-red-400 hover:scale-105 cursor-pointer`}
          onClick={removeHandler}
        />
      </Box>
      {/* d아래가 제약조건 */}
      {/* <div className="w-full flex flex-col"> */}
      <Controller
        key={`field-constraints-${idx}`}
        name={`fields.${idx}.constraints`}
        control={control}
        render={({ field }) => {
          return (
            <div
              className={`flex flex-col gap-1 w-[90%] justify-center rounded-b-[13px] px-3 py-2 ${
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
              {constraintsFields.map((item, iidx) => {
                return (
                  <Controller
                    key={`${item.id}-constraint`}
                    name={`fields.${idx}.constraints.${iidx}.mainName`}
                    render={({ field: ifield }) => {
                      return (
                        <AnimationBox className="flex flex-row gap-2">
                          <select
                            key={`${item.id}-constraint-${iidx}`}
                            name={`fields.${idx}.constraints.${iidx}.mainName`}
                            onChange={ifield.onChange}
                            value={ifield.value}
                            className="w-[25%] flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light aria-selected:bg-black px-2"
                          >
                            <option value={``}>선택</option>
                            {typeData < 10 &&
                              commonConstraints.map((con) => {
                                return (
                                  <option
                                    key={`${con.name}-wonsi-${iidx}`}
                                    value={con.name}
                                    title={con.desc}
                                  >
                                    {con.name}
                                  </option>
                                );
                              })}
                            {typeData === 1 &&
                              stringConstraints.map((con) => {
                                return (
                                  <option
                                    key={`${con.name}-string-wonsi-${iidx}`}
                                    value={`${con.name}`}
                                    title={con.desc}
                                  >
                                    {con.name}
                                  </option>
                                );
                              })}
                            {typeData === 1 && (
                              <>
                                <option
                                  key={`pattern-string-${iidx}`}
                                  value={`Pattern`}
                                >
                                  Pattern
                                </option>
                                <option
                                  key={`length-string-${iidx}`}
                                  value={`Length`}
                                >
                                  Length
                                </option>
                              </>
                            )}
                            {typeData >= 2 && typeData <= 5 && (
                              <option key={`max-number-${iidx}`} value={`Max`}>
                                Max
                              </option>
                            )}
                            {typeData >= 2 && typeData <= 5 && (
                              <option key={`min-number-${iidx}`} value={`Min`}>
                                Min
                              </option>
                            )}
                            {typeData >= 2 && typeData <= 5 && (
                              <option
                                key={`range-number-${iidx}`}
                                value={`Range`}
                              >
                                Range
                              </option>
                            )}
                          </select>
                          {ifield.value === `Pattern` && (
                            <>
                              <Controller
                                key={`${item.id}-constraint-validateReg-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.validateReg`}
                                render={({ field: validateRegField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.validateReg`}
                                      type="text"
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
                                key={`${item.id}-constraint-maxV-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.maxV`}
                                render={({ field: maxVField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.maxV`}
                                      type="number"
                                      step={typeData === 2 ? 1 : 0.01}
                                      onChange={maxVField.onChange}
                                      value={maxVField.value}
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
                                key={`${item.id}-constraint-minV-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.minV`}
                                render={({ field: minVField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.minV`}
                                      type="number"
                                      step={typeData === 2 ? 1 : 0.01}
                                      onChange={minVField.onChange}
                                      value={minVField.value}
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
                                key={`${item.id}-constraint-minV-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.minV`}
                                render={({ field: minVField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.minV`}
                                      type="number"
                                      step={typeData === 2 ? 1 : 0.01}
                                      onChange={minVField.onChange}
                                      value={minVField.value}
                                      placeholder="Minimum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                              <Controller
                                key={`${item.id}-constraint-maxV-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.maxV`}
                                render={({ field: maxVField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.maxV`}
                                      type="number"
                                      step={typeData === 2 ? 1 : 0.01}
                                      onChange={maxVField.onChange}
                                      value={maxVField.value}
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
                                key={`${item.id}-constraint-minV-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.minV`}
                                render={({ field: minVField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.minV`}
                                      type="number"
                                      onChange={minVField.onChange}
                                      value={minVField.value}
                                      placeholder="Minimum"
                                      className="text-grayscale-dark bg-grayscale-deeplightlight bg-opacity-0 border-b-[3px] border-b-grayscale-dark w-[33%]"
                                    />
                                  );
                                }}
                              />
                              <Controller
                                key={`${item.id}-constraint-maxV-${iidx}`}
                                name={`fields.${idx}.constraints.${iidx}.maxV`}
                                render={({ field: maxVField }) => {
                                  return (
                                    <input
                                      name={`fields.${idx}.constraints.${iidx}.maxV`}
                                      type="number"
                                      onChange={maxVField.onChange}
                                      value={maxVField.value}
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
                            onClick={() => constraintsRemove(iidx)}
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
      {/* </div> */}
    </AnimationBox>
  );
};

export default DtoController;
