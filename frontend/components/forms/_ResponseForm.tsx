import {
  FormProvider,
  useForm,
  useFormContext,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { Box } from '../common';

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

function BodyFields({ control, Keyindex }: { control: any; Keyindex: number }) {
  const { fields } = useFieldArray({
    name: `response.${Keyindex}.bodys`,
    control,
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`response.${Keyindex}.bodys[${index}].key`}
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
            name={`response.${Keyindex}.bodys[${index}].type`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div className="flex">
                <label htmlFor={`bodys[${index}].type`}>Type:</label>
                <input type="text" id={`bodys[${index}].type`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </div>
            )}
          />
          <Controller
            name={`response.${Keyindex}.bodys[${index}].description`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`bodys[${index}].description`}>
                  Description:
                </label>
                <input
                  type="text"
                  id={`bodys[${index}].description`}
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
function ResponseForm() {
  const methods = useForm<FormData>({
    defaultValues: {
      response: [
        {
          code: 0,
          descriptions: '',
          headers: [{ key: '', type: '', description: '' }],
          bodys: [{ key: '', type: '', description: '' }],
        },
      ],
    },
  });
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    name: 'response',
    control,
  });

  return (
    <FormProvider {...methods}>
      <Box>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <>
            {fields.map((item, index) => (
              <div key={item.id}>
                <Controller
                  name={`response.${index}.code`}
                  control={control}
                  defaultValue={0}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <>
                      <label htmlFor={`response.${index}.code`}>Code:</label>
                      <input
                        type="text"
                        id={`response.${index}.code`}
                        {...field}
                      />
                      {fieldState?.invalid && (
                        <span>This field is required</span>
                      )}
                    </>
                  )}
                />

                <Controller
                  name={`response.${index}.descriptions`}
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <>
                      <label htmlFor={`response.${index}.descriptions`}>
                        Description:
                      </label>
                      <input
                        type="text"
                        id={`response.${index}.descriptions`}
                        {...field}
                      />
                      {fieldState?.invalid && (
                        <span>This field is required</span>
                      )}
                    </>
                  )}
                />
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
            <button
              type="button"
              onClick={() =>
                append({
                  code: 0,
                  descriptions: '',
                  headers: [{ key: '', type: '', description: '' }],
                  bodys: [{ key: '', type: '', description: '' }],
                })
              }
            >
              Add Response
            </button>
          </>
          <button type="submit">Submit</button>
        </form>
      </Box>
    </FormProvider>
  );
}

export default ResponseForm;
