import { Box, Button } from '../common';
import { IoEnterOutline } from 'react-icons/io5';
import BoxHeader from '../common/BoxHeader';
import UserBadge from '../common/UserBadge';
import { TbCrown } from 'react-icons/tb';
import { FormEvent, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { useRouter } from 'next/router';
import { useSpaceDetail, useSpaceMembers } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';

// const chartData = [
//   { year: 2010, count: 10 },
//   { year: 2011, count: 20 },
//   { year: 2012, count: 15 },
//   { year: 2013, count: 25 },
//   { year: 2014, count: 22 },
//   { year: 2015, count: 30 },
//   { year: 2016, count: 28 },
// ];

const PreviewRightContainer = function (): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const pushWorkHandler = function (e: FormEvent) {
    e.preventDefault();
    router.push(`/space/${spaceId}/work`);
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

  // const chartEl = useRef<HTMLCanvasElement>(null);

  //   const drawChart = (): void => {
  //     const ctx = document.getElementById('myChart');
  //     if(ctx){
  //       new Chart(ctx, {
  //         type: 'doughnut',
  // data:{
  //     labels: ['Red', 'Blue', 'Yellow'],
  //     datasets: [
  //       {
  //         label: 'My First Dataset',
  //         data: [300, 50, 100],
  //         backgroundColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(54, 162, 235)',
  //           'rgb(255, 205, 86)',
  //         ],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   },

  //       });
  //     }
  //   };

  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow'],
  //   datasets: [
  //     {
  //       label: 'My First Dataset',
  //       data: [300, 50, 100],
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)',
  //       ],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   // drawChart();
  // }, []);
  return (
    <div className="h-full min-h-0 min-w-0 flex-1 py-3 pr-3 flex flex-col gap-3">
      <Box className="p-5 flex-1">
        <div>
          <BoxHeader title="Load Test? Test Coverage?" />
          <div></div>
        </div>
        <div>
          <BoxHeader title="API 진행률?" />
          <div>
            <canvas id="myChart"></canvas>
            {/* <Doughnut data={data} /> */}
          </div>
        </div>
      </Box>
      <Box className="p-5 flex-1 min-h-0">
        <BoxHeader title="Member" />
        <ul className="flex-1 flex flex-col gap-3 min-h-0 overflow-scroll scrollbar-hide">
          {memberList?.members.map((member) => {
            return (
              <li className="flex justify-center items-center gap-3 h-[30px]">
                <UserBadge imgSrc={member.profileImg} />
                <span className="w-[50px] truncate">{member.name}</span>
                {member.id === spaceDetailData?.leaderId && (
                  <div className="flex justify-center items-center gap-1 w-[40px]">
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
        className="flex gap-2 items-center justify-center"
        onClick={pushWorkHandler}
      >
        Enter
        <IoEnterOutline />
      </Button>
    </div>
  );
};

export default PreviewRightContainer;
