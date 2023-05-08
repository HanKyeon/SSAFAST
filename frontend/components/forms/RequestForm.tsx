import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form';
import { Box, Button, CircleBtn, Input, Select } from '../common';
import { FormEvent, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { inputTheme } from '@/utils/styleClasses';
import { ApiCreateForm } from './ApiCreateForm';
import ToggleableHeader from '../work/APIDocsContainer/ToggleableHeader';

export interface RequestFormData {
  additional_url: string;
  headers: Headers[];
  body: Body;
  path_variable: PathVariables[];
  params: Params[];
}
interface Headers {
  key: string;
  type: string;
  desc: string;
  value: string | null;
}

interface Body {
  fields: Fields[];
  dtos: DTO;
}

interface Fields {
  key: string;
  type: string;
  desc: string;
  itera: boolean;
  constraints: string[];
  value: string | null;
}

interface DTO {
  [id: number]: {
    fields: Fields[];
  };
  nestedDto: DTO;
}

interface PathVariables {
  key: string;
  type: string;
  desc: string;
  constraints: string[];
  value: null;
}

interface Params {
  key: string;
  type: string;
  desc: string;
  constraints: string[];
  value: null;
}

const RequestForm = function () {
  const { control } = useFormContext<ApiCreateForm>();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 ">
        <Input type="text" placeholder="urn" />
      </div>

      <PathVariableFields control={control} />
      <ParamsFields control={control} />
      <HeaderFields control={control} />
      <BodyFields control={control} />
    </>
  );
};

