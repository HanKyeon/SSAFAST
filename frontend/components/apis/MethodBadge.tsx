export interface MethodBadgePropsType {
  method: 'PUT' | 'GET' | 'POST' | 'DEL' | 'PATCH';
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
      method === 'POST'
        ? 'bg-mega-normal'
        : method === 'PUT'
        ? 'bg-taro-normal'
        : method === 'GET'
        ? 'bg-mincho-normal'
        : method === 'DEL'
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
      <span className={`text-theme-dark-strong`}>{method}</span>
    </div>
  );
};

export default MethodBadge;
