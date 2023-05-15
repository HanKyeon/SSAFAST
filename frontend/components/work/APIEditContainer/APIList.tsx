import APIlistItem from '@/components/apis/APIlistItem';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { AiOutlineMore } from 'react-icons/ai';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import {
  SpaceApiList,
  useSectionsApi,
  useSpaceApis,
} from '@/hooks/queries/queries';

type APIListPropsType = {
  apiList: SpaceApiList;
  checkedIds?: (number | string)[];
  checkBox?: boolean;
  onToggleCheck?: (apiId: number | string, check: boolean) => void;
  selectedId?: number;
  setSelectedIdHandler?: (id: number) => void;
};

const APIList = function ({
  apiList = { apiCategories: [] },
  checkedIds = [],
  checkBox = false, // checkbox===true이면 -> figma화면이랑 api 연결중!
  onToggleCheck,
  selectedId,
  setSelectedIdHandler,
}: APIListPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [curCateIdx, setCurCateIdx] = useState<number>(0);

  const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);

  // const {data: sectionApiList} = useSectionsApi(spaceId, sectionId, selectedMethod, searchInputData)
  const { data: sectionApiList } = useSectionsApi(spaceId, 1);

  const onClickOpenCate = (cateID: string | number, cateIdx: number): void => {
    setCurCateIdx(cateIdx);
  };

  return (
    <ul
      className={`h-full w-full overflow-y-scroll scrollbar-hide flex flex-col items-center gap-3`}
    >
      {apiList.apiCategories.map((cate, cateIdx) => (
        <li key={`${cate.categoryId}_${cateIdx}`} className={`w-full`}>
          {/* 카테고리 */}
          <div className={`mb-1 flex items-center gap-3`}>
            <div
              className={`flex items-center gap-3 cursor-pointer`}
              onClick={() => onClickOpenCate(cate.categoryId, cateIdx)}
            >
              <i className={`text-[20px]`}>
                {curCateIdx === cateIdx ? (
                  <BsFolder2Open />
                ) : (
                  <BsFolder className={`mt-[2px]`} />
                )}
              </i>
              <span>{cate.categoryName}</span>
            </div>
            <AiOutlineMore
              className={`text-grayscale-dark hover:text-theme-white-strong`}
            />
          </div>
          {/* api 목록 */}
          <ul
            className={`w-[90%] my-0 mx-auto flex flex-col items-center gap-1 duration-[0.33s] ${
              curCateIdx === cateIdx ? '' : 'hidden'
            }`}
          >
            {cate.apis.map((api, apiIdx) => (
              <APIlistItem
                key={`${api.id}_${apiIdx}`}
                checkBox={checkBox} // 체크박스 달고있는 list
                checked={!!checkedIds.find((id) => id === api.id)}
                item={api}
                className={`w-full duration-[0.33s] hover:scale-[101%]`}
                // checkedList={checkBox ? refinedCheckedList : undefined}
                onToggleCheck={onToggleCheck}
                setSelectedIdHandler={setSelectedIdHandler}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default APIList;
