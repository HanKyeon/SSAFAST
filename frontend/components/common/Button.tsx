import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: `small` | 'full';
  isEmpty?: boolean;
  btnType?: string;
  className?: string;
}

const Button = function ({
  variant = 'small',
  isEmpty = false,
  btnType,
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    small: `${
      isDark && !isEmpty
        ? 'bg-mincho-strong text-white py-2 px-7 rounded-[20px]'
        : isDark && isEmpty
        ? 'border-mincho-strong text-mincho-strong py-2 px-7 border-[3px] rounded-[20px]'
        : !isDark && !isEmpty
        ? 'bg-taro-strong text-white py-2 px-7 rounded-[20px]'
        : 'border-taro-strong text-taro-strong py-2 px-7 border-[3px] rounded-[20px]'
    }`,
    full: `${
      isDark
        ? 'bg-mincho-strong text-white py-4 px-7 rounded-[13px] w-full'
        : 'bg-taro-strong text-white py-4 px-7 rounded-[13px] w-full'
    }`,
  };

  return (
    <button
      className={`${className} ${
        styles[`${variant}`]
      } min-w-[110px] duration-[0.33s]`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
