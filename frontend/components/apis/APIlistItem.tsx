import { useEffect, useMemo, useState } from 'react';
import CheckBox from '../common/CheckBox';
import UserBadge from '../common/UserBadge';
import MethodBadge, { MethodBadgePropsType } from './MethodBadge';
import StatusBadge, { StatusBadgePropsType } from './StatusBadge';
import {
  EachCateApi,
  useSectionsApi,
  useSpaceApis,
} from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

interface APIlistItemPropsType {
  item: EachCateApi;
  className?: string;
  writter?: boolean;
  checkBox?: boolean;
  checked?: boolean;
  // checkedList?: (string | number)[];
  onToggleCheck?: (apiId: number | string, check: boolean) => void;
  setSelectedIdHandler?: (id: number) => void;
}

const APIlistItem = function ({
  item,
  className,
  writter = true,
  checkBox = false,
  checked = false,
  onToggleCheck,
  setSelectedIdHandler,
}: APIlistItemPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;

  const onClickApiItem = (apiID: string | number): void => {
    if (!checkBox) {
      console.log(`${apiID}번 api : api 하나 dispatch!??`);
    }
    if (setSelectedIdHandler) {
      setSelectedIdHandler(item.id);
    }
  };
  // const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);
  // section Id 받아야함.
  // const {} = useSectionsApi(spaceId, sectionId, method, searchVal);

  const onClickCheckBox = () => {
    checked = !checked;
    if (checkBox && onToggleCheck) {
      // console.log('!!!!!!!!!!!!!!!!', checked);
      onToggleCheck(item.id, checked);
    }
  };

  return (
    <li
      onClick={onClickApiItem && (() => onClickApiItem(item.id))}
      className={`${className} flex items-center gap-3 h-[40px] min-h-[40px]`}
    >
      {checkBox && (
        <CheckBox isChecked={checked} onToggleCheck={onClickCheckBox} />
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
