import { useState } from 'react';
import { BodyType, FieldsType, HeadersType } from './ReqBox';
import ToggleableHeader from './ToggleableHeader';
import ReqItemInner from './ReqItemInner';

type ReqtemPropsType = {
  name: string;
  item: HeadersType[] | BodyType | FieldsType[];
};
const ReqItem = function ({ name, item }: ReqtemPropsType): JSX.Element {
  const [isOpen, setisOpen] = useState<boolean>(true);
  return (
    <div className={`w-full duratoin-[0.33s]`}>
      <ToggleableHeader title={name} isOpen={isOpen} setIsOpen={setisOpen} />
      {isOpen &&
        (item as HeadersType[] | FieldsType[])?.map((item) => (
          <div
            key={item.key}
            className={`w-[87%] rounded-[13px] overflow-hidden mt-0 mb-3 mx-auto text-content`}
          >
            <ReqItemInner item={item} />
          </div>
        ))}
    </div>
  );
};

export default ReqItem;
