import { DispatchToast, wrapper } from '@/store';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClientOption } from '../_app';
import {
  useFigmaDatas,
  useFigmaSections,
  useUserFigmaTokens,
} from '@/hooks/queries/queries';
import { useStoreDispatch } from '@/hooks/useStore';
import { figmaTokenActions } from '@/store/figma-token-slice';
import FigmaImageList from '@/components/FigmaImageList';
import { SpinnerDots } from '@/components/common/Spinner';
import useFigmaOrigin from '@/hooks/useFigmaOrigin';
import { useRouter } from 'next/router';
import AnimationBox from '@/components/common/AnimationBox';
import GetFigmaURL from '@/components/create/GetFigmaURL';
import GetSpaceData from '@/components/create/GetSpaceData';
import SelectFigma from '@/components/create/SelectFIgma';
import SpaceNavContainer from '@/components/preview/SpaceNavContainer';
import { useWidthHeight } from '@/hooks/useWidthHeight';
import { Box, Button } from '@/components/common';
import { BsArrowRight } from 'react-icons/bs';
import useInput from '@/hooks/useInput';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import apiRequest from '@/utils/axios';
import MetaHead from '@/components/common/MetaHead';

const SpaceCreatePage = function () {
  const dispatch = useStoreDispatch();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const router = useRouter();

  // 1스텝
  // 서버에 던질 figmaUrl
  const [figmaUrl, setFigmaUrl] = useState<string>(``);
  // 서버에 던질 figmaId
  const [figmaId, setFigmaId] = useState<string>(``);
  const { data, isLoading, isError } = useUserFigmaTokens();
  const setFigmaUrlHandler = function (url: string) {
    setFigmaUrl(() => url);
  };
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const setFigmaIdHandler = function (id: string) {
    setSelectedIds(() => []);
    setFigmaId(() => id);
  };

  const {
    figmaData, // 서버에 던질 figmaFileName, figmaImg 보유.
    figmaDataLoading,
    figmaImages,
    figmaImagesLoading,
    figmaRefineData,
  } = useFigmaOrigin(figmaId, `newSpace`, selectedIds);

  const setFigmaToken = function () {
    dispatch(
      figmaTokenActions.setTokens({
        figmaAccess: process.env.NEXT_PUBLIC_FIGMA_TEST_ACCESS_TOKEN,
        figmaRefresh: process.env.NEXT_PUBLIC_FIGMA_TEST_REFRESH_TOKEN,
      })
    );
  };

  // step 2
  const [pjtImgUrl, setPjtImgUrl] = useState<string>(``);
  const [pjtName, setPjtName] = useState<string>(``);
  const [pjtDes, setPjtDes] = useState<string>(``);
  const [pjtStartDate, setPjtStartDate] = useState<any>();
  const [pjtEndDate, setPjtEndDate] = useState<any>();
  const [pjtMemberList, setPjtMemberList] = useState<
    { id: number | string; memberName: string; memberProfileImg: string }[]
  >([
    {
      id: 12,
      memberName: `gd1`,
      memberProfileImg: `https://w7.pngwing.com/pngs/9/929/png-transparent-pokemon-charmander-pikachu-pokemon-x-and-y-charmander-charizard-charmander-food-orange-vertebrate-thumbnail.png`,
    },
    {
      id: 123,
      memberName: `gd2`,
      memberProfileImg: `https://w7.pngwing.com/pngs/9/929/png-transparent-pokemon-charmander-pikachu-pokemon-x-and-y-charmander-charizard-charmander-food-orange-vertebrate-thumbnail.png`,
    },
    {
      id: 124,
      memberName: `gd3`,
      memberProfileImg: `https://w7.pngwing.com/pngs/9/929/png-transparent-pokemon-charmander-pikachu-pokemon-x-and-y-charmander-charizard-charmander-food-orange-vertebrate-thumbnail.png`,
    },
    {
      id: 1233,
      memberName: `gd4`,
      memberProfileImg: `https://w7.pngwing.com/pngs/9/929/png-transparent-pokemon-charmander-pikachu-pokemon-x-and-y-charmander-charizard-charmander-food-orange-vertebrate-thumbnail.png`,
    },
  ]);
  // pjtMemberList.map((member) => member.id) // 아이디 리스트
  const [baseUrlList, setBaseUrlList] = useState<string>(``);
  // step 3
  const createHandler = function () {
    const sectionList = figmaRefineData
      .filter((figmaData) => {
        return figmaData.selected;
      })
      .map((val) => {
        return {
          sectionUrl: val.image,
          refreshId: val.figmaId,
          name: val.name,
        };
      });
    if (!sectionList.length) {
      dispatch(DispatchToast('피그마 화면을 골라주세요!', false));
      return;
    } else if (!figmaUrl.trim().length) {
      dispatch(DispatchToast('Figma url을 입력해주세요!', false));
      return;
    } else if (!figmaData?.name) {
      dispatch(DispatchToast('Figma url이 유효하지 않습니다!', false));
      return;
    } else if (!pjtName.trim()) {
      dispatch(DispatchToast('프로젝트 이름을 입력해주세요!', false));
      return;
    } else if (!baseUrlList.trim().length) {
      dispatch(DispatchToast('프로젝트 url을 입력해주세요!', false));
      return;
    } else if (!pjtStartDate || !pjtEndDate) {
      dispatch(DispatchToast('프로젝트 기간을 입력해주세요!', false));
      return;
    }
    console.log(pjtStartDate, typeof pjtEndDate);
    const createConfig = {
      figmaUrl: figmaUrl,
      figmaFileId: figmaId,
      figmaFileName: figmaData?.name,
      figmaImg: figmaData?.thumbnails,
      name: pjtName,
      favicon: pjtImgUrl ? pjtImgUrl : '',
      description: pjtDes ? pjtDes : `${pjtName}의 공간입니다.`,
      startDate: pjtStartDate,
      endDate: pjtEndDate,
      baseurls: baseUrlList.split(`\n`),
    };

    apiRequest({
      method: `post`,
      url: `/api/workspace/project`,
      data: createConfig,
    })
      .then(async (res) => {
        const spaceId = res.data.id;
        await apiRequest({
          method: `post`,
          url: `/api/workspace/figma-section`,
          data: {
            figmaSections: sectionList,
          },
          params: {
            workspaceId: spaceId,
          },
        });
        return res;
      })
      .then(async (res) => {
        await apiRequest({
          method: `post`,
          url: `/api/workspace/member`,
          data: {
            memberIds: pjtMemberList.map((member) => member.id),
          },
        });
      });
  };

  return (
    <>
      <MetaHead
        title="SSAFAST: create space"
        description="SSAFAST에서 자신만의 space를 생성해보세요!"
      />
      <div className="h-full w-full flex flex-row p-5 gap-5">
        <SpaceNavContainer />
        <Box
          variant="two"
          className="h-full w-[80%] p-5 flex flex-col items-center justify-center"
        >
          {/* 스텝 */}
          <div className="flex flex-row h-[8%] basis-[8%] gap-[1%] w-full items-center justify-center">
            <div
              className={`h-[50px] w-[50px] rounded-full flex items-center justify-center text-theme-dark-normal text-[22px] duration-[0.33s] cursor-pointer ${
                step === 1
                  ? 'bg-mincho-strong active:bg-teal-600 scale-[110%]'
                  : 'bg-theme-white-normal active:bg-theme-white-strong hover:scale-[105%]'
              }`}
              onClick={() => setStep(() => 1)}
            >
              1
            </div>
            <BsArrowRight className="w-[9%] h-[50px]" />
            <div
              className={`h-[50px] w-[50px] rounded-full flex items-center justify-center text-theme-dark-normal text-[22px] duration-[0.33s] cursor-pointer ${
                step === 2
                  ? 'bg-mincho-strong active:bg-teal-600 scale-[110%]'
                  : 'bg-theme-white-normal active:bg-theme-white-strong hover:scale-[105%]'
              }`}
              onClick={() => setStep(() => 2)}
            >
              2
            </div>
            <BsArrowRight className="w-[9%] h-[50px]" />
            <div
              className={`h-[50px] w-[50px] rounded-full flex items-center justify-center text-theme-dark-normal text-[22px] duration-[0.33s] cursor-pointer ${
                step === 3
                  ? 'bg-mincho-strong active:bg-teal-600 scale-[110%]'
                  : 'bg-theme-white-normal active:bg-theme-white-strong hover:scale-[105%]'
              }`}
              onClick={() => setStep(() => 3)}
            >
              3
            </div>
          </div>
          {/* 탭 */}
          <div className="h-[84%] basis-[84%] w-full relative">
            <AnimationBox
              className="w-full h-full absolute"
              isOpened={step === 1}
              appearClassName="animate-appear-from-bottom-fast"
              disappearClassName="animate-disappear-to-bottom-fast"
            >
              <GetFigmaURL
                fstData={figmaUrl}
                figmaId={figmaId}
                setFigmaIdHandler={setFigmaIdHandler}
                setFigmaUrlHandler={setFigmaUrlHandler}
              />
            </AnimationBox>
            <AnimationBox
              className="w-full h-full absolute"
              isOpened={step === 2}
              appearClassName="animate-appear-from-bottom-fast"
              disappearClassName="animate-disappear-to-bottom-fast"
            >
              <GetSpaceData
                savedImgUrl={pjtImgUrl}
                setImgUrl={setPjtImgUrl}
                savedName={pjtName}
                setName={setPjtName}
                savedDes={pjtDes}
                setDes={setPjtDes}
                savedStartDate={pjtStartDate}
                setStartDate={setPjtStartDate}
                savedEndDate={pjtEndDate}
                setEndDate={setPjtEndDate}
                savedMember={pjtMemberList}
                setSavedMember={setPjtMemberList}
                savedBaseUrlList={baseUrlList}
                setBaseUrlList={setBaseUrlList}
              />
            </AnimationBox>
            <AnimationBox
              className="w-full h-full absolute"
              isOpened={step === 3}
              appearClassName="animate-appear-from-bottom-fast"
              disappearClassName="animate-disappear-to-bottom-fast"
            >
              <SelectFigma
                figmaRefineData={figmaRefineData}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                figmaId={figmaId}
              />
              <div onClick={setFigmaToken}>토큰세팅</div>
            </AnimationBox>
          </div>

          {/* 아래 버튼 */}
          <div className="w-full h-[8%] flex items-center justify-center text-[24px]">
            <AnimationBox
              isOpened={step === 1}
              className="h-full w-full flex items-center justify-center gap-5 flex-row"
              appearClassName="animate-appear-from-left-fast"
              disappearClassName="animate-disappear-to-right-fast"
            >
              <Button onClick={() => setStep(() => 2)}>다음</Button>
            </AnimationBox>

            <AnimationBox
              isOpened={step === 2}
              className="h-full w-full flex items-center justify-center gap-5 flex-row"
              appearClassName="animate-appear-from-left-fast"
              disappearClassName="animate-disappear-to-right-fast"
            >
              <Button onClick={() => setStep(() => 1)}>이전</Button>
              <Button onClick={() => setStep(() => 3)}>다음</Button>
            </AnimationBox>

            <AnimationBox
              isOpened={step === 3}
              className="h-full w-full flex items-center justify-center gap-5 flex-row"
              appearClassName="animate-appear-from-left-fast"
              disappearClassName="animate-disappear-to-right-fast"
            >
              <Button onClick={() => setStep(() => 2)}>이전</Button>
              <Button onClick={createHandler}>완료</Button>
            </AnimationBox>
          </div>
        </Box>
      </div>
    </>
  );
};

export default SpaceCreatePage;

export const getServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    const queryClient = new QueryClient(QueryClientOption);
    queryClient.prefetchQuery({
      queryKey: queryKeys.figmaTokens(),
      queryFn: async function () {
        return apiRequest({
          method: `get`,
          baseURL: `${process.env.NEXT_PUBLIC_HOSTNAME}`,
          url: `/api/figma`,
        }).then((res) => res.data);
      },
    });
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
});
