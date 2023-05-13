import { Box, Button } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import MappingContainer from './MappingContainer';
import { HiPlusCircle } from 'react-icons/hi';
import SideApiItem from './SideApiItem';
import BoxHeader from '@/components/common/BoxHeader';
const UseTestContainer = function () {
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <Box
      variant="one"
      fontType="header"
      className="h-full w-full flex gap-[1.12%]"
    >
      {/* 왼쪽 사이드 */}
      <Box
        variant="two"
        fontType="normal"
        className="basis-[25%] w-[25%] h-full p-5 flex flex-col gap-6"
      >
        {/* usecase TITLE */}
        <div className={`w-full`}>
          <BoxHeader title="info" className={`!pb-1`} />
          <span className={`text-content`}>유저가 서비스를 처음 사용</span>
          <p className={`text-small text-grayscale-deeplightlight`}>
            회원가입부터 게시글을 작성하는데까지의 흐름
          </p>
        </div>
        {/* api 순서대로 조록 */}
        <div className={`w-full flex-1 flex flex-col min-h-0`}>
          <BoxHeader title="order" className={`!pb-1`} />
          <div className={`flex-1 overflow-scroll scrollbar-hide`}>
            <ul>
              <SideApiItem />
              <SideApiItem />
              <SideApiItem />
            </ul>
            <div
              className={`flex gap-2 justify-center items-center border-[1px] border-grayscale-dark py-2 border-dashed rounded-[8px] text-grayscale-dark mt-4 cursor-pointer`}
            >
              Add api <HiPlusCircle />
            </div>
          </div>
        </div>
        {/* 버튼 wrapper */}
        <div className={`w-full flex gap-3`}>
          <Button
            className={`flex-1 !bg-mammoth-normal !border-mammoth-normal !py-1`}
          >
            초기화
          </Button>
          <Button className={`flex-1 !py-1`}>실행</Button>
        </div>
      </Box>
      {/* Request랑 Response Container */}
      <MappingContainer />
    </Box>
  );
};

export default UseTestContainer;
