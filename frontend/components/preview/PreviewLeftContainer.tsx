import Image from 'next/image';
import { Box } from '../common';
import SpaceIcon from '/public/assets/images/Ggo.png';
import BoxHeader from '../common/BoxHeader';
import APIlistItem from '../apis/APIlistItem';
import { useRouter } from 'next/router';
import { useSpaceApis, useSpaceDetail } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';
import { useMemo } from 'react';

const statusLsit = [``, `명세중`, `명세완료`, `개발중`, `개발완료`];

const PreviewLeftContainer = function (): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: spaceDetailData,
    isLoading: spaceDetailLoading,
    isError: spaceDetailError,
  } = useSpaceDetail(parseInt(spaceId));
  const {
    data: spaceApiData,
    isLoading: spaceApiLoading,
    isError: spaceApiError,
  } = useSpaceApis(parseInt(spaceId));
  const apiList = useMemo(
    function () {
      let ret: {
        id: number;
        name: string;
        description: string;
        method:
          | 'PUT'
          | 'GET'
          | 'POST'
          | 'DELETE'
          | 'PATCH'
          | `put`
          | `get`
          | `post`
          | `delete`
          | `patch`;
        status: number | string;
        writter: {
          id: number;
          name: string;
          email: string;
          profileImg: string;
        };
      }[] = [];
      if (!spaceApiData) {
        return [];
      }
      spaceApiData?.apiCategories.forEach((cate, idx) => {
        cate.apis.forEach((api) => {
          ret.push(api);
        });
      });
      return ret;
    },
    [spaceApiData]
  );
  return (
    <div className="h-full flex-[2] py-3 flex flex-col gap-3 min-w-0">
      <Box className="flex-[3] bg-preview bg-no-repeat bg-cover bg-center">
        <div className="w-full h-full p-10 bg-basic-black bg-opacity-60 flex flex-col gap-5">
          {/* header */}
          <div className="flex gap-3 items-center">
            <i>
              <Image
                src={spaceDetailData?.favicon || SpaceIcon}
                alt="space icon"
                className="w-[50px] h-[50px] object-contain"
                width={500}
                height={500}
              />
              {/* <img /> */}
            </i>
            <span className="text-[30px]">
              {spaceDetailData?.name || `프로젝트가 없습니다.`}
            </span>
          </div>
          {/* pjt 설명 */}
          <p>{spaceDetailData?.description || `프로젝트가 없습니다.`}</p>
          {/* 기간 */}
          <p className="text-[14px]">
            {spaceDetailData?.startDate} ~ {spaceDetailData?.endDate}
          </p>
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
                <img
                  src={spaceDetailData?.figmaImg}
                  alt="figma thumbnail"
                  className="w-full h-full"
                />
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
          {apiList.map((api) => {
            return (
              <APIlistItem
                method={api.method}
                desc={api.description}
                status={
                  statusLsit[api.status as 1 | 2 | 3 | 4] as
                    | `명세중`
                    | `명세완료`
                    | `개발중`
                    | `개발완료`
                }
              />
            );
          })}
          <APIlistItem
            method="POST"
            desc="목록 수정하기인데 이제 여기서 뭔가를 더 받으면 뭐 어쩌고 되는건가"
            status="명세중"
          />
          <APIlistItem
            method="GET"
            desc="목록 수정하기인데 이제 여기서 뭔가를 더 받으면 뭐 어쩌고 되는건가"
            status="명세완료"
          />
          <APIlistItem
            method="POST"
            desc="목록 수정하기인데 이제"
            status="명세중"
          />
          <APIlistItem
            method="GET"
            desc="목록 수정하기인데 이제 여기서 뭔가를 더 받으면 뭐 어쩌고 되는건가"
            status="개발중"
          />
          <APIlistItem method="DELETE" desc="목록 수정" status="개발완료" />
        </ul>
      </Box>
    </div>
  );
};

export default PreviewLeftContainer;
