import MethodBadge, { MethodBadgePropsType } from './MethodBadge';
import StatusBadge, { StatusBadgePropsType } from './StatusBadge';

interface APIlistItemPropsType
  extends MethodBadgePropsType,
    StatusBadgePropsType {
  desc: string;
  by?: any;
}

const APIlistItem = function ({
  method,
  desc,
  status,
  by,
}: APIlistItemPropsType): JSX.Element {
  return (
    <li className="flex items-center gap-3 h-[40px] min-h-[40px]">
      <MethodBadge className="" method={method} />
      <p className="flex-1 truncate hover:text-clip">{desc}</p>
      <StatusBadge className="w-[70px] text-center" status={status} />
      {by && <i>usericon</i>}
    </li>
  );
};

export default APIlistItem;
