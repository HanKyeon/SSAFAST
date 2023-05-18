import APIlistItem from '@/components/apis/APIlistItem';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { AiOutlineMore } from 'react-icons/ai';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import {
  SpaceApiList,
  useSectionsApi,
  useSpaceApis,
} from '@/hooks/queries/queries';
import {
  useDeleteCategory,
  useUpdateCategory,
} from '@/hooks/queries/mutations';
import Modal from '@/components/common/Modal';
import AnimationBox from '@/components/common/AnimationBox';
import { Box, Button, Input } from '@/components/common';
import useInput from '@/hooks/useInput';
import { UseTestApiCompactType } from '../APITestContainer/usecase/UseTestContainer';

type APIListPropsType = {
  isFiltered?: boolean;
  onToggleCheck?: (apiId: number | string, check: boolean) => void;
  selectedId?: number;
  setSelectedIdHandler?: (id: number) => void;
  onClickApi?: (api: UseTestApiCompactType) => void;
  toggleAddHandler?: () => void;
  apiIdHandler?: (id: number | string) => void;
};

const ApiList = function ({
  isFiltered = false,
  toggleAddHandler,
  onClickApi,
  apiIdHandler,
  setSelectedIdHandler,
}: APIListPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const [curCateIdx, setCurCateIdx] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);

  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);

  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);

  const closeUpdateModal = useCallback(function () {
    setIsUpdateModal(() => false);
  }, []);

  const openUpdateModal = useCallback(function () {
    setIsUpdateModal(() => true);
  }, []);

  const closeDeleteModal = useCallback(function () {
    setIsDeleteModal(() => false);
  }, []);

  const openDeleteModal = useCallback(function () {
    setIsDeleteModal(() => true);
  }, []);

  const categoryRef = useRef<HTMLInputElement>(null);
  const {
    inputData: categoryInput,
    onChangeHandler: categoryChange,
    onResetHandler: categoryReset,
  } = useInput(categoryRef);

  const { data: spaceApiList, isLoading, isError } = useSpaceApis(spaceId);
  // const { data: filteredApiList } = useSpaceApis(spaceId, [1, 3]);

  const onClickOpenCate = (cateID: string | number, cateIdx: number): void => {
    setCurCateIdx(cateIdx);
  };

  const { mutate: updateMutate, mutateAsync: updateMutateAsync } =
    useUpdateCategory(parseInt(spaceId));
  const { mutate: deleteMutate, mutateAsync: deleteMytateAsync } =
    useDeleteCategory(parseInt(spaceId));

  const categoryUpdate = function (categoryId: number) {
    console.log(categoryInput);
    updateMutate({ categoryId: categoryId, categoryName: categoryInput });
    closeUpdateModal();
  };

  const categoryDelete = function (categoryId: number) {
    deleteMutate(categoryId);
    closeDeleteModal();
  };
  // useEffect(
  //   function () {
  //     if (isFiltered) {
  //       spaceApiList?.apiCategories.filter((data) => {
  //         return data.apis.map((item, index) => {
  //           item.method % 2;
  //         });
  //       });
  //       console.log('spaceApiList"::::::::', spaceApiList);
  //     }
  //   },
  //   [spaceApiList]
  // );
  return (
    <ul
      className={`h-full w-full overflow-y-scroll scrollbar-hide flex flex-col items-center gap-3`}
    >
      {spaceApiList?.apiCategories?.map((cate, cateIdx) => (
        <>
          {isUpdateModal && (
            <Modal
              key={`${cate.categoryId}-modal-${cate.categoryName}`}
              closeModal={closeUpdateModal}
              parentClasses="h-[50%] w-[50%]"
            >
              <AnimationBox className="w-full h-full">
                <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
                  <div className="text-[24px]">
                    카테고리 이름을 수정해주세요.
                  </div>
                  <div className="min-w-[220px]">
                    <Input
                      className="text-center"
                      value={cate.categoryName}
                      inputref={categoryRef}
                      onChange={categoryChange}
                      placeholder={cate.categoryName}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="flex items-center justify-center text-center rounded-[8px]"
                      onClick={(e) => {
                        e.preventDefault();
                        categoryUpdate(cate.categoryId);
                      }}
                    >
                      생성
                    </Button>
                    <Button
                      className="text-center rounded-[8px] border !border-red-500 !bg-red-500"
                      onClick={closeUpdateModal}
                    >
                      닫기
                    </Button>
                  </div>
                </Box>
              </AnimationBox>
            </Modal>
          )}
          {isDeleteModal && (
            <Modal
              key={`${cate.categoryId}-delete-modal`}
              closeModal={closeDeleteModal}
              parentClasses="h-[50%] w-[50%]"
            >
              <AnimationBox className="w-full h-full">
                <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
                  <div className="text-[24px]">
                    카테고리를 정말 삭제 하시겠습니까?
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="flex items-center justify-center text-center rounded-[8px] border !border-red-500 !bg-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        categoryDelete(cate.categoryId);
                      }}
                    >
                      삭제
                    </Button>
                    <Box
                      variant="three"
                      className="text-center rounded-[8px] cursor-pointer "
                      onClick={closeDeleteModal}
                    >
                      닫기
                    </Box>
                  </div>
                </Box>
              </AnimationBox>
            </Modal>
          )}
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
                onClick={openModal}
              />
            </div>
            {/* api 목록 */}
            <ul
              className={`w-[90%] my-0 mx-auto flex flex-col items-center gap-1 duration-[0.33s] ${
                curCateIdx === cateIdx ? '' : 'hidden'
              }`}
            >
              {cate?.apis?.map((api, apiIdx) => (
                <APIlistItem
                  key={`${api.id}-${apiIdx}-apiz`}
                  item={api}
                  className={`w-full duration-[0.33s] hover:scale-[101%]`}
                  onClickApi={onClickApi ? onClickApi : undefined}
                  toggleAddHandler={toggleAddHandler}
                  apiIdHandler={apiIdHandler}
                  setSelectedIdHandler={setSelectedIdHandler}
                />
              ))}
            </ul>
          </li>
        </>
      ))}
    </ul>
  );
};

export default ApiList;
