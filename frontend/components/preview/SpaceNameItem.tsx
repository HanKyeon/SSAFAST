import Image from 'next/image';
import SpaceIcon from '/public/assets/images/Ggo.png';
import { IoMdSettings } from 'react-icons/io';

const SpaceNameItem = function (): JSX.Element {
  const styles = {
    itemWrapper:
      'w-full h-[50px] rounded-full p-[10px] bg-theme-white-strong inline-flex justify-between items-center',
  };
  return (
    <li className={`${styles['itemWrapper']}`}>
      <div className="flex">
        <i className="w-[30px] h-[30px] mr-2">
          <Image
            src={SpaceIcon}
            alt="space icon"
            className="h-full w-auto object-contain"
          />
        </i>
        <span className="text-theme-dark-strong">space 1</span>
      </div>
      <IoMdSettings className="text-grayscale-dark" />
    </li>
  );
};

export default SpaceNameItem;
