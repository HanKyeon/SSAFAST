import { Box } from '../common';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import {
  MockupDataItemType,
  MockupDataType,
} from '../work/APIDocsContainer/RequestBox';

interface ObjDTOItemPropsType {
  item: MockupDataItemType;
  className?: string;
}

const ObjDTOItem = function ({
  item,
  className,
}: ObjDTOItemPropsType): JSX.Element {
  const styles = {
    id: `py-[6px] px-3 flex-1`,
    type: `py-[6px] px-3 flex-1 text-grayscale-dark border-l-[1px] border-r-[1px] border-grayscale-deepdarklight`,
    desc: `py-[6px] px-3 flex-[1.7] min-w-0 text-grayscale-dark flex items-center gap-2`,
  };
  return (
    <Box className={`${className} flex items-center`}>
      <div className={`${styles['id']} text-content`}>{item.key}</div>
      <div className={`${styles['type']} text-content`}>{item.type}</div>
      <div className={`${styles['desc']} text-content`}>
        <HiChatBubbleBottomCenterText className={`text-[20px]`} />
        <p className={`text-content truncate text-ellipsis hover:text-clip`}>
          {item.desc}
        </p>
      </div>
    </Box>
  );
};

export default ObjDTOItem;
