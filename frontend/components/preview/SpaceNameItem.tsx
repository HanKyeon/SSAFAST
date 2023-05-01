import Image from 'next/image';
import SpaceIcon from '/public/assets/images/Ggo.png';
import { TbSettingsFilled } from 'react-icons/tb';

interface SpaceNameItemPropsType {
  item: { id: number; name: string };
  curSpaceId: number;
  onClickSpaceItem: (id: number) => void;
}

const SpaceNameItem = function ({
  item,
  curSpaceId,
  onClickSpaceItem,
}: SpaceNameItemPropsType): JSX.Element {
  const styles = {
    itemWrapper: `w-full h-[50px] rounded-full p-[10px] inline-flex justify-between items-center cursor-pointer duration-[0.15s]`,
  };
  return (
    <li
      className={`${styles['itemWrapper']} ${
        curSpaceId === item.id
          ? 'bg-theme-white-strong text-theme-dark-strong'
          : 'bg-none text-theme-white-light'
      } ${curSpaceId !== item.id && 'hover:bg-theme-dark-light'}`}
      onClick={() => onClickSpaceItem(item.id)}
    >
      <div className="flex items-center">
        <i className="w-[30px] h-[30px] mr-2">
          <Image
            src={SpaceIcon}
            alt="space icon"
            className="h-full w-auto object-contain"
          />
        </i>
        <span>{item.name}</span>
      </div>
      {curSpaceId === item.id && (
        <TbSettingsFilled className=" text-[18px] text-gray-300 active:text-gray-500 hover:scale-[105%] duration-[0.33s] cursor-pointer" />
      )}
    </li>
  );
};

export default SpaceNameItem;
