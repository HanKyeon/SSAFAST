import { useStoreSelector } from '@/hooks/useStore';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';

import Input from '@/components/common/Input';
import { Controller } from 'react-hook-form';
import { BodyType, FieldsType, HeadersType } from '../../APIDocsContainer';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UCContext, UCContextInterface } from '.';
import {
  ApiDetailAtTestDtoInfo,
  ApiDetailAtTestItem,
} from '@/hooks/queries/queries';

const typeList = [
  '',
  'String',
  'Integer',
  'Long',
  'Float',
  'Double',
  'Boolean',
  'MultipartFile',
  'Date',
  'LocalDateTime',
];

interface UCReqItemInnerPropsType {
  item:
    | HeadersType
    | FieldsType
    | BodyType
    | ApiDetailAtTestItem
    | ApiDetailAtTestDtoInfo;
  className?: string;
  depth?: 0 | 1 | 2;
  control?: any;
  name?: string;
  field?: any;
  formName: string;
}

const UCReqItemInner = function ({
  name,
  control,
  item,
  className,
  depth = 0,
  field,
  formName,
}: UCReqItemInnerPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const [mapped, setMapped] = useState<boolean>(false);
  const [mappedResName, setMappedResName] = useState<string>();

  const {
    contextFormName,
    setContextFormName,
    contextResName,
    setContextResName,
    contextMapped,
    setContextMapped,
  } = useContext<UCContextInterface>(UCContext);

  const styles = {
    innerBox: `w-full h-auto flex items-center overflow-hidden relative ${
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
        ? 'min-w-[110px]'
        : depth === 1
        ? 'w-[calc(150px-(100%-95%)/2-0.5px)]'
        : 'w-[calc(150px-(100%-95%)-2px)]'
    }`,
    type: `py-[8px] px-3 min-w-[110px] border-x-[1px] ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    desc: `py-[8px] px-3 flex-1 min-w-0 flex items-center gap-2 rounded-[13px] duration-[0.33s] absolute top-0 left-0 z-10 w-[140px] opacity-0 hover:w-full hover:opacity-100 ${
      depth === 0
        ? isDark
          ? `bg-grayscale-deepdark`
          : `bg-grayscale-light`
        : depth === 1
        ? isDark
          ? `bg-grayscale-deepdarkdeep`
          : `bg-grayscale-deeplight`
        : isDark
        ? 'bg-grayscale-deepdarkdeepdeep'
        : 'bg-grayscale-dark'
    } ${isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`}`,
    descIcon: `text-normal ${
      isDark ? `text-grayscale-dark` : `text-grayscale-deeplightlight`
    }`,
    mapped: `py-[8px] px-3 flex-1 min-w-0 ${
      isDark ? `text-mincho-normal` : `text-taro-normal`
    }`,
    selectBtn: `cursor-pointer rounded-b-[8px] px-4 py-1 active:bg-grayscale-deepdarkdeep bg-grayscale-deepdarklight`,
    value: `py-[8px] px-3 flex-1 min-w-0 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
  };

  const onClickMappingBtn = (): void => {
    setMapped(true);
    setContextFormName(formName);
    console.log(
      'formName 담았거든??',
      'contextFormName:',
      contextFormName,
      'contextResName:',
      contextResName
    );
  };
  const onClickSelfTyping = (): void => {
    setMapped(false);
  };
  // console.log('>>>>>>>>>>>>', item);

  useEffect(() => {
    if (contextResName && contextFormName && formName === contextFormName) {
      setMappedResName(contextResName);
      console.log('mapping 완료!!!', contextResName);
      setContextMapped(false);
      // setContextFormName(null);
      // // setContextResName(null);
      // setContextMapped(false);
    }
  }, [contextFormName, contextResName]);

  useEffect(() => {
    if (!contextMapped) {
      setContextResName(null);
    }
  }, [contextMapped]);
  return (
    <>
      {item && (
        <>
          <div className={`${styles['innerBox']} ${className}`}>
            <div className={`${styles['key']}`}>
              <div>{item.keyName ? item.keyName : (item as BodyType).name}</div>
              <div className={`${styles['desc']}`}>
                <i>
                  <HiChatBubbleBottomCenterText
                    className={`${styles['descIcon']}`}
                  />
                </i>
                <p className={`truncate text-ellipsis`}>{item.desc}</p>
              </div>
            </div>
            <div className={`${styles['type']}`}>
              {'type' in item
                ? typeList[(item as FieldsType | HeadersType).type as number]
                : item.name}
            </div>
            {mapped ? (
              <div className={`${styles['mapped']}`}>{mappedResName}</div>
            ) : (
              <div className={`${styles['value']}`}>
                <Controller
                  name={`${formName}.value`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      name={`${formName}.value`}
                      value={field.value}
                      onChange={field.onChange}
                      className={`w-full`}
                      placeholder="value"
                    />
                  )}
                />
              </div>
            )}
            {/* 아래는 화면에서 숨길 부분 */}
            <div>
              <Controller
                name={`${formName}.type`}
                control={control}
                defaultValue={`${'type' in item && item.type}`}
                render={({ field, fieldState }) => (
                  <Input
                    name={`${formName}.type`}
                    value={field.value}
                    onChange={field.onChange}
                    className={`w-full`}
                    placeholder="value"
                    type="hidden"
                  />
                )}
              />
              <Controller
                name={`${formName}.desc`}
                control={control}
                defaultValue={`${item.desc}`}
                render={({ field, fieldState }) => (
                  <Input
                    name={`${formName}.desc`}
                    value={field.value}
                    onChange={field.onChange}
                    className={`w-full`}
                    placeholder="value"
                    type="hidden"
                  />
                )}
              />
              {/* {mapped ? (
                <Controller
                  name={`${formName}.mapped`}
                  control={control}
                  defaultValue={mapped}
                  render={({ field, fieldState }) => (
                    <Input
                      name={`${formName}.mapped`}
                      value={field.value}
                      onChange={field.onChange}
                      className={`w-full`}
                      placeholder="value"
                      type="hidden"
                    />
                  )}
                />
              ) : (
                <Controller
                  name={`${formName}.mapped`}
                  control={control}
                  defaultValue={!mapped}
                  render={({ field, fieldState }) => (
                    <Input
                      name={`${formName}.mapped`}
                      value={field.value}
                      onChange={field.onChange}
                      className={`w-full`}
                      placeholder="value"
                      type="hidden"
                    />
                  )}
                />
              )} */}
              {'constraints' in item && (
                <Controller
                  name={`${formName}.constraints`}
                  control={control}
                  defaultValue={item.constraints}
                  render={({ field, fieldState }) => (
                    <Input
                      name={`${formName}.constraints`}
                      value={field.value}
                      onChange={field.onChange}
                      className={`w-full`}
                      placeholder="value"
                      type="hidden"
                    />
                  )}
                />
              )}
              {'itera' in item && (
                <Controller
                  name={`${formName}.constraints`}
                  control={control}
                  defaultValue={item.itera}
                  render={({ field, fieldState }) => (
                    <Input
                      name={`${formName}.constraints`}
                      value={field.value}
                      onChange={field.onChange}
                      className={`w-full`}
                      placeholder="value"
                      type="hidden"
                    />
                  )}
                />
              )}
            </div>
          </div>
          <div className={`flex gap-2 justify-between text-center`}>
            <div
              onClick={onClickMappingBtn}
              className={`flex-1 text-milktea-strong ${styles['selectBtn']}`}
            >
              response에서 선택
            </div>
            <div
              onClick={onClickSelfTyping}
              className={`text-grayscale-deeplight ${styles['selectBtn']}`}
            >
              직접 입력
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UCReqItemInner;
