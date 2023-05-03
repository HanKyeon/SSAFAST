interface BoxHeaderPropsType {
  title: string;
  className?: string;
}

const BoxHeader = function ({
  title,
  className,
}: BoxHeaderPropsType): JSX.Element {
  return (
    <div className={`${className} pb-5 text-small text-grayscale-dark`}>
      {title}
    </div>
  );
};

export default BoxHeader;
