import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { Box, Button, CircleBtn } from '../common';
import { useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';

interface Headers {
  key: string;
  type: string;
  desc: string;
}

interface Field {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  constraints: string[];
  value: string | null;
}

interface Body {
  fields: Field[];
  // dtos: Dto;
}

interface Response {
  status_code: number;
  desc: string;
  headers: Headers[];
  body: Body;
}

interface FormData {
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

interface PropsEx {
  data1getter?: (data: any) => void;
}

const ResponseForm = function ({ data1getter }: PropsEx) {
  // const [code, setCode] = useState<number>(0);
  // const [description, setDescription] = useState<string>('');
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

  const methods = useForm<FormData>({
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
    if (data1getter) {
      data1getter(data);
    }
  };
  return (
    <FormProvider {...methods}>
      <Box>
        <input type="number" ref={codeRef} onChange={codeChange} />
        <input type="text" ref={descRef} onChange={descChange} />
        <Button type="button" isEmpty onClick={addComponent}>
          add
        </Button>
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
