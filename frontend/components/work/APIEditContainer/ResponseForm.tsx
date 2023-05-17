import {
  useFormContext,
  Controller,
  useFieldArray,
  UseFormReturn,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { Box, Button, CircleBtn, Input } from '@/components/common';
import { FormEvent, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { ApiCreateForm } from './ApiWrite';
import HeaderController from './HeaderController';
import AnimationBox from '@/components/common/AnimationBox';
import { defaultTypes } from '@/utils/constraints';
import { useDtoList } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CodeToggleHeader from './CodeToggleHeader';
export interface ResponseFormData {
  statusCode: number;
  desc: string;
  headers: Headers[];
  body: BodyType;
}
interface Headers {
  keyName: string;
  type: string;
  desc: string;
}
export interface BodyType {
  fields: Fields[];
  nestedDtos?: NestedDtosType | NestedDtosType[];
}

interface Fields {
  keyName: string;
  type: string;
  desc: string;
  itera: boolean;
}

interface ItemProps {
  item: FieldArrayWithId<ApiCreateForm, 'document.response', 'id'>;
  index: number;
  remove: UseFieldArrayRemove;
  control: any;
  getValues: any;
}
export type NestedDtosType = {
  [key: string | number]: BodyType;
};

const ResponseForm = function () {
  const dispatch = useStoreDispatch();

  const [codeRef, descRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const {
    inputData: codeInput,
    onChangeHandler: codeChange,
    onResetHandler: codeReset,
  } = useInputNumber(codeRef);
  const {
    inputData: descInput,
    onChangeHandler: descChange,
    onResetHandler: descReset,
  } = useInput(descRef);

  // const { control } = methods;
  const { control, getValues } = useFormContext<ApiCreateForm>();
  const {
    fields: responseFields,
    append,
    remove,
  } = useFieldArray({
    name: 'document.response',
    control,
  });

  const addComponent = function () {
    append({
      statusCode: codeInput,
      desc: descInput,
      headers: [],
      body: {
        fields: [],
        nestedDtos: {},
      },
    });
    codeReset();
    descReset();
  };

  const addComponentHandler = function () {
    if (codeRef?.current?.value.length !== 3) {
      dispatch(DispatchToast('상태 코드의 길이는 3자리여야 합니다!', false));
    } else if (descRef?.current?.value === '') {
      dispatch(DispatchToast('상태코드에 대한 설명을 입력해 주세요!', false));
    } else if (codeRef?.current?.value === '200') {
      dispatch(
        DispatchToast('상태코드 200은 이미 입력되어 있는 값입니다.', false)
      );
    } else {
      addComponent();
    }
  };

  return (
    <Box className="overflow-y-scroll pt-5 w-full h-full">
      <div>
        <div className="flex flex-row items-center justify-center">
          <div className="flex w-[70%] gap-16 items-center pl-36">
            <div className="w-[20%]">
              <Input
                className="text-center"
                type="number"
                inputref={codeRef}
                onChange={codeChange}
                placeholder="Code"
              />
            </div>
            <div className="w-[50%]">
              <Input
                className="text-center"
                type="text"
                inputref={descRef}
                onChange={descChange}
                placeholder="description"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={() => {
              addComponentHandler();
            }}
            isEmpty
          >
            add
          </Button>
        </div>
        <br />
      </div>
      <>
        <>
          {responseFields.map((item, index) => (
            <div key={item.id} className="p-3">
              <div className="">
                <ItemCompos
                  item={item}
                  index={index}
                  remove={remove}
                  control={control}
                  getValues={getValues}
                />
              </div>
            </div>
          ))}
        </>
      </>
    </Box>
  );
};

function ItemCompos({ item, index, remove, control, getValues }: ItemProps) {
  const dispatch = useStoreDispatch();
  const removeComponentHandler = function () {
    if (item.statusCode === 200) {
      dispatch(
        DispatchToast('성공시 응답은 반드시 입력해 주셔야합니다!', false)
      );
    } else {
      remove(index);
    }
  };
  const [detailOpen, setDetailOpen] = useState<boolean>(true);
  return (
    <div key={item.id}>
      <div className="flex items-center justify-between">
        <CodeToggleHeader
          isOpen={detailOpen}
          setIsOpen={setDetailOpen}
          title={item.statusCode}
          description={item.desc}
        />
        <CircleBtn
          className=""
          type="button"
          btnType="delete"
          onClick={removeComponentHandler}
        ></CircleBtn>
      </div>
      <div className={`${detailOpen ? '' : 'hidden'}`}>
        <HeaderFields
          control={control}
          Keyindex={index}
          getValues={getValues}
        />
        <BodyFields control={control} Keyindex={index} getValues={getValues} />
      </div>
    </div>
  );
}

function HeaderFields({
  control,
  Keyindex,
  getValues,
}: {
  control: any;
  Keyindex: number;
  getValues: any;
}) {
  const {
    fields: headerFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.response.${Keyindex}.headers`,
    control,
  });
  const [headersOpen, setHeadersOpen] = useState<boolean>(true);
  const appendHeaderInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      keyName: '',
      type: '',
      desc: '',
    });
    if (headersOpen === false) {
      setHeadersOpen((prev) => !prev);
    }
  };

  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: dtoListData } = useDtoList(spaceId);
  const [typeData, setTypeData] = useState<string | number>(``);
  const getTypeValue = function () {
    console.log(getValues().headerFields);
    // setTypeData(() => getValues().headerFields);
  };

  return (
    <>
      <div className="flex items-center">
        <ToggleableHeader
          title="Headers"
          isOpen={headersOpen}
          setIsOpen={setHeadersOpen}
        />
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendHeaderInput}
        ></CircleBtn>
      </div>
      {headerFields.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between py-2 h-full ${
            headersOpen ? '' : 'hidden'
          }`}
        >
          <AnimationBox
            key={`document.response.${Keyindex}.headers-container`}
            className={`flex flex-col h-full w-full items-center pl-12 
            `}
          >
            <Box
              variant="three"
              className="px-3 py-2 flex flex-row gap-3 h-full w-full items-center"
            >
              <div className="flex w-full">
                <Controller
                  key={`document.response.${Keyindex}.headers-keyName-${index}`}
                  name={`document.response.${Keyindex}.headers.${index}.keyName`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="flex flex-col gap-2 w-[25%] px-5">
                        {/* <label>이름</label> */}
                        <input
                          name={`document.response.${Keyindex}.headers.${index}.typeName`}
                          onChange={field.onChange}
                          value={field.value}
                          title={field.value}
                          placeholder="Key"
                          className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light truncate px-2"
                        />
                        {fieldState?.invalid && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>
                    </>
                  )}
                />
                <Controller
                  key={`document.response.${Keyindex}.headers-type-${item.id}`}
                  name={`document.response.${Keyindex}.headers.${index}.type`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2 w-[25%] px-3">
                      {/* <label>타입</label> */}
                      <select
                        name={`document.response.${Keyindex}.headers.${index}.type`}
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
                      {fieldState?.invalid && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  )}
                />
                <Controller
                  key={`document.response.${Keyindex}.headers.${index}.desc`}
                  name={`document.response.${Keyindex}.headers.${index}.desc`}
                  rules={{ required: true }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2 w-[48%] px-4">
                      {/* <label>설명</label> */}
                      <input
                        name={`document.response.${Keyindex}.headers.${index}.desc`}
                        onChange={field.onChange}
                        value={field.value}
                        className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light"
                        placeholder="Description"
                      />
                      {fieldState?.invalid && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
              <CircleBtn
                type="button"
                btnType="delete"
                onClick={() => remove(index)}
              ></CircleBtn>
            </Box>
          </AnimationBox>
        </div>
      ))}
    </>
  );
}

function BodyFields({
  control,
  Keyindex,
  getValues,
}: {
  control: any;
  Keyindex: number;
  getValues: any;
}) {
  const {
    fields: bodyFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.response.${Keyindex}.body.fields`,
    control,
  });
  const [bodyOpen, setBodyOpen] = useState<boolean>(true);
  const appendBodyInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      keyName: '',
      type: '',
      desc: '',
      itera: false,
    });
    if (bodyOpen === false) {
      setBodyOpen((prev) => !prev);
    }
  };
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: dtoListData } = useDtoList(spaceId);
  const [typeData, setTypeData] = useState<string | number>(``);
  const getTypeValue = function () {
    console.log(getValues().document.response[Keyindex].body.fields);
    // setTypeData(() => getValues().headerFields);
  };
  return (
    <>
      <div className="flex items-center">
        <ToggleableHeader
          title="Body"
          isOpen={bodyOpen}
          setIsOpen={setBodyOpen}
        />
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendBodyInput}
        ></CircleBtn>
      </div>
      {bodyFields.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between py-2 ${
            bodyOpen ? '' : 'hidden'
          }`}
        >
          <AnimationBox
            key={`${item.id}-container`}
            className="flex flex-col w-full items-center pl-12"
          >
            <Box
              variant="three"
              className="px-3 py-2 flex flex-row gap-3 w-full items-center"
            >
              <Controller
                key={`document.response.${Keyindex}.body.fields.${index}-keyName-${index}`}
                name={`document.response.${Keyindex}.body.fields.${index}.keyName`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2 w-[27%] px-5">
                    {/* <label>이름</label> */}
                    <input
                      name={`document.response.${Keyindex}.body.fields.${index}.keyName`}
                      onChange={field.onChange}
                      value={field.value}
                      title={field.value}
                      placeholder="Key"
                      className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light truncate px-2"
                    />
                    {fieldState?.invalid && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                key={`document.response.${Keyindex}.body.fields.${index}-type-${item.id}`}
                name={`document.response.${Keyindex}.body.fields.${index}.type`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2 w-[25%] px-3">
                    {/* <label>타입</label> */}
                    <select
                      name={`document.response.${Keyindex}.body.fields.${index}.type`}
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
                    {fieldState?.invalid && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                key={`document.response.${Keyindex}.body.fields.${index}.itera`}
                name={`document.response.${Keyindex}.body.fields.${index}.itera`}
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col w-[7%] items-center justify-center">
                    <label className="text-[16.6px]">배열</label>
                    <input
                      type="checkbox"
                      name={`document.response.${Keyindex}.body.fields.${index}.itera`}
                      onChange={field.onChange}
                      value={field.value}
                      className="flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light px-2"
                    />
                  </div>
                )}
              />
              <Controller
                key={`document.response.${Keyindex}.body.fields.${index}.desc`}
                name={`document.response.${Keyindex}.body.fields.${index}.desc`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2 w-[48%] px-4">
                    {/* <label>설명</label> */}
                    <input
                      name={`document.response.${Keyindex}.body.fields.${index}.desc`}
                      onChange={field.onChange}
                      value={field.value}
                      className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light"
                      placeholder="Description"
                    />
                    {fieldState?.invalid && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                )}
              />
              <CircleBtn
                type="button"
                btnType="delete"
                onClick={() => remove(index)}
              ></CircleBtn>
            </Box>
          </AnimationBox>
        </div>
      ))}
    </>
  );
}

export default ResponseForm;
