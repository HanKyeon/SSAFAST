import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, SelectHTMLAttributes, RefObject } from 'react';

interface SelectPropsType extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  name?: string;
  selectRef?: RefObject<HTMLSelectElement>;
}

const Select = function ({
  className,
  children,
  selectRef,
  name,
  ...rest
}: PropsWithChildren<SelectPropsType>): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    select: `bg-transparent border-b-[1px] outline-none ${
      isDark
        ? `bg-transparent border-b-[3px] border-grayscale-light text-grayscale-light`
        : `bg-transparent border-b-[3px] border-grayscale-light text-grayscale-light`
    }`,
  };
  return (
    <select
      name={name}
      ref={selectRef}
      className={`${className} ${styles['select']}`}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
