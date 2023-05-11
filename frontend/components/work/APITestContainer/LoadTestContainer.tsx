import { Box } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import LoadItem from './LoadItem';
import LoadResult from './LoadResult';
import { useRef, useState } from 'react';

const LoadTestContainer = function () {
  const { dark } = useStoreSelector((state) => state.dark);
  const [api, setApi] = useState<boolean>(true);
  const [isList, setIsList] = useState<boolean>(false);
  const toggleIsList = function () {
    setIsList((v) => !v);
  };
  return (
    <Box
      variant="one"
      fontType="header"
      className="h-full w-full flex flex-row gap-[1.12%]"
    >
      {/* 왼쪽 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center overflow-y-scroll p-4 flex flex-col"
      >
        <LoadItem api={api} toggleIsList={toggleIsList} />
      </Box>
      {/* 오른쪽 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center pt-4 pl-4"
      >
        <LoadResult isList={isList} toggleIsList={toggleIsList} />
      </Box>
    </Box>
  );
};

export default LoadTestContainer;
