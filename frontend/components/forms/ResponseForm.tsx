import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { Box, Button, CircleBtn, Input } from '../common';
import { useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';

interface Headers {
  key: string;
  type: string;
  desc: string;
}

interface Fields {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  constraints: string[];
  value: string | null;
}

interface Body {
  fields: Fields[];
  // dtos: Dto;
}

interface Response {
  status_code: number;
  desc: string;
  headers: Headers[];
  body: Body;
}

interface ResponseFormData {
  response: Response[];
}

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
    name: `response.${Keyindex}.headers`,
    control,
  });
  const appendHeaderInput = function () {
    append({
      key: '',
      type: '',
      desc: '',
    });
  };
  return (
    <>
      <div>Header</div>
      <CircleBtn btnType="plus" onClick={appendHeaderInput}></CircleBtn>
      {headerFields.map((item, index) => (
        <div key={item.id}>
          <CircleBtn btnType="delete" onClick={() => remove(index)}></CircleBtn>
          <Controller
            name={`response.${Keyindex}.headers[${index}].key`}
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
            name={`response.${Keyindex}.headers[${index}].type`}
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
            name={`response.${Keyindex}.headers[${index}].desc`}
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
    name: `response.${Keyindex}.body.fields`,
    control,
  });

  const appendBodyInput = function () {
    append({
      key: '',
      type: '',
      desc: '',
      itera: false,
    });
  };

  return (
    <>
      <div>body</div>
      <CircleBtn btnType="plus" onClick={appendBodyInput}></CircleBtn>
      {bodyFields.map((item, index) => (
        <div key={item.id}>
          <CircleBtn btnType="delete" onClick={() => remove(index)}></CircleBtn>
          <Controller
            name={`response.${Keyindex}.body.fields[${index}].key`}
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
            name={`response.${Keyindex}.body.fields[${index}].type`}
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
            name={`response.${Keyindex}.body.fields[${index}].desc`}
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
            name={`response.${Keyindex}.body.fields[${index}].itera`}
            control={control}
            rules={{ required: true }}
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

interface ResponseProps {
  responseGetter?: (data: any) => void;
}

const ResponseForm = function ({ responseGetter }: ResponseProps) {
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

  const methods = useForm<ResponseFormData>({
    defaultValues: undefined,
    // {
    //   response: [
    //     {
    //       status_code: 404,
    //       desc: '낫파운드',
    //       body: {
    //         fields: [
    //           {
    //             key: 'a',
    //             desc: 'b',
    //             type: 'c',
    //             constraints: ['d'],
    //             itera: true,
    //             value: null,
    //           },
    //         ],
    //       },
    //       headers: [{ key: 'a', desc: 'b', type: 'c' }],
    //     },
    //   ],
    // },
  });
  const { control, handleSubmit, reset } = methods;
  const {
    fields: responseFields,
    append,
    remove,
  } = useFieldArray({
    name: 'response',
    control,
  });

  const addComponent = function () {
    append({
      status_code: codeInput,
      desc: descInput,
      headers: [],
      body: {
        fields: [],
      },
    });
    codeReset();
    descReset();
  };
  const submitHandler = function (data: any) {
    console.log('이건 리스폰스에서 찍힌 콘솔', data);

    if (responseGetter) {
      responseGetter(data);
    }
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
    <FormProvider {...methods}>
      <Box className="overflow-y-scroll pt-5 w-full h-full">
        <form onSubmit={handleSubmit(addComponentHandler)}>
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

            <Button type="submit" isEmpty>
              add
            </Button>
          </div>
        </form>
        <form onSubmit={handleSubmit((data) => submitHandler(data))}>
          <>
            {responseFields.map((item, index) => (
              <div key={item.id}>
                <label htmlFor={`${item.status_code}`}>Status Code:</label>
                <div id={`${item.status_code}`}>{item.status_code}</div>
                <label htmlFor={`${item.desc}`}>Descriptions:</label>
                <div id={`${item.desc}`}>{item.desc}</div>
                <CircleBtn
                  type="button"
                  btnType="delete"
                  onClick={() => remove(index)}
                ></CircleBtn>
                <HeaderFields control={control} Keyindex={index} />
                <BodyFields control={control} Keyindex={index} />
                {/* {!(errors.response && errors.response[index]?.code) &&
                !(errors.response && errors.response[index]?.descriptions) && (
                  <>
                    <HeaderFields control={control} index={index} />
                    <BodyFields control={control} index={index} />
                  </>
                )} */}
              </div>
            ))}
          </>
          <button type="submit">Submit</button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default ResponseForm;
