import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'question' | 'plus';
  isEmpty?: boolean;
  className?: string;
}

const CircleBtn = function ({
  btnType = 'question',
  isEmpty = false,
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    question: `${
      isDark && !isEmpty
        ? 'bg-mincho-strong text-white text-[16px] pt-1'
        : !isDark && !isEmpty
        ? 'bg-taro-strong text-white text-[16px] pt-1'
        : 'text-grayscale-dark border-grayscale-dark border-[2px] text-[16px] pt-1'
    }`,
    plus: `${
      isDark
        ? 'bg-taro-strong text-white text-[18px] pt-[1.5px] text-center'
        : 'bg-mincho-strong text-white text-[18px] pt-[1.5px] text-center'
    }`,
  };

  return (
    <button
      className={`${className} ${
        styles[`${btnType}`]
      } rounded-full duration-[0.33s] w-7 h-7`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CircleBtn;
