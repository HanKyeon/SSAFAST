import { useState } from 'react';
import { MockupDataItemType } from './RequestBox';
import ToggleableHeader from '@/components/apis/ToggleableHeader';
import ObjItem from '@/components/apis/ObjItem';

type RequestItemPropsType = {
  name: string;
  item: MockupDataItemType[];
};

const RequestItem = function ({
  name,
  item,
}: RequestItemPropsType): JSX.Element {
  const [isOpenHeaders, setIsOpenHeaders] = useState<boolean>(true);

  return (
    <div className={`w-full`}>
      <ToggleableHeader
        title={name}
        isOpen={isOpenHeaders}
        setIsOpen={setIsOpenHeaders}
      />
      {isOpenHeaders && (
        <div className={`flex flex-col items-center gap-3 w-full`}>
          {item.map((item) => (
            <ObjItem key={item.key} item={item} className={`w-[87%] min-w-0`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestItem;