function PathVariableFields({ control }: { control: any }) {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const {
    fields: pathVariableFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.request.path_variable`,
    control,
  });

  const appendPathVariableInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      key: '',
      type: '',
      desc: '',
      constraints: [],
      value: null,
    });
    if (isOpen === false) {
      setisOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex items-center w-96">
        <ToggleableHeader
          title="PathVariable"
          isOpen={isOpen}
          setIsOpen={setisOpen}
        />
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendPathVariableInput}
        ></CircleBtn>
      </div>
      {isOpen &&
        pathVariableFields.map((item, index) => (
          <div key={item.id}>
            <CircleBtn
              btnType="delete"
              onClick={() => remove(index)}
            ></CircleBtn>
            <Controller
              name={`document.request.path_variable.[${index}].key`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex">
                  <label htmlFor={`path_variable.[${index}].key`}>Key:</label>
                  <input
                    type="text"
                    id={`path_variable.[${index}].key`}
                    {...field}
                  />
                  {fieldState?.invalid && <span>This field is required</span>}
                </div>
              )}
            />
            <Controller
              name={`document.request.path_variable.[${index}].type`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex">
                  <label htmlFor={`path_variable.[${index}].type`}>Type:</label>
                  <input
                    type="text"
                    id={`path_variable.[${index}].type`}
                    {...field}
                  />
                  {fieldState?.invalid && <span>This field is required</span>}
                </div>
              )}
            />
            <Controller
              name={`document.request.path_variable.[${index}].desc`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex">
                    <label htmlFor={`path_variable.[${index}].desc`}>
                      Description:
                    </label>
                    <input
                      type="text"
                      id={`path_variable.[${index}].desc`}
                      {...field}
                    />
                    {fieldState?.invalid && <span>This field is required</span>}
                  </div>
                </>
              )}
            />
            <Controller
              name={`document.request.path_variable.[${index}].constraints`}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex">
                    <label htmlFor={`path_variable.[${index}].constraints`}>
                      Contstraints:
                    </label>
                    <input
                      type="text"
                      id={`path_variable.[${index}].constraints`}
                      {...field}
                    />
                    {fieldState?.invalid && <span>This field is required</span>}
                  </div>
                </>
              )}
            />
          </div>
        ))}
    </>
  );
}

function ParamsFields({ control }: { control: any }) {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const {
    fields: paramsFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.request.params`,
    control,
  });

  const appendParamsInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      key: '',
      type: '',
      desc: '',
      constraints: [],
      value: null,
    });
    if (isOpen === false) {
      setisOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex items-center w-96">
        <ToggleableHeader
          title="Params"
          isOpen={isOpen}
          setIsOpen={setisOpen}
        />
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendParamsInput}
        ></CircleBtn>
      </div>
      {isOpen &&
        paramsFields.map((item, index) => (
          <div key={item.id}>
            <CircleBtn
              btnType="delete"
              onClick={() => remove(index)}
            ></CircleBtn>
            <Controller
              name={`document.request.params.[${index}].key`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex">
                  <label htmlFor={`params.[${index}].key`}>Key:</label>
                  <input type="text" id={`params.[${index}].key`} {...field} />
                  {fieldState?.invalid && <span>This field is required</span>}
                </div>
              )}
            />
            <Controller
              name={`document.request.params.[${index}].type`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex">
                  <label htmlFor={`params.[${index}].type`}>Type:</label>
                  <input type="text" id={`params.[${index}].type`} {...field} />
                  {fieldState?.invalid && <span>This field is required</span>}
                </div>
              )}
            />
            <Controller
              name={`document.request.params.[${index}].desc`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex">
                    <label htmlFor={`params.[${index}].desc`}>
                      Description:
                    </label>
                    <input
                      type="text"
                      id={`params.[${index}].desc`}
                      {...field}
                    />
                    {fieldState?.invalid && <span>This field is required</span>}
                  </div>
                </>
              )}
            />
            <Controller
              name={`document.request.params.[${index}].constraints`}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex">
                    <label htmlFor={`params.[${index}].constraints`}>
                      Contstraints:
                    </label>
                    <input
                      type="text"
                      id={`params.[${index}].constraints`}
                      {...field}
                    />
                    {fieldState?.invalid && <span>This field is required</span>}
                  </div>
                </>
              )}
            />
          </div>
        ))}
    </>
  );
}
function HeaderFields({ control }: { control: any }) {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const {
    fields: headerFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.request.headers`,
    control,
  });
  const appendHeaderInput = function (e: FormEvent) {
    e.preventDefault();
    append({
      key: '',
      type: '',
      desc: '',
    });
    if (isOpen === false) {
      setisOpen((prev) => !prev);
    }
  };
  return (
    <>
      <div className="flex items-center w-96">
        <ToggleableHeader
          title="Headers"
          isOpen={isOpen}
          setIsOpen={setisOpen}
        />
        <CircleBtn btnType="plus" onClick={appendHeaderInput}></CircleBtn>
      </div>
      {isOpen &&
        headerFields.map((item, index) => (
          <div key={item.id} className="">
            <CircleBtn
              btnType="delete"
              type="button"
              onClick={() => remove(index)}
            ></CircleBtn>
            <Controller
              name={`document.request.headers[${index}].key`}
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
              name={`document.request.headers[${index}].type`}
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
              name={`document.request.headers[${index}].desc`}
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

function BodyFields({ control }: { control: any }) {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const {
    fields: bodyFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.request.body.fields`,
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
    if (isOpen === false) {
      setisOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex items-center w-96">
        <ToggleableHeader title="Body" isOpen={isOpen} setIsOpen={setisOpen} />
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendBodyInput}
        ></CircleBtn>
      </div>
      {isOpen &&
        bodyFields.map((item, index) => (
          <div key={item.id}>
            <CircleBtn
              btnType="delete"
              onClick={() => remove(index)}
            ></CircleBtn>
            <Controller
              name={`document.request.body.fields[${index}].key`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex">
                  <label htmlFor={`bbody.fields[${index}].key`}>Key:</label>
                  <input
                    type="text"
                    id={`body.fields[${index}].key`}
                    {...field}
                  />
                  {fieldState?.invalid && <span>This field is required</span>}
                </div>
              )}
            />
            <Controller
              name={`document.request.body.fields[${index}].type`}
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
              name={`document.request.body.fields[${index}].desc`}
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
              name={`document.request.body.fields[${index}].constraints`}
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex">
                    <label htmlFor={`body.fields[${index}].constraints`}>
                      Constraints:
                    </label>
                    <input
                      type="text"
                      id={`body.fields[${index}].constraints`}
                      {...field}
                    />
                  </div>
                </>
              )}
            />
            <Controller
              name={`document.request.body.fields[${index}].itera`}
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor={`body.fields[${index}].itera`}>
                    Is List?:
                  </label>
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
export default RequestForm;
