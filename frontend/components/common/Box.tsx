import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, AllHTMLAttributes } from 'react';

interface BoxProps extends AllHTMLAttributes<HTMLDivElement> {
  variant?: `one` | `two` | `three`;
  fontType?: `normal` | `header` | `content`;
  className?: string;
}

const Box = function ({
  variant = 'two',
  fontType = `normal`,
  children,
  className,
  ...rest
}: PropsWithChildren<BoxProps>) {
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
  const fontStyle = {
    normal: `${'text-4xl'}`,
    header: `${'text-5xl'}`,
    content: `${'text-sm'}`,
  };

  return (
    <div
      className={`${className} ${styles[`${variant}`]} ${
        fontStyle[`${fontType}`]
      } rounded-[13px]`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
