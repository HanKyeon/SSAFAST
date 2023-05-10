import { useState } from 'react';
import { BodyType, FieldsType } from '.';
import ToggleableHeader from './ToggleableHeader';
import ReqItemInner from './ReqItemInner';
import { useObjToArr } from '@/hooks/useObjToArr';

export type DtoInfoType = {
  id: string | number;
  workspace_id?: string | number;
  name: string;
  description: string;
  has_parent?: string | number;
  has_child?: string | number;
};

export type RefinedDtosType = {
  dtoID: string | number;
  dtoInfo: DtoInfoType;
  nestedDtos: {
    fields: FieldsType[];
    nestedDtos?: RefinedDtosType[];
  };
};

export type ReqItemBodyPropsType = {
  name: string;
  item: BodyType;
};

const ReqItemBody = function ({
  name,
  item,
}: ReqItemBodyPropsType): JSX.Element {
  const refinedDtos = useObjToArr(item);
  const [isOpen, setisOpen] = useState<boolean>(true);
  const styles = {
    wrapper: `overflow-hidden mt-0 mx-auto text-content`,
  };

  return (
    <div className={`w-full`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {/* {isOpen && ( */}
      <div
        className={`${styles['wrapper']} rounded-[13px] w-[87%] ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {item.fields?.map((item: any) => (
          <ReqItemInner
            key={item.key}
            item={item}
            depth={0}
            className={`mb-3 rounded-[13px]`}
          />
        ))}
        {refinedDtos?.map((item: any) => (
          <>
            <ReqItemInner
              key={item.dtoID}
              item={item.dtoInfo}
              depth={0}
              className={`rounded-[13px]`}
            />
            <div
              className={`${styles['wrapper']} rounded-b-[13px] mb-3 w-[95%]`}
            >
              {item.nestedDtos.fields?.map((item: any) => (
                <ReqItemInner
                  key={item.key}
                  item={item}
                  depth={1}
                  className={`last:rounded-b-[13px]`}
                />
              ))}
              {item.nestedDtos.nestedDtos?.map((item: any) => (
                <>
                  <ReqItemInner
                    key={item.dtoID}
                    item={item.dtoInfo}
                    depth={1}
                    className={`rounded-[13px]`}
                  />
                  <div className={`${styles['wrapper']} w-[95%]`}>
                    {item.nestedDtos.fields?.map((item: any) => (
                      <ReqItemInner
                        key={item.key}
                        item={item}
                        depth={2}
                        className={`last:rounded-b-[13px]`}
                      />
                    ))}
                  </div>
                </>
              ))}
            </div>
          </>
        ))}
      </div>
      {/* )} */}
    </div>
  );
};

export default ReqItemBody;
