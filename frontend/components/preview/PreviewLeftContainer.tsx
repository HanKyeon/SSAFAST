import Image from 'next/image';
import { Box } from '../common';
import SpaceIcon from '/public/assets/images/Ggo.png';
import BoxHeader from '../common/BoxHeader';
import APIlistItem from '../apis/APIlistItem';

const PreviewLeftContainer = function (): JSX.Element {
  return (
    <div className="h-full flex-[2] py-3 flex flex-col gap-3 min-w-0">
      <Box className="flex-[3] bg-preview bg-no-repeat bg-cover bg-center">
        <div className="w-full h-full p-10 bg-basic-black bg-opacity-60 flex flex-col gap-5">
          {/* header */}
          <div className="flex gap-3 items-center">
            <i>
              <Image
                src={SpaceIcon}
                alt="space icon"
                className="w-[50px] h-[50px] object-contain"
              />
            </i>
            <span className="text-[30px]">로켓단</span>
          </div>
          {/* pjt 설명 */}
          <p>
            넌 개발만 해, 나머지는 우리가 할게. 설계-개발-테스트 과정에서의
            반복되는 작업을 효율적으로 관리하도록 도와주는 개발자를 위한 서비스.
          </p>
          {/* 기간 */}
          <p className="text-[14px]">23.04.11 ~ 23.05.10</p>
          {/* stack이랑? figma 이미지 */}
          <div className="flex flex-1 gap-5 mt-5">
            <div className="flex-1">
              <span className="text-[14px] text-grayscale-dark">Stack</span>
              <div className="h-full border-red-400 border-[1px] rounded-[8px]">
                stack list들
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[14px] text-grayscale-dark">Figma</span>
              <div className="h-full border-red-400 border-[1px] rounded-[8px]">
                Figma thumbnail
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box className="p-5 flex-[2] min-h-0 flex flex-col">
        <BoxHeader title="API list" />
        <div className="flex gap-3 items-center pb-2 border-b-[1px] border-grayscale-dark text-grayscale-dark text-[14px]">
          <span className="w-[55px] text-center">method</span>
          <span className="flex-1">description</span>
          <span className="w-[70px] text-center">status</span>
        </div>
        <ul className="flex-1 flex flex-col overflow-scroll scrollbar-hide">
          <APIlistItem
            type="POST"
            desc="목록 수정하기인데 이제 여기서 뭔가를 더 받으면 뭐 어쩌고 되는건가"
            status="명세중"
          />
          <APIlistItem
            type="GET"
            desc="목록 수정하기인데 이제 여기서 뭔가를 더 받으면 뭐 어쩌고 되는건가"
            status="명세완료"
          />
          <APIlistItem
            type="POST"
            desc="목록 수정하기인데 이제"
            status="명세중"
          />
          <APIlistItem
            type="GET"
            desc="목록 수정하기인데 이제 여기서 뭔가를 더 받으면 뭐 어쩌고 되는건가"
            status="개발중"
          />
          <APIlistItem type="DEL" desc="목록 수정" status="개발완료" />
          <APIlistItem
            type="PATCH"
            desc="회원 관리를 하다가 배가고픔"
            status="명세중"
          />
          <APIlistItem
            type="GET"
            desc="회원 관리를 하다가 배가고픔"
            status="명세중"
          />
          <APIlistItem
            type="GET"
            desc="회원 관리를 하다가 배가고픔"
            status="명세중"
          />
          <APIlistItem
            type="POST"
            desc="회원 관리를 하다가 배가고픔"
            status="명세중"
          />
          <APIlistItem
            type="GET"
            desc="회원 관리를 하다가 배가고픔"
            status="명세중"
          />
        </ul>
      </Box>
    </div>
  );
};

export default PreviewLeftContainer;
