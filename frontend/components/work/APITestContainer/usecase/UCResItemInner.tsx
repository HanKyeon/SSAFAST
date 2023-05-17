import { ApiDetailAtTestItem } from '@/hooks/queries/queries';
import { useContext, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { UCContext, UCContextInterface } from '.';
import { Box, Input } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';

type UCResInnerPropsType = {
  item: ApiDetailAtTestItem;
  //   control: Control<UsecaseDetailType, any>;
  control: any;
  formName: string;
  depth?: number;
};

const UCResItemInner = function ({
  item,
  control,
  formName,
  depth = 0,
}: UCResInnerPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const { contextFormName, setContextFormName } =
    useContext<UCContextInterface>(UCContext);
  const [mappedFormName, setMappedFormName] = useState<string>();
  const [mapped, setMapped] = useState<boolean>(false);

  const onClickResItem = (): void => {
    console.log('안뿡');
    if (contextFormName) {
      setMappedFormName(contextFormName);
      console.log('뿡!', contextFormName);
      setMapped(true);
    }
  };

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
      'w-[50%]'
      // depth === 0
      //   ? 'w-[50%]'
      //   : depth === 1
      //   ? 'w-[calc(150px-(100%-95%)/2-0.5px)]'
      //   : 'w-[calc(150px-(100%-95%)-2px)]'
    }`,
    type: `py-[8px] px-3 w-[50%] border-x-[1px] ${
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
    value: `py-[8px] px-3 flex-1 min-w-0 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
  };

  return (
    <>
      <div
        onClick={onClickResItem}
        className={`${styles['innerBox']} flex gap-3`}
      >
        <div className={`${styles['key']}`}>{item.keyName}</div>
        <div className={`${styles['type']}`}>{item.type}</div>
        {/* <div className={`${styles['desc']}`}>{item.desc}</div> */}
      </div>
      {mapped && (
        <Controller
          name={`${mappedFormName}.value`}
          control={control}
          defaultValue={formName}
          render={({ field, fieldState }) => {
            return (
              <Input
                name={`${mappedFormName}.value`}
                value={field.value}
                onChange={field.onChange}
                className={`w-full`}
                placeholder="value"
              />
            );
          }}
        />
      )}
    </>
  );
};

export default UCResItemInner;
