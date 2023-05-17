import { SetStateAction } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CircleBtn } from '../../common';
import { useStoreSelector } from '@/hooks/useStore';

interface ToggleableHeaderPropsType {
  big?: boolean;
  title: string;
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  add?: boolean;
}

const ToggleableHeader = function ({
  big = false,
  title,
  isOpen,
  setIsOpen,
  add,
}: ToggleableHeaderPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    wrapper: `${
      big &&
      `flex justify-between items-center py-2 px-5 duration-[0.33s] cursor-pointer ${
        isOpen &&
        `sticky top-0 z-40 ${
          isDark ? `bg-theme-dark-normal` : `bg-theme-white-normal`
        } rounded-t-[13px] border-b-[1px] border-grayscale-dark`
      }`
    } ${!big && `flex items-center py-2 px-5 cursor-pointer`}`,
  };

  const onToggleOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`${styles['wrapper']}`} onClick={onToggleOpen}>
      <div className={`${!big && 'flex items-center w-[150px] mr-2'}`}>
        <span className={`${!big && 'flex-1 mr-2'} text-normal`}>{title}</span>
        {!big && add && <CircleBtn btnType="plus" small />}
      </div>
      {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
};

export default ToggleableHeader;
