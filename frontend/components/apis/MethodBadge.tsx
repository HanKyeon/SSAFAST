export interface MethodBadgePropsType {
  method:
    | 'PUT'
    | 'GET'
    | 'POST'
    | 'DEL'
    | 'PATCH'
    | `put`
    | `get`
    | `post`
    | `del`
    | `patch`;
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
      method === 'POST' || method === 'post'
        ? 'bg-mega-normal'
        : method === 'PUT' || method === 'put'
        ? 'bg-taro-normal'
        : method === 'GET' || method === 'get'
        ? 'bg-mincho-normal'
        : method === 'DEL' || method === 'del'
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
