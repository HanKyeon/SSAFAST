import { useStoreSelector } from '@/hooks/useStore';
import { PropsWithChildren, FC, InputHTMLAttributes, RefObject } from 'react';

interface InputPropsType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputref?: RefObject<HTMLInputElement>;
  name?: string;
}

const Input = function ({
  className,
  inputref,
  name,
  ...rest
}: PropsWithChildren<InputPropsType>): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    input: `bg-transparent border-b-[1px] outline-none w-full ${
      isDark
        ? `border-theme-white-normal placeholder:text-grayscale-deepdarklight`
        : `border-theme-dark-normal placeholder:text-grayscale-deepdarklight`
    }`,
  };
  return (
    <input
      // type="text"
      // title="value"
      // placeholder="value"
      name={name}
      ref={inputref}
      className={`${className} ${styles['input']}`}
      {...rest}
    />
  );
};

export default Input;
