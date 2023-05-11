export interface StatusBadgePropsType {
  // status: '명세중' | '명세완료' | '개발중' | '개발완료';
  status: number;
  small?: boolean;
  className?: string;
}

const StatusBadge = function ({
  status,
  small = false,
  className,
}: StatusBadgePropsType): JSX.Element {
  const styles = {
    style:
      status === 1
        ? 'text-jossbar-pink'
        : status === 2
        ? 'text-jossbar-pink'
        : status === 3
        ? 'text-jossbar-blue'
        : 'text-jossbar-blue',
    // status === '명세중'
    //   ? 'text-jossbar-pink'
    //   : status === '명세완료'
    //   ? 'text-jossbar-pink'
    //   : status === '개발중'
    //   ? 'text-jossbar-blue'
    //   : 'text-jossbar-blue',
  };
  return (
    <span
      className={`${className} ${styles.style} ${
        small ? 'text-small' : 'text-content'
      }`}
    >
      {status === 1
        ? '명세중'
        : status === 2
        ? '명세완료'
        : status === 3
        ? '개발중'
        : '개발완료'}
    </span>
  );
};

export default StatusBadge;
