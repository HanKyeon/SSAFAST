import { Box } from '../../common';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import { MockupDataItemType, MockupDataType } from './RequestBox';

interface ObjItemPropsType {
  item: MockupDataItemType;
  className?: string;
}

const ObjItem = function ({ item, className }: ObjItemPropsType): JSX.Element {
  const styles = {
    key: `py-[6px] px-3`,
    type: `py-[6px] px-3 w-[140px] text-grayscale-light border-l-[1px] border-r-[1px] border-grayscale-deepdarklight`,
    desc: `py-[6px] px-3 flex-1 min-w-0 text-grayscale-light flex items-center gap-2 bg-grayscale-deepdark rounded-[13px] duration-[0.33s] absolute top-0 left-0 z-10 w-[140px] opacity-0 hover:w-full hover:opacity-100`,
    value: `py-[6px] px-3 flex-1 min-w-0 text-grayscale-light`,
  };
  return (
    <div className={`${className} flex flex-col items-center`}>
      <Box
        variant="three"
        fontType="content"
        className={`w-full h-auto flex items-center overflow-hidden relative`}
      >
        <div className={`${styles['key']} w-[140px]`}>
          <div>{item.key}</div>
          <div className={`${styles['desc']}`}>
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
          <input
            type="text"
            title="value"
            placeholder="value"
            className={` bg-transparent w-full border-b-[1px] border-theme-white-normal outline-none`}
          />
        </div>
      </Box>
      {item.obj && (
        <Box
          fontType="content"
          className={`!bg-grayscale-deepdarkdeep rounded-t-none w-[95%]`}
        >
          {item.obj.map((item) => (
            <div
              key={item.key}
              className={`w-full h-auto flex items-center relative overflow-hidden`}
            >
              <div
                className={`${styles['key']} w-[calc(140px-(100%-95%)/2)] text-grayscale-light`}
              >
                {item.key}
              </div>
              <div className={`${styles['type']}`}>{item.type}</div>
              <div
                className={`${styles['desc']} bg-grayscale-deepdarkdeep rounded-[13px] w-auto duration-[0.33s] hover:absolute hover:w-full`}
              >
                <i>
                  <HiChatBubbleBottomCenterText
                    className={`text-normal text-grayscale-dark`}
                  />
                </i>
                <p className={`truncate text-ellipsis`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ObjItem;
