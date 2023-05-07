import { useStoreSelector } from '@/hooks/useStore';
import { IoPersonAddSharp } from 'react-icons/io5';

interface Props {
  member: {
    id: number | string;
    name: string;
    profileImg: string;
  };
  addHandler: Function;
  selected: boolean;
}

const selectedStyleBox = (selected: boolean, dark: boolean) =>
  `${
    !selected
      ? `${dark ? 'border-theme-white-light' : 'border-theme-dark-light'}`
      : dark
      ? 'border-mincho-strong text-mincho-strong'
      : 'border-taro-strong text-taro-strong'
  }` as string;

const SearchedMember = function ({ member, addHandler, selected }: Props) {
  const onClickHandler = function () {
    addHandler(member);
  };
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <div
      className={`border-[3px] box-border w-full h-[60px] flex flex-row bg-theme-white-normal bg-opacity-50 rounded-[8px] gap-2 p-2 items-center duration-[0.33s] ${selectedStyleBox(
        selected,
        dark
      )} `}
    >
      <img
        src={member.profileImg}
        alt="p"
        className="h-[50px] w-[50px] object-contain rounded-full p-[6px]"
      />
      <div
        title={member.name}
        className="whitespace-nowrap text-ellipsis w-full h-full overflow-hidden text-[16px] flex items-center"
      >
        {member.name}
      </div>
      <IoPersonAddSharp
        onClick={onClickHandler}
        className="h-[50px] w-[50px] cursor-pointer duration-[0.22s] p-[6px]"
      />
    </div>
  );
};

export default SearchedMember;
