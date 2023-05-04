import { useStoreSelector } from '@/hooks/useStore';

interface InputPropsType {
  className?: string;
}

const Input = function ({ className }: InputPropsType): JSX.Element {
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
      type="text"
      title="value"
      placeholder="value"
      className={`${className} ${styles['input']}`}
    />
  );
};

export default Input;
