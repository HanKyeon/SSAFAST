import { Box } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
const UseTestContainer = function () {
  const { dark } = useStoreSelector((state) => state.dark);
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
        className="basis-[25%] w-[25%] h-full flex-1 items-center justify-center overflow-y-scroll p-4 flex flex-col"
      ></Box>
      {/* 가운데 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[37.5%] w-[37.5%] h-full flex-1 items-center justify-center overflow-y-scroll"
      ></Box>
      {/* 오른쪽 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[37.5%] w-[37.5%] h-full flex-1 items-center justify-center overflow-y-scroll"
      ></Box>
    </Box>
  );
};

export default UseTestContainer;
