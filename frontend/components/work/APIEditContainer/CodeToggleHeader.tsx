import { SetStateAction } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CircleBtn } from '../../common';
import { useStoreSelector } from '@/hooks/useStore';

interface ToggleableHeaderPropsType {
  big?: boolean;
  title: number;
  description: string;
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  add?: boolean;
}

const CodeToggleHeader = function ({
  big = false,
  title,
  description,
  isOpen,
  setIsOpen,
  add,
}: ToggleableHeaderPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    wrapper: `${
      big &&
      `flex justify-between items-center py-2 duration-[0.33s] cursor-pointer ${
        isOpen &&
        `sticky top-0 z-40 ${
          isDark ? `bg-theme-dark-normal` : `bg-theme-white-normal`
        } rounded-t-[13px] border-b-[1px] border-grayscale-dark`
      }`
    }`,
    text: `${isDark ? `text-mincho-strong` : `text-taro-strong`}`,
  };

  const onToggleOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles['wrapper']} flex items-center`}
      onClick={onToggleOpen}
    >
      <div className={`flex flex-col w-[90px] items-start `}>
        <div>
          <div
            className={`${styles['text']} font-extrabold text-2xl text-center`}
          >
            {title}
          </div>
          <div className={`text-grayscale-light text-sm text-center`}>
            {description}
          </div>
        </div>
      </div>
      {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
};

export default CodeToggleHeader;
