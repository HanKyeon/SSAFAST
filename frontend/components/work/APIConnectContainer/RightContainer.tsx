import { Button, Input } from '@/components/common';
import EomSelect from '@/components/common/EomSelect';
import { BsCheckLg, BsFilter, BsFolderPlus } from 'react-icons/bs';
import { HiOutlineSearch, HiPencil } from 'react-icons/hi';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useMappingApi } from '@/hooks/queries/mutations';
import {
  EachCate,
  EachCateApi,
  SpaceApiList,
  useSectionsApi,
  useSpaceApis,
} from '@/hooks/queries/queries';
import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import APIConnectList from './APIConnectList';

type RightContainerPropsType = {
  sectionId: string | number;
};

const RightContainer = function ({
  sectionId,
}: RightContainerPropsType): JSX.Element {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: checkedAPIList,
    // isLoading,
    // isError,
  } = useSectionsApi(spaceId, sectionId);
  const {
    data: allAPIList,
    //  isLoading,
    //   isError,
  } = useSpaceApis(spaceId);
  const { mutate, mutateAsync } = useMappingApi(spaceId, sectionId);

  const [filterIdx, setFilterIdx] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [refinedCheckedList, setRefinedCheckedList] = useState<
    (number | string)[]
  >([]);

  const handleButton = (e: FormEvent, saveBtn: boolean) => {
    e.preventDefault();
    if (saveBtn) {
      // refinedCheckList DB에 날려!
      mutateAsync(refinedCheckedList)
        .then((res) => {
          dispatch(DispatchToast('매핑 완료!', true));
        })
        .catch((err) => {
          dispatch(DispatchToast('매핑 실패! 재시도 바랍니다.', false));
        });
    }
    setIsSaved((prev) => !prev);
  };

  const onToggleCheck = (apiId: number | string, check: boolean): void => {
    setRefinedCheckedList((prev) =>
      check ? [...prev, apiId] : prev.filter((id) => id !== apiId)
    );
  };

  useEffect(() => {
    setRefinedCheckedList(() => {
      let selectedIds: (number | string)[] = [];
      // sectionApiList?.apiCategories;
      checkedAPIList?.apiCategories
        ?.map((cate: EachCate) => {
          return cate.apis.map((api: EachCateApi) => api.id);
        })
        .map((arr: (number | string)[]) => {
          selectedIds = [...selectedIds, ...arr];
        });
      return selectedIds;
    });
  }, [checkedAPIList]);

  return (
    <>
      {/* 헤더 */}
      <div className={`w-full h-[7%] mb-4 flex items-center justify-between`}>
        <div className={`flex items-center gap-2`}>
          <BsFilter className={`text-[26px]`} />
          {/* <EomSelect
            type="methods"
            selectedIdx={filterIdx}
            setSelectedIdx={setFilterIdx}
          /> */}
        </div>
        <div className={`flex items-center gap-2`}>
          {/* <Input placeholder="search" />
          <HiOutlineSearch className={`text-[22px] cursor-pointer`} /> */}
        </div>
        {/* <BsFolderPlus
          className={`text-[22px] cursor-pointer hover:text-mincho-strong duration-[0.33s]`}
        /> */}
        {isSaved ? (
          <Button
            isEmpty
            className={`w-[125px] flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
            onClick={(e) => handleButton(e, false)}
          >
            편집
            <HiPencil />
          </Button>
        ) : (
          <Button
            className={`w-[125px] flex justify-center items-center gap-2 py-[4px] pr-[12px] pl-[25px]`}
            onClick={(e) => handleButton(e, true)}
          >
            <b className={``}>{refinedCheckedList.length}</b>저장
            <BsCheckLg />
          </Button>
        )}
      </div>
      <APIConnectList
        apiList={isSaved ? checkedAPIList : allAPIList}
        selectedId={sectionId as number}
        checkedIds={!isSaved ? refinedCheckedList : undefined}
        checkBox={!isSaved} // 체크박스 달고있을지 말지
        onToggleCheck={onToggleCheck}
      />
    </>
  );
};

export default RightContainer;
