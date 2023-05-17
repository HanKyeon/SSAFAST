export interface MethodBadgePropsType {
  method: 1 | 2 | 3 | 4 | 5;
  className?: string;
  small?: boolean;
}

const MethodBadge = function ({
  method,
  className,
  small = false,
}: MethodBadgePropsType): JSX.Element {
  const styles = {
    color:
      method === 1
        ? 'bg-mincho-normal'
        : method === 2
        ? 'bg-mega-normal'
        : method === 3
        ? 'bg-taro-normal'
        : method === 4
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
      <span className={`text-theme-dark-strong`}>
        {method === 1
          ? 'GET'
          : method === 2
          ? 'POST'
          : method === 3
          ? 'PUT'
          : method === 4
          ? 'DEL'
          : 'PATCH'}
      </span>
    </div>
  );
};

export default MethodBadge;
