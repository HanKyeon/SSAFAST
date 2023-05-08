import UserBadge from '../common/UserBadge';
import { APIInfoType, APIWritterType } from '../work/APIEditContainer/APIList';
import MethodBadge, { MethodBadgePropsType } from './MethodBadge';
import StatusBadge, { StatusBadgePropsType } from './StatusBadge';

interface APIlistItemPropsType {
  item: APIInfoType;
  className?: string;
  writter?: boolean;
}

const APIlistItem = function ({
  item,
  className,
  writter = true,
}: APIlistItemPropsType): JSX.Element {
  const onClickApiItem = (apiID: string | number): void => {
    console.log(`${apiID}번 api : api 하나 dispatch!??`);
  };

  return (
    <li
      onClick={onClickApiItem && (() => onClickApiItem(item.id))}
      className={`${className} flex items-center gap-3 h-[40px] min-h-[40px]`}
    >
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
