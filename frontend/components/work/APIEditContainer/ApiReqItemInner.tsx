import { useStoreSelector } from '@/hooks/useStore';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';

import Input from '@/components/common/Input';

import { Controller } from 'react-hook-form';
import { FieldsType, HeadersType } from '../APIDocsContainer';
import { DtoInfoType } from '../APIDocsContainer/ReqItemBody';
import { Select } from '@/components/common';

interface ReqItemInnerPropsType {
  item: any; // HeadersType | FieldsType | DtoInfoType;
  className?: string;
  depth?: 0 | 1 | 2;
  control?: any;
  name?: string;
  field?: any;
  formName?: string;
}

const ApiReqItemInner = function ({
  name,
  control,
  item,
  className,
  depth = 0,
  field,
  formName,
}: ReqItemInnerPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    innerBox: `w-5/6 h-auto flex items-center overflow-hidden relative rounded-[13px] ${
      depth === 0
        ? isDark
          ? 'bg-grayscale-deepdark text-white'
          : 'bg-grayscale-light text-black'
        : depth === 1
        ? isDark
          ? 'bg-grayscale-deepdarkdeep'
          : 'bg-grayscale-deeplight'
        : isDark
        ? 'bg-grayscale-deepdarkdeepdeep'
        : 'bg-grayscale-dark'
    }`,
    key: `py-[8px] px-3 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    } ${
      depth === 0
        ? 'w-1/6'
        : depth === 1
        ? 'w-[calc(150px-(100%-95%)/2-0.5px)]'
        : 'w-[calc(150px-(100%-95%)-2px)]'
    }`,
    type: `py-[8px] px-3 w-1/6 border-x-[1px] ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    desc: `py-[8px] px-3 flex-1 min-w-0 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
  };
  return (
    <>
      {item && (
        <div className={`${styles['innerBox']} ${className}`}>
          <div className={`${styles['key']}`}>
            {'key' in item && (
              <Controller
                key={`${item.id}-${formName}-key`}
                name={`${formName}.key`}
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    key={`${item.id}-${formName}-key`}
                    name={`${formName}.key`}
                    value={field.value}
                    onChange={field.onChange}
                    className={`w-full`}
                    placeholder="key"
                  />
                )}
              />
            )}
          </div>
          <div className={`${styles['type']}`}>
            {'type' in item && (
              <Controller
                key={`${item.id}-${formName}-type`}
                name={`${formName}.type`}
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    key={`${item.id}-${formName}-type`}
                    name={`${formName}.type`}
                    value={field.value}
                    onChange={field.onChange}
                    className={`w-full`}
                    placeholder="type"
                  />
                )}
              />
            )}
          </div>
          <div className={`${styles['desc']}`}>
            {'desc' in item && (
              <Controller
                key={`${item.id}-${formName}-desc`}
                name={`${formName}.desc`}
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    key={`${item.id}-${formName}-desc`}
                    name={`${formName}.desc`}
                    value={field.value}
                    onChange={field.onChange}
                    className={`w-full`}
                    placeholder="description"
                  />
                )}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApiReqItemInner;
