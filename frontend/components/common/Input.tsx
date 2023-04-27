import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, AllHTMLAttributes } from 'react';

interface InputProps extends AllHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = function ({
  children,
  className,
  ...rest
}: PropsWithChildren<InputProps>) {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    one: `${
      isDark
        ? 'bg-theme-dark-strong text-white'
        : 'bg-theme-white-strong text-black'
    }`,
    two: `${
      isDark
        ? 'bg-theme-dark-normal text-white'
        : 'bg-theme-white-normal text-black'
    }`,
    three: `${
      isDark
        ? 'bg-theme-dark-light text-white'
        : 'bg-theme-white-light text-black'
    }`,
  };

  return (
    <input className={`${className}`} {...rest}>
      {children}
    </input>
  );
};

export default Input;
