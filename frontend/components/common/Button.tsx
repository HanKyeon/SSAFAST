import { PropsWithChildren, FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: string;
  className?: string;
}

const Button = function ({
  btnType,
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={`${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
