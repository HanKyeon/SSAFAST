export interface MethodBadgePropsType {
  type: 'PUT' | 'GET' | 'POST' | 'DEL' | 'PATCH';
  className?: string;
  small?: boolean;
}

const MethodBadge = function ({
  type,
  className,
  small = false,
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
    size: small
      ? 'w-[42px] h-[20px] text-[11px]'
      : 'w-[55px] h-[25px] text-[13px]',
  };
  return (
    <div
      className={`${className} ${styles.color} ${styles.size} flex items-center justify-center rounded-[5px] `}
    >
      <span className={`text-theme-dark-strong`}>{type}</span>
    </div>
  );
};

export default MethodBadge;
