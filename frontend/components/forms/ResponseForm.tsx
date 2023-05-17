import {
  useFormContext,
  Controller,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { Box, Button, CircleBtn, Input } from '../common';
import { FormEvent, useRef } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { ApiCreateForm } from './ApiCreateForm';

export interface ResponseFormData {
  status_code: number;
  desc: string;
  headers: Headers[];
  body: BodyType;
}
interface Headers {
  key: string;
  type: string;
  desc: string;
}
export interface BodyType {
  fields: Fields[];
  nestedDtos?: NestedDtosType | NestedDtosType[];
}

interface Fields {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  constraints: string[];
  value: string | null;
}

export type NestedDtosType = {
  [key: string | number]: BodyType;
};

const ResponseForm = function () {
  const dispatch = useStoreDispatch();
  const selectedStyle = (dark: boolean) =>
    `${dark ? 'text-mincho-strong' : 'text-taro-strong'}` as const;

  const { dark } = useStoreSelector((state) => state.dark);
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
  const { control } = useFormContext<ApiCreateForm>();
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
      status_code: codeInput,
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
    } else {
      addComponent();
    }
  };

  return (
    <Box className="overflow-y-scroll pt-5 w-full h-full">
      <div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Input
            type="number"
            inputref={codeRef}
            onChange={codeChange}
            placeholder="Code"
            min={0}
            maxLength={3}
            pattern="^[0-9]*$"
          />

          <Input
            type="text"
            inputref={descRef}
            onChange={descChange}
            placeholder="description"
            maxLength={300}
          />

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
            <div key={item.id} className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="">
                    <div
                      id={`${item.id}-hukg`}
                      className={`${selectedStyle(
                        dark
                      )} font-extrabold text-2xl`}
                    >
                      {item.status_code}
                    </div>

                    <div
                      id={`${item.desc}`}
                      className="text-grayscale-light text-sm"
                    >
                      {item.desc}
                    </div>
                  </div>
                  <div>토글아이콘</div>
                </div>
                <CircleBtn
                  className=""
                  type="button"
                  btnType="delete"
                  onClick={() => remove(index)}
                ></CircleBtn>
              </div>
              <HeaderFields control={control} Keyindex={index} />
              <BodyFields control={control} Keyindex={index} />
            </div>
          ))}
        </>
      </>
    </Box>
  );
};

function HeaderFields({
  control,
  Keyindex,
}: {
  control: any;
  Keyindex: number;
}) {
  const {
    fields: headerFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.response.${Keyindex}.headers`,
    control,
  });
  const appendHeaderInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      key: '',
      type: '',
      desc: '',
    });
  };
  return (
    <>
      <div className="flex justify-between w-40">
        <div>Header</div>
        <CircleBtn btnType="plus" onClick={appendHeaderInput}></CircleBtn>
      </div>
      {headerFields.map((item, index) => (
        <div key={item.id} className="">
          <CircleBtn
            btnType="delete"
            type="button"
            onClick={() => remove(index)}
          ></CircleBtn>
          <Controller
            name={`document.response.${Keyindex}.headers[${index}].key`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex">
                <label htmlFor={`headers[${index}].key`}>Key:</label>
                <input type="text" id={`headers[${index}].key`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </div>
            )}
          />
          <Controller
            name={`document.response.${Keyindex}.headers[${index}].type`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex">
                <label htmlFor={`headers[${index}].type`}>Type:</label>
                <input type="text" id={`headers[${index}].type`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </div>
            )}
          />
          <Controller
            name={`document.response.${Keyindex}.headers[${index}].desc`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`headers[${index}].desc`}>Description:</label>
                <input type="text" id={`headers[${index}].desc`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </>
            )}
          />
        </div>
      ))}
    </>
  );
}

function BodyFields({ control, Keyindex }: { control: any; Keyindex: number }) {
  const {
    fields: bodyFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.response.${Keyindex}.body.fields`,
    control,
  });

  const appendBodyInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      key: '',
      type: '',
      desc: '',
      itera: false,
      constraints: [],
      value: null,
    });
  };

  return (
    <>
      <div className="flex justify-between w-40">
        <div>body</div>
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendBodyInput}
        ></CircleBtn>
      </div>
      {bodyFields.map((item, index) => (
        <div key={item.id}>
          <CircleBtn btnType="delete" onClick={() => remove(index)}></CircleBtn>
          <Controller
            name={`document.response.${Keyindex}.body.fields[${index}].key`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex">
                <label htmlFor={`bodys[${index}].key`}>Key:</label>
                <input type="text" id={`bodys[${index}].key`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </div>
            )}
          />
          <Controller
            name={`document.response.${Keyindex}.body.fields[${index}].type`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex">
                <label htmlFor={`body.fields[${index}].type`}>Type:</label>
                <input
                  type="text"
                  id={`body.fields[${index}].type`}
                  {...field}
                />
                {fieldState?.invalid && <span>This field is required</span>}
              </div>
            )}
          />
          <Controller
            name={`document.response.${Keyindex}.body.fields[${index}].desc`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <div className="flex">
                  <label htmlFor={`body.fields[${index}].desc`}>
                    Description:
                  </label>
                  <input
                    type="text"
                    id={`body.fields[${index}].desc`}
                    {...field}
                  />
                  {fieldState?.invalid && <span>This field is required</span>}
                </div>
              </>
            )}
          />
          <Controller
            name={`document.response.${Keyindex}.body.fields[${index}].itera`}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
              <>
                <label htmlFor={`body.fields[${index}].itera`}>Is List?:</label>
                <input
                  type="checkbox"
                  id={`body.fields[${index}].itera`}
                  {...field}
                />
              </>
            )}
          />
        </div>
      ))}
    </>
  );
}

export default ResponseForm;
