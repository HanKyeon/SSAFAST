import { Box } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import LoadItem from './LoadItem';

// 상수 스타일
const addBtnStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-mincho-strong active:border-teal-600 text-mincho-strong'
      : 'border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong'
  }` as const;

const LoadTestContainer = function () {
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
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center overflow-y-scroll p-4 flex flex-col"
      >
        <LoadItem />
      </Box>
      {/* 오른쪽 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center overflow-y-scroll"
      ></Box>
    </Box>
  );
};

export default LoadTestContainer;
