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
import {
  ApiDetailAtTestDtoInfo,
  ApiDetailAtTestItem,
  PrevResponse,
  UsecaseDetailType,
} from '@/hooks/queries/queries';
import UCResItemInner from './UCResItemInner';
import UCDto from './UCDto';

type ResItemPropsType = {
  name: string;
  item: ApiDetailAtTestItem[];
  control: Control<UsecaseDetailType, any>;
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
    title: `text-content px-7 text-grayscale-deeplight`,
  };

  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
  };
  //   console.log('111111', formName, item);
  return (
    <div className={`${styles1[`style`]} w-full`}>
      {item && item.length > 0 && (
        <div className={`w-full`}>
          <p className={`${Styles['title']}`}>{name}</p>
          {item.map((item: ApiDetailAtTestItem, idx: number) => (
            <div
              className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content duration-[0.33s]`}
              key={`${item.keyName}_${idx}`}
            >
              <UCResItemInner
                item={item}
                control={control}
                formName={`${formName}.${item.keyName}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UCResItem;
