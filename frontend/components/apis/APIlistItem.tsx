import { useEffect, useMemo, useState } from 'react';
import CheckBox from '../common/CheckBox';
import UserBadge from '../common/UserBadge';
import {
  APIInfoType,
  APIListType,
  APIWritterType,
} from '../work/APIEditContainer/APIList';
import MethodBadge, { MethodBadgePropsType } from './MethodBadge';
import StatusBadge, { StatusBadgePropsType } from './StatusBadge';
import { useSectionsApi, useSpaceApis } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

interface APIlistItemPropsType {
  item: APIInfoType;
  className?: string;
  writter?: boolean;
  checkBox?: boolean;
  checked?: boolean;
  checkedList?: (string | number)[];
}

const APIlistItem = function ({
  item,
  className,
  writter = true,
  checkBox = false,
  checked = false,
}: APIlistItemPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onToggleCheck = (): void => {
    setIsChecked((prev) => !prev);
  };
  const onClickApiItem = (apiID: string | number): void => {
    console.log(`${apiID}번 api : api 하나 dispatch!??`);
  };
  // const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);
  // section Id 받아야함.
  // const {} = useSectionsApi(spaceId, sectionId, method, searchVal);

  // useEffect(() => {
  //   if (isChecked) {
  //     // 체크됐을 때
  //   } else {
  //     // 체크 해제됐을 때
  //   }
  // }, [isChecked]);

  // useEffect(() => {
  //   console.log('111', item);
  //   if (checkedAPIList && checkedAPIList.length > 0) {
  //     console.log('22222', item);
  //     checkedAPIList.map((cate) => {
  //       const temp = cate.apis.find((api) => api.id === item.id);
  //       setIsChecked(temp ? true : false);
  //       return temp;
  //     });
  //   }
  // }, []);

  return (
    <li
      onClick={onClickApiItem && (() => onClickApiItem(item.id))}
      className={`${className} flex items-center gap-3 h-[40px] min-h-[40px]`}
    >
      {checkBox && (
        <CheckBox isChecked={checked} onToggleCheck={onToggleCheck} />
      )}
      <MethodBadge className="" method={item.method} />
      <p className="text-content flex-1 truncate hover:text-clip">
        {item.name}
      </p>
      <StatusBadge className="w-[70px] text-center" status={item.status} />
      {writter && <UserBadge />}
    </li>
  );
};

export default APIlistItem;
