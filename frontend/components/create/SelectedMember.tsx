import { RiDeleteBinFill } from 'react-icons/ri';

interface Props {
  member: {
    id: number | string;
    memberProfileImg: string;
    memberName: string;
  };
}

const SelectedMember = function ({ member }: Props) {
  return (
    <div className="w-full h-[80px] flex flex-row bg-theme-white-normal bg-opacity-50 rounded-[8px] gap-2 p-2 items-center">
      <img
        src={member.memberProfileImg}
        alt="p"
        className="h-full w-[22%] object-contain rounded-full"
      />
      <div className="whitespace-nowrap text-ellipsis w-full h-full">
        {member.memberName}
      </div>
      <RiDeleteBinFill className="h-[45px] w-[45px] cursor-pointer duration-[0.33s]" />
    </div>
  );
};

export default SelectedMember;
