import MethodBadge from '@/components/apis/MethodBadge';
import { useStoreSelector } from '@/hooks/useStore';
import { HiArrowLongDown } from 'react-icons/hi2';

const SideApiItem = function (): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  return (
    <li>
      <div
        className={`flex items-center gap-4 px-1 py-[10px] rounded-[8px] cursor-pointer ${
          isDark
            ? 'hover:bg-grayscale-deepdarkdeep'
            : 'hover:bg-grayscale-light'
        }`}
      >
        <MethodBadge method={1} small />
        <p className={`flex-1 text-content`}>회원가입</p>
        <span className={`text-small w-[60px] text-green-500`}>Success</span>
      </div>
      <HiArrowLongDown className={`mx-auto my-2`} />
    </li>
  );
};

export default SideApiItem;
