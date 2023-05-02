import ToggleableHeader from '@/components/apis/ToggleableHeader';
import { Box } from '@/components/common';
import { useState } from 'react';

const ResponseBox = function (): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Box
      className={`${
        isOpen && 'flex-1'
      } w-full overflow-scroll scrollbar-hide duration-[0.33s]`}
    >
      <ToggleableHeader
        title="Response"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      {isOpen && <div></div>}
    </Box>
  );
};

export default ResponseBox;
