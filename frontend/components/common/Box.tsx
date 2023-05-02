import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, AllHTMLAttributes } from 'react';

interface BoxProps extends AllHTMLAttributes<HTMLDivElement> {
  variant?: `one` | `two` | `three`;
  fontType?: `megaheader` | `header` | `normal` | `content`;
  className?: string;
}

const Box = function ({
  variant = 'two',
  fontType = `normal`,
  children,
  className = ``,
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
    megaheader: `text-megaheader`,
    header: `text-header`,
    normal: `text-normal`,
    content: `text-content`,
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
