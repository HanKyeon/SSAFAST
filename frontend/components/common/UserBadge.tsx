import Image from 'next/image';
import UserImg from '/public/assets/images/Ggo.png';

interface UserBadgePropsType {
  size?: 'small' | 'medium' | 'large';
}

const UserBadge = function ({
  size = 'small',
}: UserBadgePropsType): JSX.Element {
  const styles = {
    userImgWrapper:
      'border-2 border-grayscale-dark flex items-center justify-center rounded-full overflow-hidden',
    size:
      size === 'small'
        ? 'w-[30px] h-[30px]'
        : size === 'medium'
        ? 'w-[100px] h-[100px]'
        : 'w-[200px] h-[200px]',
  };
  return (
    <div className={`${styles['userImgWrapper']} ${styles['size']}`}>
      <Image
        src={UserImg}
        alt="user image"
        className="min-w-full min-h-full object-cover"
      />
    </div>
  );
};

export default UserBadge;
