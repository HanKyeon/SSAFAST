import { useStoreSelector } from '@/hooks/useStore';
import { useState } from 'react';
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  FormProvider,
  Controller,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Button, CircleBtn, Input } from '@/components/common';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import ReqItem from '../APIDocsContainer/ReqItem';
import ReqItemBody from '../APIDocsContainer/ReqItemBody';
import { FieldsType, HeadersType, BodyType } from '../APIDocsContainer';

export interface LoadForm {
  request: {
    url: string; // request.url
    method: number; // request.method

    // useFieldArray
    headers: HeadersType[]; // request.headers
    pathVars: FieldsType[]; // request.pathVars
    params: FieldsType[]; // request.params

    body: BodyType; // request.body
  };
  testInfo: {
    duration: number; // testInfo.duration
    reqPerSec: number; // testInfo.reqPerSec
  };
}

interface Props {
  toggleIsList: () => void;
}

const RequestForm = function ({ toggleIsList }: Props) {
  const [data, setData] = useState({
    request: {
      url: '/api/:userid/comment/:commentid', // baseurl 외에 추가로 붙어야 하는 url 정보
      headers: [
        {
          keyName: 'Content-Type',
          type: 'String',
          desc: 'Define request data type',
          value: null,
        },
        {
          keyName: 'Age',
          type: 'Integer',
          desc: 'Fields for cashing',
          value: null,
        },
      ],
      body: {
        fields: [
          {
            keyName: 'ID',
            type: 'String',
            desc: 'Login User ID',
            itera: false,
            constraints: ['NotBlank', 'Size(min=4, max=10)', 'NotNull'],
            value: null,
          },
          {
            keyName: 'telephones',
            type: 'String',
            desc: 'cell-phone numbers with candidates',
            itera: true,
            constraints: ['NotBlank', 'NotNull', 'Length(min=2, max=5)'],
            value: null,
          },
        ],
        nestedDtos: {
          //dto id
          '15': {
            fields: [
              {
                keyName: 'ID',
                type: 'String',
                desc: 'User Identify Info',
                itera: false,
                constraints: ['notNull'],
              },
            ],
            nestedDtos: {
              '5': {
                fields: [
                  {
                    keyName: 'content',
                    type: 'String',
                    desc: 'comment for user',
                    itera: true,
                    constraints: ['NotNull', 'NotEmpty'],
                  },
                  {
                    keyName: 'CreatedDate',
                    type: 'Date',
                    desc: 'Sign up date',
                    itera: false,
                    constraints: ['NotNull'],
                  },
                ],
                nestedDtos: {},
              },
            },
          },
        },
      },
      pathVars: [
        {
          keyName: 'userid',
          type: 'String',
          desc: 'for login',
          constraints: ['NotNull'],
          value: null,
        },
        {
          keyName: 'userid',
          type: 'String',
          desc: 'for login',
          constraints: ['NotNull'],
          value: null,
        },
      ],
      params: [
        {
          keyName: 'age',
          type: 'int',
          desc: 'user age',
          constraints: ['NotNull'],
          value: null,
        },
      ],
    },
  });

  const methods = useForm<LoadForm>({
    defaultValues: { request: data.request, testInfo: {} },
  });
  const { control, handleSubmit } = methods;
  const {
    fields: headersFields,
    append: headersAppend,
    remove: headersRemove,
  } = useFieldArray({ control, name: `request.headers` });
  const {
    fields: paramsFields,
    append: paramsAppend,
    remove: paramsRemove,
  } = useFieldArray({ control, name: `request.params` });
  const {
    fields: pathFields,
    append: pathAppend,
    remove: pathRemove,
  } = useFieldArray({ control, name: `request.pathVars` });

  const checkData = function (data: LoadForm) {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <label className="pb-5">Request</label>
        <form
          className="h-full w-full flex flex-col justify-between"
          onSubmit={handleSubmit(checkData)}
        >
          <div className="flex flex-col">
            <div className={`p-2 pb-4 flex flex-col gap-7`}>
              {data.request.headers && (
                <ReqItem
                  fields={headersFields}
                  formName={`request.headers`}
                  name="headers"
                  control={control}
                  item={data.request.headers}
                />
              )}

              {data.request.body && (
                <ReqItemBody
                  formName={`request.body`}
                  control={control}
                  name="body"
                  item={data.request.body}
                />
              )}
              {data.request.pathVars && (
                <ReqItem
                  fields={pathFields}
                  formName={`request.pathVars`}
                  name="Path Variables"
                  control={control}
                  item={data.request.pathVars}
                />
              )}
              {data.request.params && (
                <ReqItem
                  fields={paramsFields}
                  formName={`request.params`}
                  name="params"
                  control={control}
                  item={data.request.params}
                />
              )}
            </div>
            <div className="flex flex-col gap-7 pt-4">
              <Controller
                name={`testInfo.reqPerSec`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex">
                    <div className="flex gap-7">
                      <label className="w-48" htmlFor={`testInfo.reqPerSec`}>
                        Request Per Second
                      </label>
                      <div className="flex flex-col">
                        <Input
                          className="w-48 text-center"
                          type="text"
                          placeholder="초당 요청 횟수"
                          name={`testInfo.reqPerSec`}
                          onChange={field.onChange}
                        />
                        {fieldState?.invalid && (
                          <span>초당 요청 횟수를 입력하여 주세요</span>
                        )}
                      </div>
                    </div>
                    <>회</>
                  </div>
                )}
              />
              <Controller
                name={`testInfo.duration`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex">
                    <div className="flex gap-7">
                      <label className="w-48" htmlFor={`testInfo.duration`}>
                        Duration
                      </label>
                      <div className="flex flex-col">
                        <Input
                          className="w-48 text-center"
                          type="text"
                          placeholder="요청 지속 시간"
                          name={`testInfo.duration`}
                          onChange={field.onChange}
                        />
                        {fieldState?.invalid && (
                          <span>지속 시간을 입력해 주세요.</span>
                        )}
                      </div>
                    </div>
                    <>초</>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex pb-4 justify-end items-end">
            <Button className="w-6" onClick={toggleIsList}>
              실행
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default RequestForm;
