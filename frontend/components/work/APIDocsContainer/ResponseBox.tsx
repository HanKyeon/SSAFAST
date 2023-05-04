import ToggleableHeader from '@/components/work/APIDocsContainer/ToggleableHeader';
import { Box } from '@/components/common';
import { useState } from 'react';
import ResponseJSON from './ResponseJSON';

const ResponseBox = function (): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenJSON, setIsOpenJSON] = useState<boolean>(true);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(true);

  return (
    <Box
      className={`${
        isOpen && 'flex-1'
      } w-full relative min-h-0 overflow-scroll scrollbar-hide duration-[0.33s]`}
    >
      <ToggleableHeader
        title="Request"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      {isOpen && (
        <div className={`p-2 pb-4 flex flex-col gap-3`}>
          <div className={`w-full`}>
            <ToggleableHeader
              title="JSON"
              isOpen={isOpenJSON}
              setIsOpen={setIsOpenJSON}
            />
            {isOpenJSON && (
              <div className={`px-6`}>
                <ResponseJSON />
              </div>
            )}
          </div>
          <div className={`w-full`}>
            <ToggleableHeader
              title="detail"
              isOpen={isOpenDetail}
              setIsOpen={setIsOpenDetail}
            />
            {isOpenDetail && <div></div>}
          </div>
        </div>
      )}
    </Box>
  );
};

export default ResponseBox;
