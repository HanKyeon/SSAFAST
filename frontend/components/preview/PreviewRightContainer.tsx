import { Box, Button } from '../common';
import { IoEnterOutline } from 'react-icons/io5';
import BoxHeader from '../common/BoxHeader';
import UserBadge from '../common/UserBadge';
import { TbCrown } from 'react-icons/tb';
import { FormEvent, useEffect, useRef, useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { useRouter } from 'next/router';
import {
  useSpaceDetail,
  useSpaceMembers,
  useSpaceApis,
} from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';
import { MdOutlinePercent } from 'react-icons/md';

const PreviewRightContainer = function (): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const pushWorkHandler = function (e: FormEvent) {
    e.preventDefault();
    window.location.href = `${process.env.NEXT_PUBLIC_HOSTNAME}/space/${spaceId}/work`;
    // router.push(`/space/${spaceId}/work`);
  };
  const {
    data: memberList,
    isLoading: memberLoading,
    isError: memberError,
  } = useSpaceMembers(parseInt(spaceId));
  const {
    data: spaceDetailData,
    isLoading: spaceDetailLoading,
    isError: spaceDetailError,
  } = useSpaceDetail(parseInt(spaceId));
  const { data: spaceApis } = useSpaceApis(spaceId);

  const [countSpaceApis, setCountSpaceApis] = useState<number>();
  const [countSpaceCompleteApis, setCountSpaceCompleteApis] =
    useState<number>();

  const percent = useMemo(() => {
    if (countSpaceCompleteApis && countSpaceApis) {
      return Math.floor((countSpaceCompleteApis / countSpaceApis) * 100);
    } else return 0;
  }, [countSpaceApis, countSpaceCompleteApis]);

  useEffect(() => {
    if (spaceApis) {
      // 전체 api 개수 세기
      let countAll = 0;
      spaceApis.apiCategories.map(
        (eachCate) => (countAll += eachCate.apis.length)
      );
      // console.log('전체 api 개수 : ', count);
      setCountSpaceApis(countAll);

      // 완료된 api 개수 세기
      let countCom = 0;
      spaceApis.apiCategories.map((eachCate) =>
        eachCate.apis.map((api) => {
          if (api.status === 4) countCom++;
        })
      );
      setCountSpaceCompleteApis(countCom);
    }
  }, [spaceApis]);

  return (
    <div className="h-full min-h-0 min-w-0 flex-1 py-3 pr-3 flex flex-col gap-3">
      <Box className="p-5 flex-1 flex flex-col">
        {/* <div>
          <BoxHeader title="Load Test? Test Coverage?" />
          <div></div>
        </div> */}
        <BoxHeader title="progress" />
        <div
          className={`flex-1 flex flex-col items-center justify-center gap-10`}
        >
          <div>
            <span className={`flex justify-center items-center gap-3`}>
              <span className={`text-[65px]`}>{percent}</span>
              <MdOutlinePercent className={`text-[30px]`} />
            </span>
          </div>
          <div className={`text-grayscale-deeplight`}>
            <div>전체 api : {countSpaceApis}개</div>
            <div className={`mt-3`}>
              완료된 api : {countSpaceCompleteApis}개
            </div>
          </div>
        </div>
      </Box>
      <Box className="p-5 flex-1 min-h-0">
        <BoxHeader title="Member" />
        <ul className="flex-1 flex flex-col gap-3 min-h-0 overflow-scroll scrollbar-hide">
          {memberList?.members.map((member) => {
            return (
              <li
                key={`${member.id}-preview-member`}
                className="relative flex justify-center items-center gap-3 h-[30px] w-full"
              >
                <UserBadge imgSrc={member.profileImg} />
                <span className={`w-[80%] truncate`} title={member.name}>
                  {member.name}
                </span>
                {member.id === spaceDetailData?.leaderId && (
                  <div className="absolute right-[4px] flex justify-center items-center gap-1 w-[50px]">
                    <span className="text-[11px] text-grayscale-dark">
                      팀장
                    </span>
                    <TbCrown className="text-mega-strong" />
                  </div>
                )}
              </li>
            );
          })}
          {/* <li className="flex justify-center items-center gap-3 h-[30px]">
            <UserBadge />
            <span className="w-[50px] truncate">폴라맨</span>
            <div className="flex justify-center items-center gap-1 w-[40px]">
              <span className="text-[11px] text-grayscale-dark">팀장</span>
              <TbCrown className="text-mega-strong" />
            </div>
          </li>
          <li className="flex justify-center items-center gap-3 h-[30px]">
            <UserBadge />
            <span className="w-[50px] truncate">폴라맨</span>
            <div className="flex justify-center items-center gap-1 w-[40px]"></div>
          </li>
          <li className="flex justify-center items-center gap-3 h-[30px]">
            <UserBadge />
            <span className="w-[50px] truncate">폴라맨</span>
            <div className="flex justify-center items-center gap-1 w-[40px]"></div>
          </li>
          <li className="flex justify-center items-center gap-3 h-[30px]">
            <UserBadge />
            <span className="w-[50px] truncate">폴라맨</span>
            <div className="flex justify-center items-center gap-1 w-[40px]"></div>
          </li>
          <li className="flex justify-center items-center gap-3 h-[30px]">
            <UserBadge />
            <span className="w-[50px] truncate">폴라맨</span>
            <div className="flex justify-center items-center gap-1 w-[40px]"></div>
          </li>
          <li className="flex justify-center items-center gap-3 h-[30px]">
            <UserBadge />
            <span className="w-[50px] truncate">폴라맨</span>
            <div className="flex justify-center items-center gap-1 w-[40px]"></div>
          </li> */}
        </ul>
      </Box>
      <Button
        className="flex !py-3 text-header gap-2 items-center justify-center"
        onClick={pushWorkHandler}
      >
        Enter
        <IoEnterOutline />
      </Button>
    </div>
  );
};

export default PreviewRightContainer;
