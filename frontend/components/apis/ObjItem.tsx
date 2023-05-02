import { Box } from '../common';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import {
  MockupDataItemType,
  MockupDataType,
} from '../work/APIDocsContainer/RequestBox';
import ObjDTOItem from './ObjDTOItem';

interface ObjItemPropsType {
  item: MockupDataItemType;
  className?: string;
}

const ObjItem = function ({ item, className }: ObjItemPropsType): JSX.Element {
  const styles = {
    id: `py-[6px] px-3`,
    type: `py-[6px] px-3 w-[140px] text-grayscale-light border-l-[1px] border-r-[1px] border-grayscale-deepdarklight`,
    desc: `py-[6px] px-3 flex-1 min-w-0 text-grayscale-light flex items-center gap-2`,
  };
  return (
    <div className={`${className} flex flex-col items-center`}>
      <Box
        variant="three"
        fontType="content"
        className={`w-full h-auto flex items-center relative overflow-hidden`}
      >
        <div className={`${styles['id']} w-[140px]`}>{item.key}</div>
        <div className={`${styles['type']}`}>{item.type}</div>
        <div
          className={`${styles['desc']} bg-grayscale-deepdark rounded-[13px] w-auto duration-[0.33s] hover:absolute hover:w-full`}
        >
          <i>
            <HiChatBubbleBottomCenterText
              className={`text-normal text-grayscale-dark`}
            />
          </i>
          <p className={`truncate text-ellipsis`}>{item.desc}</p>
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
                className={`${styles['id']} w-[calc(140px-(100%-95%)/2)] text-grayscale-light`}
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
