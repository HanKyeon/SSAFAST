import {
  FormProvider,
  useForm,
  useFormContext,
  Controller,
  useFieldArray,
} from 'react-hook-form';

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

function HeaderFields({ control, index }: { control: any; index: number }) {
  const { fields } = useFieldArray({
    name: `response.${index}.headers`,
    control,
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`response.${index}.headers[${index}].key`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`headers[${index}].key`}>Key:</label>
                <input type="text" id={`headers[${index}].key`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </>
            )}
          />
          <Controller
            name={`response.${index}.headers[${index}].type`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`headers[${index}].type`}>Type:</label>
                <input type="text" id={`headers[${index}].type`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </>
            )}
          />
          <Controller
            name={`response.${index}.headers[${index}].description`}
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

function BodyFields({ control, index }: { control: any; index: number }) {
  const { fields } = useFieldArray({
    name: `response.${index}.bodys`,
    control,
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`response.${index}.bodys[${index}].key`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`bodys[${index}].key`}>Key:</label>
                <input type="text" id={`bodys[${index}].key`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </>
            )}
          />
          <Controller
            name={`response.${index}.bodys[${index}].type`}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <label htmlFor={`bodys[${index}].type`}>Type:</label>
                <input type="text" id={`bodys[${index}].type`} {...field} />
                {fieldState?.invalid && <span>This field is required</span>}
              </>
            )}
          />
          <Controller
            name={`response.${index}.bodys[${index}].description`}
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
  const { fields, append } = useFieldArray({ name: 'response', control });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="text-black">
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
                    {fieldState?.invalid && <span>This field is required</span>}
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
                    {fieldState?.invalid && <span>This field is required</span>}
                  </>
                )}
              />

              {!(errors.response && errors.response[index]?.code) &&
                !(errors.response && errors.response[index]?.descriptions) && (
                  <>
                    <HeaderFields control={control} index={index} />
                    <BodyFields control={control} index={index} />
                  </>
                )}
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

export default ResponseForm;
