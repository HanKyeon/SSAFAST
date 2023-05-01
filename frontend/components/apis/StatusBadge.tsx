export interface StatusBadgePropsType {
  status: '명세중' | '명세완료' | '개발중' | '개발완료';
  className?: string;
}

const StatusBadge = function ({
  status,
  className,
}: StatusBadgePropsType): JSX.Element {
  const styles = {
    style:
      status === '명세중'
        ? 'text-jossbar-pink'
        : status === '명세완료'
        ? 'text-jossbar-pink'
        : status === '개발중'
        ? 'text-jossbar-blue'
        : 'text-jossbar-blue',
  };
  return <span className={`${className} ${styles.style}`}>{status}</span>;
};

export default StatusBadge;