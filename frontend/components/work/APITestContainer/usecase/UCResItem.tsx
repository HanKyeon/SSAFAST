import { useEffect, useMemo, useState } from 'react';
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFormContext,
} from 'react-hook-form';
import styles from '../../APIDocsContainer/ReqItem.module.css';
import ToggleableHeader from '../../APIDocsContainer/ToggleableHeader';
import ReqItemInner from '../../APIDocsContainer/ReqItemInner';
import { FieldsType, HeadersType } from '../../APIDocsContainer';
import { ApiDetailAtTestItem, PrevResponse } from '@/hooks/queries/queries';
import { UseTestForm } from './UseTestContainer';
import UCResItemInner from './UCResItemInner';

type ResItemPropsType = {
  //   fields?: FieldArrayWithId[]; // 잠깐 ?넣어유,,
  //   formName?: string;
  //   control?: any;
  name: string;
  item: PrevResponse;
  control: Control<UseTestForm, any>;
  formName: string;
};
const UCResItem = function ({
  //   fields,
  //   formName,
  //   control,
  name, // 그냥 이름
  item, // item
  control,
  formName,
}: ResItemPropsType): JSX.Element {
  const [isOpen, setisOpen] = useState<boolean>(true);
  //   const a = item?.length + 1;
  const a = 1;

  const Styles = {
    style: `${
      isOpen ? `${styles['act']} ${styles[`slide`]}` : `${styles[`slide`]}`
    }`,
  };

  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
  };
  //   console.log('111111', formName, item);
  return (
    <div className={`${styles1[`style`]} w-full`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {item.headers && (
        <div className={`w-full`}>
          <p>headers</p>
          {item.headers.map((headerItem: ApiDetailAtTestItem, idx: number) => (
            <UCResItemInner
              key={`${headerItem.keyName}_${idx}`}
              item={headerItem}
              control={control}
              formName={`${formName}.headers.${headerItem.keyName}`}
            />
          ))}
        </div>
      )}

      {/* {item.body && (
        <div className={`w-full`}>
          <p>headers</p>
          {item.body.map((bodyItem: ApiDetailAtTestItem, idx: number) => (
            <UCResInner key={`${bodyItem.keyName}_${idx}`} />
          ))}
        </div>
      )} */}
      {/* <div className={`${Styles['style']}`}>
        {(item as HeadersType[] | FieldsType[])?.map((item, idx) => (
          <Controller
            key={`${Math.random()}`} // fields[idx].id
            name={`${formName}.${item.keyName}`}
            control={control}
            render={({ field }) => {
              return (
                <div
                  key={item.keyName}
                  className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content duration-[0.33s]`}
                >
                  <ReqItemInner
                    formName={`${formName}.${item.keyName}`}
                    field={field}
                    item={item}
                    control={control}
                    name={name}
                  />
                </div>
              );
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default UCResItem;
