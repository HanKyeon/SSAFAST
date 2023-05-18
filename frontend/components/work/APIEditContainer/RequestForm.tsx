import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
  UseFormReturn,
  useFormContext,
  useController,
} from 'react-hook-form';
import { Box, Button, CircleBtn, Input, Select } from '@/components/common';
import { FormEvent, useCallback, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useInputNumber from '@/hooks/useInputNumber';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { inputTheme } from '@/utils/styleClasses';
import { ApiCreateForm } from './ApiWrite';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import ConstraintsController from '@/components/forms/ContstraintsController';
import ApiReqItemInner from './ApiReqItemInner';
import AnimationBox from '@/components/common/AnimationBox';
import NonHeaderController from './NonHeaderController';
import HeaderController from './HeaderController';
export interface RequestFormData {
  additionalUrl: string;
  headers: Headers[];
  body: BodyType;
  pathVars: PathVariables[];
  params: Params[];
}
export interface Headers {
  keyName: string;
  type: string;
  desc: string;
}

export interface BodyType {
  fields: Fields[];
  nestedDtos?: NestedDtosType;
}

export interface Fields {
  keyName: string;
  type: number;
  desc: string;
  itera: boolean;
  constraints: string[];
}

export type NestedDtosType = {
  [key: string | number]: BodyType[];
};

export interface PathVariables {
  keyName: string;
  type: number;
  desc: string;
  constraints: string[];
}

export interface Params {
  keyName: string;
  type: number;
  desc: string;
  constraints: string[];
  itera: boolean;
}

const RequestForm = function () {
  const { control } = useFormContext<ApiCreateForm>();
  const [paramsOpen, setParamsOpen] = useState<boolean>(true);
  const [pathOpen, setPathOpen] = useState<boolean>(true);
  const [headersOpen, setHeadersOpen] = useState<boolean>(true);
  const [bodyOpen, setBodyOpen] = useState<boolean>(true);

  // Headers
  const {
    fields: headersFields,
    append: headersAppend,
    remove: headersRemove,
  } = useFieldArray({ control, name: `document.request.headers` });

  const appendHeadersInput = function (e: FormEvent) {
    e.preventDefault();
    headersAppend({
      keyName: '',
      type: '',
      desc: '',
    });
    if (pathOpen === false) {
      setHeadersOpen((prev) => !prev);
    }
  };

  // Params
  const {
    fields: paramsFields,
    append: paramsAppend,
    remove: paramsRemove,
  } = useFieldArray({ name: `document.request.params`, control });

  const appendParamsInput = function (e: FormEvent) {
    e.preventDefault();
    paramsAppend({
      keyName: '',
      type: 0,
      desc: '',
      constraints: [],
      itera: false,
    });
    if (paramsOpen === false) {
      setParamsOpen((prev) => !prev);
    }
  };
  // Path Variables
  const {
    fields: pathFields,
    append: pathAppend,
    remove: pathRemove,
  } = useFieldArray({ control, name: `document.request.pathVars` });

  const appendPathInput = function (e: FormEvent) {
    e.preventDefault();
    pathAppend({
      keyName: '',
      type: 0,
      desc: '',
      constraints: [],
    });
    if (pathOpen === false) {
      setPathOpen((prev) => !prev);
    }
  };
  // Body
  const {
    fields: bodyFields,
    append: bodyAppend,
    remove: bodyRemove,
  } = useFieldArray({ control, name: `document.request.body.fields` });

  const appendbodyInput = function (e: FormEvent) {
    e.preventDefault();
    bodyAppend({
      keyName: '',
      type: 0,
      desc: '',
      itera: false,
      constraints: [],
    });
    if (pathOpen === false) {
      setPathOpen((prev) => !prev);
    }
  };
  const { field: urlField } = useController({
    name: `document.request.additionalUrl`,
  });

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-3 pb-5">
        <div className="flex items-center w-[90%]">
          <Input
            name={`document.request.additionalUrl`}
            onChange={urlField.onChange}
            type="text"
            placeholder="Urn"
            className=""
          />
        </div>
      </div>
      {/* Params */}
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center w-[95%]">
          <ToggleableHeader
            title="Params"
            isOpen={paramsOpen}
            setIsOpen={setParamsOpen}
          />
          <CircleBtn
            btnType="plus"
            type="button"
            onClick={appendParamsInput}
          ></CircleBtn>
        </div>
        {paramsFields.map((item, index) => (
          <AnimationBox
            key={item.id}
            className={`flex items-center justify-between 
          ${paramsOpen ? '' : 'hidden'}
          `}
          >
            <NonHeaderController
              item={item}
              index={index}
              remove={paramsRemove}
              formName={`document.request.params`}
            />
          </AnimationBox>
        ))}
        {/* Path Variables */}
        <div className="flex items-center w-[95%]">
          <ToggleableHeader
            title="Path Variables"
            isOpen={pathOpen}
            setIsOpen={setPathOpen}
          />
          <CircleBtn
            btnType="plus"
            type="button"
            onClick={appendPathInput}
          ></CircleBtn>
        </div>
        {pathFields.map((item, index) => (
          <AnimationBox
            key={item.id}
            className={`flex items-center justify-between 
          ${pathOpen ? '' : 'hidden'}
          `}
          >
            <NonHeaderController
              item={item}
              index={index}
              remove={pathRemove}
              formName={`document.request.pathVars`}
            />
          </AnimationBox>
        ))}
        {/* Headers */}
        <div className="flex items-center w-[95%]">
          <ToggleableHeader
            title="Headers"
            isOpen={headersOpen}
            setIsOpen={setHeadersOpen}
          />
          <CircleBtn
            btnType="plus"
            type="button"
            onClick={appendHeadersInput}
          ></CircleBtn>
        </div>
        {headersFields.map((item, index) => (
          <AnimationBox
            key={item.id}
            className={`flex items-center justify-between 
          ${headersOpen ? '' : 'hidden'}
          `}
          >
            <HeaderController
              item={item}
              index={index}
              remove={pathRemove}
              formName={`document.request.headers`}
            />
          </AnimationBox>
        ))}
        {/* Body */}
        <div className="flex items-center w-[95%]">
          <ToggleableHeader
            title="Body"
            isOpen={bodyOpen}
            setIsOpen={setBodyOpen}
          />
          <CircleBtn
            btnType="plus"
            type="button"
            onClick={appendbodyInput}
          ></CircleBtn>
        </div>
        {bodyFields.map((item, index) => (
          <AnimationBox
            key={item.id}
            className={`flex items-center justify-between 
          ${bodyOpen ? '' : 'hidden'}
          `}
          >
            <NonHeaderController
              item={item}
              index={index}
              remove={bodyRemove}
              formName={`document.request.body.fields`}
            />
          </AnimationBox>
        ))}
      </div>
    </>
  );
};

export default RequestForm;
