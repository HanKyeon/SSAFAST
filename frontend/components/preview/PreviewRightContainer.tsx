import { Box, Button } from '../common';
import { IoEnterOutline } from 'react-icons/io5';

const PreviewRightContainer = function (): JSX.Element {
  return (
    <div className="flex-[1] py-3 pr-3 flex flex-col gap-3">
      <Box className="flex-[1]">1</Box>
      <Box className="flex-[1]">2</Box>
      <Button className="flex gap-2 items-center justify-center">
        Enter
        <IoEnterOutline />
      </Button>
    </div>
  );
};

export default PreviewRightContainer;
