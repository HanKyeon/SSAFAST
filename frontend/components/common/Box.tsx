import { PropsWithChildren, FC, AllHTMLAttributes } from 'react';

interface BoxProps extends AllHTMLAttributes<HTMLDivElement> {
  themeType?: `dark` | `light`;
  className?: string;
}

const Box = function ({
  themeType,
  children,
  className,
  ...rest
}: PropsWithChildren<BoxProps>) {
  return (
    <div className={`${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Box;
