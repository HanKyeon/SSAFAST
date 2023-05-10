import { useStoreSelector } from '@/hooks/useStore';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import Input from '@/components/common/Input';

interface ReqItemInnerPropsType {
  className?: string;
  depth?: 0 | 1 | 2;
}

const ItemInner = function ({
  className,
  depth = 0,
}: ReqItemInnerPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);

  const styles = {
    innerBox: `w-full h-auto flex items-center overflow-hidden relative ${
      depth === 0
        ? isDark
          ? 'bg-grayscale-deepdark text-white'
          : 'bg-grayscale-light text-black'
        : depth === 1
        ? isDark
          ? 'bg-grayscale-deepdarkdeep'
          : 'bg-grayscale-deeplight'
        : isDark
        ? 'bg-grayscale-deepdarkdeepdeep'
        : 'bg-grayscale-dark'
    }`,
    key: `py-[8px] px-3 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    } ${
      depth === 0
        ? 'w-[150px]'
        : depth === 1
        ? 'w-[calc(150px-(100%-95%)/2-0.5px)]'
        : 'w-[calc(150px-(100%-95%)-2px)]'
    }`,
    type: `py-[8px] px-3 w-[140px] border-x-[1px] ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    desc: `py-[8px] px-3 flex-1 min-w-0 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
  };
  return (
    <>
      {item && (
        <div className={`${styles['innerBox']} ${className}`}>
          <div className={`${styles['key']}`}>
            <div>{'key' in item ? item.key : item.name}</div>
          </div>
          <div className={`${styles['type']}`}>
            {'type' in item ? item.type : item.name}
          </div>
          <div className={`${styles['desc']}`}>
            {'type' in item && <Input className={`w-full`} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemInner;
