import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';
import { RxQuestionMark } from 'react-icons/rx';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'question' | 'plus' | 'delete';
  isEmpty?: boolean;
  gray?: boolean;
  small?: boolean;
  className?: string;
}

const CircleBtn = function ({
  btnType = 'question',
  isEmpty = false,
  gray = false,
  small = false,
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    question: `${
      gray
        ? ' bg-grayscale-deepdark text-theme-white-strong'
        : isDark && !isEmpty
        ? 'bg-mincho-strong text-theme-white-strong'
        : !isDark && !isEmpty
        ? 'bg-taro-strong text-theme-white-strong'
        : 'text-grayscale-dark border-grayscale-dark border-[2px]'
    }`,
    plus: `${
      gray
        ? ' bg-grayscale-deepdark text-theme-white-strong'
        : isDark
        ? 'bg-taro-strong text-theme-white-strong'
        : 'bg-mincho-strong text-theme-white-strong'
    }`,
    delete: `${
      isDark
        ? `bg-grayscale-deepdark text-theme-white-strong`
        : `bg-theme-white-light text-theme-dark-strong`
    }`,
  };

  return (
    <button
      className={`${className} ${
        styles[`${btnType}`]
      } inline-flex justify-center items-center rounded-full duration-[0.33s] ${
        small ? 'w-5 h-5 text-[14px]' : 'w-7 h-7 text-[16px]'
      }`}
      {...rest}
    >
      {btnType === 'question' ? (
        <RxQuestionMark />
      ) : btnType === 'plus' ? (
        <AiOutlinePlus />
      ) : (
        <AiOutlineClose />
      )}
    </button>
  );
};

export default CircleBtn;
