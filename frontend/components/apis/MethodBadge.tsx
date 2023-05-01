export interface MethodBadgePropsType {
  type: 'PUT' | 'GET' | 'POST' | 'DEL' | 'PATCH';
  className?: string;
}

const MethodBadge = function ({
  type,
  className,
}: MethodBadgePropsType): JSX.Element {
  const styles = {
    color:
      type === 'POST'
        ? 'bg-mega-normal'
        : type === 'PUT'
        ? 'bg-taro-normal'
        : type === 'GET'
        ? 'bg-mincho-normal'
        : type === 'DEL'
        ? 'bg-mammoth-normal'
        : 'bg-milktea-strong',
  };
  return (
    <span
      className={`${className} ${styles.color} flex items-center justify-center text-theme-dark-strong rounded-[5px] w-[55px] h-[25px] text-[13px]`}
    >
      {type}
    </span>
  );
};

export default MethodBadge;
