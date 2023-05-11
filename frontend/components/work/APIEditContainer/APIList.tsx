import APIlistItem from '@/components/apis/APIlistItem';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { AiOutlineMore } from 'react-icons/ai';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useSectionsApi, useSpaceApis } from '@/hooks/queries/queries';

export type APIWritterType = {
  id: string | number;
  name: string;
  email: string;
  profileImg: string;
};

export type APIInfoType = {
  id: string | number;
  name: string;
  description: string;
  method:
    | 'PUT'
    | 'GET'
    | 'POST'
    | 'DEL'
    | 'PATCH'
    | `put`
    | `get`
    | `post`
    | `del`
    | `patch`;
  status: '명세중' | '명세완료' | '개발중' | '개발완료';
  writter?: APIWritterType;
};

export type APIListType = {
  categoryId: string | number;
  categoryName: string;
  apis: APIInfoType[];
};

type APIListPropsType = {
  apiList: APIListType[];
  checkedAPIList?: APIListType[] | undefined;
  checkBox?: boolean;
};

const APIList = function ({
  apiList = [],
  checkedAPIList = undefined,
  checkBox = false, // checkbox===true이면 -> figma화면이랑 api 연결중!
}: APIListPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [curCateIdx, setCurCateIdx] = useState<number>(0);
  const [refinedCheckedList, setRefinedCheckedList] = useState<
    (number | string)[]
  >([]);

  const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);

  // const {data: sectionApiList} = useSectionsApi(spaceId, sectionId, selectedMethod, searchInputData)
  const { data: sectionApiList } = useSectionsApi(spaceId, 1);

  useEffect(() => {
    console.log(refinedCheckedList, '<<<<<<<<<<<<<<<<<<<<<');
  }, [refinedCheckedList]);

  const onToggleCheck = (apiId: number | string, check: boolean): void => {
    setRefinedCheckedList((prev) =>
      check ? [...prev, apiId] : [...prev.filter((id) => id !== apiId)]
    );
  };

  const onClickOpenCate = (cateID: string | number, cateIdx: number): void => {
    setCurCateIdx(cateIdx);
  };

  useEffect(() => {
    setRefinedCheckedList(() => {
      let selectedIds: (number | string)[] = [];
      // sectionApiList?.apiCategories;
      checkedAPIList
        ?.map((cate: APIListType) => {
          return cate.apis.map((api: APIInfoType) => api.id);
        })
        .map((arr: (number | string)[]) => {
          selectedIds = [...selectedIds, ...arr];
        });
      return selectedIds;
    });
  }, [checkedAPIList]);

  return (
    <ul
      className={`h-full w-full overflow-y-scroll scrollbar-hide flex flex-col items-center gap-3`}
    >
      {apiList.map((cate, cateIdx) => (
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
                checked={!!refinedCheckedList.find((id) => id === api.id)}
                item={api}
                className={`w-full duration-[0.33s] hover:scale-[101%]`}
                checkedList={checkBox ? refinedCheckedList : undefined}
                onToggleCheck={onToggleCheck}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default APIList;
