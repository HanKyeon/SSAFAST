import Image from 'next/image';
import UserImg from '/public/assets/images/Ggo.png';

interface UserBadgePropsType {
  size?: 'small' | 'medium' | 'large';
  imgSrc?: string;
}

const UserBadge = function ({
  size = 'small',
  imgSrc,
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
        src={(imgSrc as string) ? (imgSrc as string) : UserImg}
        alt="user image"
        className="min-w-full min-h-full object-cover"
        width={500}
        height={500}
      />
    </div>
  );
};

export default UserBadge;
