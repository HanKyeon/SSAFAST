import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  FormProvider,
  Controller,
  useController,
} from 'react-hook-form';
import { Form, Input, Select } from './components';
import { Button } from '../common';
import {
  UseFormRegister,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from 'react-hook-form/dist/types';
import { DepthDto, WonsiAttr } from '@/hooks/queries/queries';
import ToggleModeBtn from '../common/ToggleModeBtn';
import DtoController from './DtoController';

export interface DtoFieldInCompo {
  type: string | number; // 필드 타입. string 등
  typeName: string;
  desc: string; // 설명
  itera: boolean; // 배열 여부
  constraints: string[]; // 제한 조건 들
}

export interface DtoInterfaceInForm {
  fields: DtoFieldInCompo[];
}

const DtoForm = function () {
  const methods = useForm<DtoInterfaceInForm>();
  const { handleSubmit, control, getValues } = methods;

  const {
    fields: wonsiFields,
    append: wonsiAppend,
    remove: wonsiRemove,
  } = useFieldArray({
    name: `fields`,
    control,
  });

  const dataSetting = function (data: DtoInterfaceInForm) {
    // console.log(data);
    let fields: DtoFieldInCompo[] = [];
    let nestedDtos: DtoFieldInCompo[] = [];
    data.fields.forEach((field) => {
      if ((field.type as number) > 10) {
        nestedDtos.push(field);
      } else {
        fields.push(field);
      }
    });
    const config = { fields, nestedDtos };
    console.log(config);
  };

  return (
    <div className="bg-mincho-strong">
      <ToggleModeBtn />
      <FormProvider {...methods}>
        <div
          onClick={() => {
            console.log('ㅎㅇ');
            wonsiAppend({
              type: ``,
              typeName: ``,
              desc: ``,
              itera: false,
              constraints: [],
            });
          }}
        >
          추가하기
        </div>
        <form onSubmit={handleSubmit(dataSetting)}>
          {wonsiFields.map((item, idx) => {
            return (
              <DtoController
                key={`${item.id}-dto-container`}
                idx={idx}
                item={item}
              />
            );
          })}

          <button>테스트</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default DtoForm;
