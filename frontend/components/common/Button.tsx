import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: `small` | 'full';
  isEmpty?: boolean;
  // btnType?: string;
  className?: string;
}

const Button = function ({
  variant = 'small',
  isEmpty = false,
  // btnType,
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    small: `py-2 px-7 rounded-[20px] ${
      isDark && !isEmpty
        ? 'bg-mincho-strong text-theme-white-strong border-mincho-strong border-[3px]'
        : isDark && isEmpty
        ? 'border-mincho-strong text-mincho-strong border-[3px]'
        : !isDark && !isEmpty
        ? 'bg-taro-strong text-theme-white-strong border-taro-strong border-[3px]'
        : 'border-taro-strong text-taro-strong border-[3px]'
    }`,
    full: `text-theme-white-strong py-4 px-7 rounded-[13px] w-full ${
      isDark ? 'bg-mincho-strong' : 'bg-taro-strong'
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
