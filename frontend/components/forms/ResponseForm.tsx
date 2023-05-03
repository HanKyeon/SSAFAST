import {
  FormProvider,
  useForm,
  useFormContext,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { Box, Button, CircleBtn } from '../common';
import { useState } from 'react';
interface Header {
  key: string;
  type: string;
  description: string;
}

interface Body {
  key: string;
  type: string;
  description: string;
}

interface Response {
  code: number;
  descriptions: string;
  headers: Header[];
  bodys: Body[];
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
  const { fields } = useFieldArray({
    name: `response.${Keyindex}.headers`,
    control,
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
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
            name={`response.${Keyindex}.headers[${index}].description`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`headers[${index}].description`}>
                  Description:
                </label>
                <input
                  type="text"
                  id={`headers[${index}].description`}
                  {...field}
                />
                {fieldState?.invalid && <span>This field is required</span>}
              </>
            )}
          />
        </div>
      ))}
    </>
  );
}

const ResponseForm = function () {
  const methods = useForm<Response>();
  const { control, handleSubmit } = methods;
  const addComponent = function () {};
  const [item, setItem] = useState('');
  return (
    <>
      <div className="flex flex-row gap-4">
        <Controller
          name={`code`}
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor={`code`}>Status Code:</label>
              <input
                type="text"
                id={`code`}
                {...field}
                placeholder="Status Code"
              />
              {fieldState?.invalid && (
                <span>
                  상태코드를 입렵해주세요<div className=""></div>
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name={`descriptions`}
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor={`description`}>Description:</label>
              <input
                type="text"
                id={`description`}
                {...field}
                placeholder="Description"
              />
              {fieldState?.invalid && (
                <span>무슨 에러 코드인지 설명을 적어주세요.</span>
              )}
            </div>
          )}
        />
        <Button
          className="text-[1px]"
          isEmpty
          type="button"
          onClick={addComponent}
        >
          add
        </Button>
      </div>
      {}
      <div></div>
    </>
  );
};

export default ResponseForm;
