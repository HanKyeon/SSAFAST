import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Box, Button } from '../common';
import { workFigma } from './presence-type';
import AnimationBox from '../common/AnimationBox';
import {
  EachCateApi,
  SpaceFigma,
  useSectionsApi,
} from '@/hooks/queries/queries';
import Modal from '../common/Modal';
import { HiOutlineTrash } from 'react-icons/hi';
import APIlistItem from '../apis/APIlistItem';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/utils/axios';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';

interface Props {
  apiData?: EachCateApi[];
  figmaData: SpaceFigma;
  activeIdx: number | null;
  idx: number;
  headerIdx: number;
  setActive: (idx: number | null) => void;
  isConnect?: boolean;
}

const FigmaListItem = function ({
  apiData,
  figmaData,
  activeIdx,
  idx,
  headerIdx,
  setActive,
  isConnect = false,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useStoreDispatch();
  const { spaceId } = router.query as SpaceParams;
  const [isExpand, setIsExpand] = useState<boolean>(activeIdx === idx);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { data: sectionApiData } = useSectionsApi(spaceId, idx);
  const sectionApiList = useMemo(
    function () {
      if (isConnect && sectionApiData) {
        let ret: any[] = [];
        sectionApiData.apiCategories.forEach((cate) => {
          cate.apis.forEach((api) => {
            ret.push(api);
          });
        });
        return ret;
      }
      return [];
    },
    [sectionApiData, isConnect]
  );
  useEffect(
    function () {
      setIsExpand(() => activeIdx === idx);
    },
    [activeIdx]
  );

  const { mutateAsync } = useMutation({
    mutationFn: function () {
      return apiRequest({
        method: `delete`,
        url: `/api/api-pre/figma-section`,
        params: {
          figmaSectionid: activeIdx,
        },
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.spaceFigmas(spaceId));
      queryClient.invalidateQueries(
        queryKeys.spaceSectionApis(spaceId, activeIdx as number)
      );
      dispatch(DispatchToast('삭제 완료!', true));
    },
    onError: function () {
      dispatch(DispatchToast('에러! 재시도 바랍니다!', false));
    },
  });
  const expandHandler = function (e: FormEvent) {
    e.preventDefault();
    if (idx === activeIdx) {
      setActive(null);
    } else {
      setActive(idx);
    }
  };
  const openDeleteModal = function (e: FormEvent) {
    e.stopPropagation();
    setIsModal(() => true);
  };
  const deleteHandler = function () {
    mutateAsync();
  };
  return (
    <>
      <AnimationBox isOpened={isModal} className="fixed">
        <Modal
          parentClasses="fixed h-[50%] w-[50%]"
          closeModal={() => setIsModal(() => false)}
        >
          <Box
            className={`w-full h-full flex flex-col items-center justify-center p-4`}
          >
            <div className="h-[40%] w-full flex items-center justify-center">
              {figmaData.name}을 지우시겠습니까?
            </div>
            <div className="w-full h-[20%] flex flex-row items-center justify-center gap-5">
              <div
                className="w-[80px] h-[60px] bg-red-500 rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={() => {
                  console.log('실행');
                  deleteHandler();
                  setIsModal(() => false);
                }}
              >
                삭제
              </div>
              <Box
                variant="three"
                className="w-[80px] h-[60px] rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={() => setIsModal(() => false)}
              >
                취소
              </Box>
            </div>
          </Box>
        </Modal>
      </AnimationBox>
      {/* <Box
        variant="three"
        fontType="normal"
        className="pt-3 px-5 whitespace-nowrap w-full h-auto duration-[0.33s] flex flex-col gap-6 pb-4 cursor-pointer"
      > */}
      <div className="flex flex-row items-center justify-between gap-5 w-full">
        <div
          className="w-full text-ellipsis overflow-hidden text-header py-3"
          onClick={expandHandler}
        >
          #{headerIdx + 1} {figmaData.name}
        </div>
        {/* <Button className="text-[1.2rem]" onClick={openDeleteModal}>
            삭제
          </Button> */}
        {activeIdx === idx && (
          <HiOutlineTrash
            className={`text-grayscale-dark hover:text-mammoth-normal text-[24px] cursor-pointer duration-[0.33s]`}
            onClick={openDeleteModal}
          />
        )}
      </div>

      <AnimationBox
        isOpened={isExpand}
        appearClassName="animate-[appear-opacity-softly_0.22s_both]"
        disappearClassName="animate-[disappear-opacity-softly_0.11s_both] relative"
        className="w-full gap-2 flex flex-col"
      >
        <img
          className="object-contain rounded-[8px] w-full"
          src={figmaData.sectionUrl!}
          alt={`${figmaData.name}`}
        />
        {apiData?.length !== 0 && (
          <ul
            className={`w-[95%] my-0 mx-auto flex flex-col gap-1 duration-[0.33s]`}
          >
            {sectionApiList?.map((api) => (
              <APIlistItem key={`figma-${idx}-${api.id}-api`} item={api} />
            ))}
          </ul>
        )}
      </AnimationBox>
    </>
  );
};

export default FigmaListItem;
