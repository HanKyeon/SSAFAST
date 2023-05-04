import { Box } from '../../common';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import { MockupDataItemType, MockupDataType } from './RequestBox';
import { useStoreSelector } from '@/hooks/useStore';
import Input from '@/components/common/Input';

interface ObjItemPropsType {
  item: MockupDataItemType;
  className?: string;
}

const ObjItem = function ({ item, className }: ObjItemPropsType): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const styles = {
    itemWrapper: `w-full h-auto flex items-center overflow-hidden relative`,
    key: `py-[6px] px-3 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
    type: `py-[6px] px-3 w-[140px] border-l-[1px] border-r-[1px] ${
      isDark
        ? `text-grayscale-light border-grayscale-deepdarklight`
        : `text-grayscale-deepdarkdeep border-grayscale-deeplightlight`
    }`,
    mainDesc: `py-[6px] px-3 flex-1 min-w-0 flex items-center gap-2 bg-grayscale-deepdark rounded-[13px] duration-[0.33s] absolute top-0 left-0 z-10 w-[140px] opacity-0 hover:w-full hover:opacity-100 ${
      isDark
        ? `text-grayscale-light bg-grayscale-deepdark`
        : `text-grayscale-deepdarkdeep bg-grayscale-light`
    }`,
    objDesc: `py-[6px] px-3 flex-1 min-w-0 flex items-center gap-2 bg-grayscale-deepdark rounded-[13px] duration-[0.33s] absolute top-0 left-0 z-10 w-[140px] opacity-0 hover:w-full hover:opacity-100 ${
      isDark
        ? `text-grayscale-light bg-grayscale-deepdarkdeep`
        : `text-grayscale-deepdarkdeep bg-grayscale-deeplight`
    }`,
    value: `py-[6px] px-3 flex-1 min-w-0 ${
      isDark ? `text-grayscale-light` : `text-grayscale-deepdarkdeep`
    }`,
  };
  return (
    <div className={`${className} flex flex-col items-center`}>
      <Box
        variant="three"
        fontType="content"
        className={`${styles['itemWrapper']}`}
      >
        <div className={`${styles['key']} w-[140px]`}>
          <div>{item.key}</div>
          <div className={`${styles['mainDesc']}`}>
            <i>
              <HiChatBubbleBottomCenterText
                className={`text-normal ${
                  isDark ? `text-grayscale-dark` : `text-grayscale-deeplight`
                }`}
              />
            </i>
            <p className={`truncate text-ellipsis`}>{item.desc}</p>
          </div>
        </div>
        <div className={`${styles['type']}`}>{item.type}</div>
        <div className={`${styles['value']}`}>
          <Input className={`w-full`} />
        </div>
      </Box>
      {item.obj && (
        <Box
          fontType="content"
          className={`${
            isDark ? `!bg-grayscale-deepdarkdeep` : `!bg-grayscale-deeplight`
          } rounded-t-none w-[95%]`}
        >
          {item.obj.map((item: any) => (
            <div key={item.key} className={`${styles['itemWrapper']}`}>
              <div className={`${styles['key']} w-[calc(140px-(100%-95%)/2)]`}>
                <div>{item.key}</div>
                <div className={`${styles['objDesc']}`}>
                  <i>
                    <HiChatBubbleBottomCenterText
                      className={`text-normal text-grayscale-dark`}
                    />
                  </i>
                  <p className={`truncate text-ellipsis`}>{item.desc}</p>
                </div>
              </div>
              <div className={`${styles['type']}`}>{item.type}</div>
              <div className={`${styles['value']}`}>
                <Input className={`w-full`} />
              </div>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ObjItem;
