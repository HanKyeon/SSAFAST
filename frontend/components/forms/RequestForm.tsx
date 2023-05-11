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
import ConstraintsController from './ContstraintsController';
export interface RequestFormData {
  additional_url: string;
  headers: Headers[];
  body: BodyType[];
  pathVars: PathVariables[];
  params: Params[];
}
interface Headers {
  key: string;
  type: string;
  desc: string;
  value: string | null;
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
  itera: boolean;
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
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const depth = useRef(0);

  const styles = {
    innerBox: `w-full h-auto flex items-center overflow-hidden mb-3 rounded-[13px] ${
      isDark
        ? 'bg-grayscale-deepdark text-white'
        : 'bg-grayscale-light text-black'
    }`,
    key: `py-[8px] px-3 text-ellipsis ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    } w-1/4`,
    type: `py-[8px] px-3 w-1/4 border-x-[1px] ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    desc: `py-[8px] px-3 flex-1 w-2/4 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
    constraints: `w-[95%] ${
      isDark ? 'bg-grayscale-deepdarkdeep' : 'bg-grayscale-deeplight'
    }`,
  };

  const [isOpen, setisOpen] = useState<boolean>(true);
  const {
    fields: pathVariableFields,
    append,
    remove,
  } = useFieldArray({
    name: `document.request.path_variable`,
    control,
  });
  const [constraintsOpen, setConstraintsOpen] = useState<boolean>(true);
  // const {
  //   fields: constraintsFields,
  //   append: constraintsAppend,
  //   remove: constraintsRemove,
  // } = useFieldArray({
  //   control,
  //   name: `document.request.path_variable.${index}.constraints`,
  // });

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
  // const appendConstraint = function (e: FormEvent) {
  //   e.preventDefault();
  //   // constraintsAppend(``);
  // };
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
            <div className={`${styles['innerBox']}`}>
              <Controller
                name={`document.request.path_variable.${index}.key`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className={`${styles['key']}`}>
                    <label htmlFor={`path_variable.${index}.key`}></label>
                    <Input
                      type="text"
                      placeholder="Key"
                      name={`document.request.path_variable.${index}.key`}
                      onChange={field.onChange}
                    />
                    {fieldState?.invalid && <span>This field is required</span>}
                  </div>
                )}
              />
              <Controller
                name={`document.request.path_variable.${index}.type`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className={`${styles['type']}`}>
                    <label htmlFor={`path_variable.${index}.type`}></label>
                    <Input
                      type="text"
                      placeholder="Type"
                      id={`path_variable.[${index}].type`}
                      name={`document.request.path_variable.${index}.type`}
                      onChange={field.onChange}
                    />
                    {fieldState?.invalid && <span>This field is required</span>}
                  </div>
                )}
              />
              <Controller
                name={`document.request.path_variable.${index}.desc`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <>
                    <div className={`${styles['desc']}`}>
                      <label htmlFor={`path_variable.${index}.desc`}></label>
                      <Input
                        type="text"
                        placeholder="Description"
                        name={`document.request.path_variable.${index}.desc`}
                        id={`path_variable.${index}.desc`}
                        onChange={field.onChange}
                      />
                      {fieldState?.invalid && (
                        <span>This field is required</span>
                      )}
                    </div>
                  </>
                )}
              />
            </div>
            <div className={`${styles['constraints']}`}>
              <div className=" flex items-center">
                <ToggleableHeader
                  title="Constraints"
                  isOpen={constraintsOpen}
                  setIsOpen={setConstraintsOpen}
                />
                <CircleBtn
                  btnType="plus"
                  type="button"
                  onClick={appendPathVariableInput}
                ></CircleBtn>
              </div>
              {constraintsOpen && (
                <Controller
                  name={`document.request.path_variable.${index}.constraints`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <div className={`${styles['constraints']}`}>
                        <Input
                          type="text"
                          placeholder="Description"
                          name={`document.request.path_variable.${index}.constraints`}
                          onChange={field.onChange}
                        />
                        {fieldState?.invalid && (
                          <span>This field is required</span>
                        )}
                      </div>
                    </>
                  )}
                />
              )}
            </div>
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
  ``;
  const {
    fields: constraintsFields,
    append: constraintsAppend,
    remove: constraintsRemove,
  } = useFieldArray({
    control,
    name: `document.request.params.constraints`,
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
                    {constraintsFields.map((item, idx) => {
                      return (
                        <Controller
                          key={`${item.id}`}
                          name={`document.request.params.[${index}].constraints.${idx}`}
                          render={({ field }) => {
                            return (
                              <div className="flex flex-row gap-2">
                                <select
                                  key={`${item.id}-constraint`}
                                  name={`document.request.params.[${index}].constraints.${idx}`}
                                  onChange={field.onChange}
                                >
                                  s<option value={``}>선택하세욤 뿌우</option>
                                  <option value={`NotNull`}>NotNull</option>
                                  <option value={`NotOption`}>NotOption</option>
                                  <option value={`SomeOption`}>
                                    SomeOption
                                  </option>
                                  <option value={`AnyOption`}>AnyOption</option>
                                </select>
                                <div onClick={() => constraintsRemove(idx)}>
                                  제거
                                </div>
                              </div>
                            );
                          }}
                        />
                      );
                    })}
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
        <CircleBtn
          btnType="plus"
          type="button"
          onClick={appendHeaderInput}
        ></CircleBtn>
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
