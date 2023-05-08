import StatusBadge from '@/components/apis/StatusBadge';
import { Box } from '@/components/common';
import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import { BsDownload } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';
import { HiOutlineFolderArrowDown } from 'react-icons/hi2';
import { IoSaveOutline } from 'react-icons/io5';
import MethodBadge from '@/components/apis/MethodBadge';
import ReqBox from './ReqBox';
import ResBox from './ResBox';
import LeftContainer from './LeftContainer';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}
const APIDocsContainer = function ({ store, serverSideStore }: Props) {
  return (
    <div className="h-full flex justify-center items-center gap-3">
      {/* 왼쪽 화면 */}
      <Box className="h-full p-5 flex-1">
        <LeftContainer />
      </Box>
      {/* 오른쪽 화면 */}
      <div className="h-full flex-1 min-w-0 flex flex-col items-center gap-3">
        {/* api detail */}
        <Box className="w-full p-5">
          <div className="flex justify-between items-center">
            <StatusBadge status="개발중" small />
            <div className="flex items-center gap-3 text-[20px]">
              <BsDownload />
              <HiOutlineFolderArrowDown />
              <IoSaveOutline />
              <TbSend className="text-mincho-normal" />
            </div>
          </div>
          <p className="mt-[12px] text-header">게시글 목록 불러오기</p>
          <p className="mt-1 text-content text-grayscale-dark">
            게시글 목록 쭈루리 불러오는 것
          </p>
          <div className="mt-[12px] flex gap-3 items-center">
            <MethodBadge method="GET" small />
            <p className="text-[14px] text-grayscale-light">
              https://localhost:8080/user/:userid
            </p>
          </div>
        </Box>
        {/* Request */}
        <ReqBox />
        {/* Response */}
        <ResBox />
      </div>
    </div>
  );
};

export default APIDocsContainer;
