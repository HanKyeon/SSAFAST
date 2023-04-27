import { Box } from '@/components/common';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import FigmaList from '../FigmaList';

interface Props {
  store?: any;
}

const APIContainer = function ({ store }: Props) {
  return (
    <Box
      variant="one"
      fontType="header"
      className="h-full w-full flex flex-row gap-[1.6%]"
    >
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] flex-1 items-center justify-center overflow-scroll"
      >
        <FigmaList store={store} />
      </Box>
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] flex-1 items-center justify-center"
      >
        api form
      </Box>
    </Box>
  );
};

export default APIContainer;
