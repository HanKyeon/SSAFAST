import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, InputHTMLAttributes, RefObject } from 'react';

interface InputPropsType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputref?: RefObject<HTMLInputElement>;
}

const Input = function ({
  className,
  inputref,
  ...rest
}: PropsWithChildren<InputPropsType>): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    input: `bg-transparent border-b-[1px] outline-none ${
      isDark
        ? `border-theme-white-normal placeholder:text-grayscale-deepdarklight`
        : `border-theme-dark-normal placeholder:text-grayscale-dark`
    }`,
  };
  return (
    <input
      // type={rest.type}
      // title="value"
      // placeholder="value"
      ref={inputref}
      className={`${className} ${styles['input']}`}
      {...rest}
    />
  );
};

export default Input;
