import MethodBadge from '@/components/apis/MethodBadge';
import { useStoreSelector } from '@/hooks/useStore';
import { HiArrowLongDown } from 'react-icons/hi2';
import { UseTestApiCompactType } from './UseTestContainer';

type SideApiItemPropsType = {
  api: UseTestApiCompactType;
  onClickApi: () => void;
};

const SideApiItem = function ({
  api,
  onClickApi,
}: SideApiItemPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  return (
    <li onClick={onClickApi}>
      <div
        className={`flex items-center gap-4 px-1 py-[10px] rounded-[8px] cursor-pointer ${
          isDark
            ? 'hover:bg-grayscale-deepdarkdeep'
            : 'hover:bg-grayscale-light'
        }`}
      >
        <MethodBadge method={api.method} small />
        <p className={`flex-1 text-content`}>{api.name}</p>
        <span
          className={`text-small w-[60px] text-center ${
            api.status === 1
              ? 'text-green-500'
              : api.status === 2
              ? 'text-red-500'
              : 'text-theme-white-light'
          }`}
        >
          {api.status === 1 ? 'Success' : api.status === 2 ? 'Fail' : '-'}
        </span>
      </div>
      <HiArrowLongDown className={`mx-auto my-2`} />
    </li>
  );
};

export default SideApiItem;
