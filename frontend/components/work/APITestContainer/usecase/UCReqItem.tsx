import { useEffect, useMemo, useState } from 'react';
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form';
import styles from '../../APIDocsContainer/ReqItem.module.css';
import ToggleableHeader from '../../APIDocsContainer/ToggleableHeader';
import ReqItemInner from '../../APIDocsContainer/ReqItemInner';
import { FieldsType, HeadersType } from '../../APIDocsContainer';

type ReqtemPropsType = {
  fields?: FieldArrayWithId[]; // 잠깐 ?넣어유,,
  formName: string;
  control?: any;
  name: string;
  item: HeadersType[] | FieldsType[];
};
const UCReqItem = function ({
  fields,
  formName,
  name, // 그냥 이름
  item, // item
  control,
}: ReqtemPropsType): JSX.Element {
  const [isOpen, setisOpen] = useState<boolean>(true);
  const a = item?.length + 1;

  const Styles = {
    style: `${
      isOpen ? `${styles['act']} ${styles[`slide`]}` : `${styles[`slide`]}`
    }`,
  };

  const styles1 = {
    style: `${isOpen ? `h-[calc(${a}*43px)]` : 'h-[43px]'}`,
  };
  console.log('111111', formName, item);
  return (
    <div className={`${styles1[`style`]} w-full`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      <div className={`${Styles['style']}`}>
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
      </div>
    </div>
  );
};

export default UCReqItem;
