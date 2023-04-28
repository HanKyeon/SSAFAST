import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';
import { RxQuestionMark } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'question' | 'plus';
  isEmpty?: boolean;
  gray?: boolean;
  className?: string;
}

const CircleBtn = function ({
  btnType = 'question',
  isEmpty = false,
  gray = false,
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
        ? ' bg-grayscale-deepdark text-theme-white-strong text-[16px]'
        : isDark
        ? 'bg-taro-strong text-theme-white-strong text-[16px]'
        : 'bg-mincho-strong text-theme-white-strong text-[16px]'
    }`,
  };

  return (
    <button
      className={`${className} ${
        styles[`${btnType}`]
      } inline-flex justify-center items-center rounded-full duration-[0.33s] w-7 h-7`}
      {...rest}
    >
      {btnType === 'question' ? <RxQuestionMark /> : <AiOutlinePlus />}
    </button>
  );
};

export default CircleBtn;
