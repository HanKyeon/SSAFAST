import { useStoreSelector } from '@/hooks/useStore';
import { RiDeleteBinFill } from 'react-icons/ri';

interface Props {
  member: {
    id: number | string;
    profileImg: string;
    name: string;
  };
  addHandler: Function;
}

const ldStyle = (dark: boolean) =>
  `${dark ? 'border-theme-white-light' : 'border-theme-dark-light'}` as string;

const SelectedMember = function ({ member, addHandler }: Props) {
  const onClickHandler = function () {
    addHandler(member);
  };
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <div
      className={`border-[3px] box-border w-full h-[60px] flex flex-row bg-theme-white-normal bg-opacity-50 rounded-[8px] gap-2 p-2 items-center duration-[0.33s] ${ldStyle(
        dark
      )} `}
    >
      <img
        src={member.profileImg}
        alt="p"
        className="h-[50px] w-[50px] object-contain rounded-full"
      />
      <div className="whitespace-nowrap text-ellipsis w-full h-full overflow-hidden text-[16px] flex items-center">
        {member.name}
      </div>
      <RiDeleteBinFill
        onClick={onClickHandler}
        className="h-[50px] w-[50px] cursor-pointer duration-[0.22s] p-[6px]"
      />
    </div>
  );
};

export default SelectedMember;
