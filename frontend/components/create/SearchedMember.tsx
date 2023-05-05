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

const SearchedMember = function ({ member, addHandler, selected }: Props) {
  const onClickHandler = function () {
    addHandler(member);
  };
  return (
    <div className="w-full h-[80px] flex flex-row bg-theme-white-normal bg-opacity-50 rounded-[8px] gap-2 p-2 items-center">
      <img
        src={member.profileImg}
        alt="p"
        className="h-full w-[22%] object-contain rounded-full"
      />
      <div className="whitespace-nowrap text-ellipsis w-full h-full">
        {member.name}
      </div>
      <IoPersonAddSharp
        onClick={onClickHandler}
        className="h-[45px] w-[45px] cursor-pointer duration-[0.33s]"
      />
    </div>
  );
};

export default SearchedMember;
