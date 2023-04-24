import { FC, PropsWithChildren, memo, DOMAttributes } from 'react';
import { useAnimate } from '../../hooks/useAnimate';

interface AnimateBoxProps extends DOMAttributes<HTMLDivElement> {
  isOpened?: boolean;
  appearClassName?: string;
  disappearClassName?: string;
  className?: string;
}

// interface TestProps extends DOMAttributes<AnimateBoxProps> {}

const AnimationBox: FC<PropsWithChildren<AnimateBoxProps>> = function ({
  isOpened = true,
  children,
  appearClassName,
  disappearClassName,
  className,
  ...rest
}) {
  const { isRender, animationClasses, animationEndHandler } = useAnimate(
    isOpened,
    appearClassName,
    disappearClassName
  );
  return (
    <>
      {isRender && (
        <div
          className={`${animationClasses} ${className}`}
          {...rest}
          onAnimationEnd={animationEndHandler}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default memo(AnimationBox);
