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
import { Button, CircleBtn } from '@/components/common';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
interface LoadForm {
  request: {
    url: string;
    method: number;
    headers: Headers[];
    pathVars: PathVars[];
    params: Params[];
    body: string;
  };
  testInfo: {
    duration: number;
    reqPerSec: number;
  };
}

interface Headers {
  a: number;
}
interface PathVars {
  a: number;
}
interface Params {
  a: number;
}

const RequestForm = function () {
  const [data, setData] = useState({
    request: {
      additional_url: '/api/:userid/comment/:commentid', // baseurl 외에 추가로 붙어야 하는 url 정보
      headers: [
        {
          key: 'Content-Type',
          type: 'String',
          desc: 'Define request data type',
          value: null,
        },
        {
          key: 'Age',
          type: 'Integer',
          desc: 'Fields for cashing',
          value: null,
        },
      ],
      body: {
        fields: [
          {
            key: 'ID',
            type: 'String',
            desc: 'Login User ID',
            itera: false,
            constraints: ['NotBlank', 'Size(min=4, max=10)', 'NotNull'],
            value: null,
          },
          {
            key: 'telephones',
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
                key: 'ID',
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
                    key: 'content',
                    type: 'String',
                    desc: 'comment for user',
                    itera: true,
                    constraints: ['NotNull', 'NotEmpty'],
                  },
                  {
                    key: 'CreatedDate',
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
      path_variable: [
        {
          key: 'userid',
          type: 'String',
          desc: 'for login',
          constraints: ['NotNull'],
          value: null,
        },
        {
          key: 'userid',
          type: 'String',
          desc: 'for login',
          constraints: ['NotNull'],
          value: null,
        },
      ],
      params: [
        {
          key: 'age',
          type: 'int',
          desc: 'user age',
          constraints: ['NotNull'],
          value: null,
        },
      ],
    },
  });

  const methods = useForm<LoadForm>();
  const { control } = methods;
  return (
    <>
      Request
      <FormProvider {...methods}>
        <div className="flex flex-col justify-center gap-3 ">
          <PathVarsFields data={data} control={control} />
          <div className="">Request Per Second</div>
          <div>Duration</div>
        </div>
        <div className="flex justify-end">
          <Button className="w-6">실행</Button>
        </div>
      </FormProvider>
    </>
  );
};

function PathVarsFields({ control, data }: { control: any; data: any }) {
  const { dark: isDark } = useStoreSelector((state) => state.dark);

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
    fields: pathVarsFields,
    append,
    remove,
  } = useFieldArray({
    name: `request.pathVars`,
    control,
  });

  return (
    <>
      <div>
        <ToggleableHeader
          title="path variables"
          isOpen={isOpen}
          setIsOpen={setisOpen}
        />
        {isOpen &&
          data.request.path_variable?.map((item: any, index: number) => (
            <>
              <div key={item.id} className={`${styles['innerBox']}`}>
                <div className={`${styles['key']}`}>{item.key}</div>
                <div className={`${styles['type']}`}>{item.type}</div>
                <div className={`${styles['desc']}`}>{item.desc}</div>
              </div>
              <div className={`${styles['constraints']}`}>
                {item.constraints}
              </div>
              <div className={`${styles['constraints']}`}>{item.value}</div>
            </>
          ))}
      </div>
    </>
  );
}

export default RequestForm;
