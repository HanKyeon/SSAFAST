import APIlistItem from '@/components/apis/APIlistItem';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { AiOutlineMore } from 'react-icons/ai';
import {
  FormEvent,
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

const checkedMok: SpaceApiList = {
  apiCategories: [
    {
      categoryId: 1,
      categoryName: 'user',
      apis: [
        {
          id: 1,
          name: '전체 회원 목록',
          description: '아무튼 다 가져오는거',
          method: 1,
          status: 1,
          writter: {
            id: 1,
            name: '로사짱',
            email: 'a@naver.com',
            profileImg: 'anjanj.png',
          },
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: 'mypage',
      apis: [
        {
          id: 4,
          name: '내 정보 수정',
          description: '내 정보를 막 수정해버려',
          method: 2,
          status: 1,
          writter: {
            id: 1,
            name: '로사짱',
            email: 'a@naver.com',
            profileImg: 'anjanj.png',
          },
        },
        {
          id: 5,
          name: '전체 회원 목록',
          description: '아무튼 다 가져오는거',
          method: 1,
          status: 2,
          writter: {
            id: 1,
            name: '로사짱',
            email: 'a@naver.com',
            profileImg: 'anjanj.png',
          },
        },
        {
          id: 7,
          name: '회원가입',
          description: '아무튼 가입',
          method: 4,
          status: 4,
          writter: {
            id: 1,
            name: '로사짱',
            email: 'a@naver.com',
            profileImg: 'anjanj.png',
          },
        },
        {
          id: 8,
          name: '전체 회원 목록',
          description: '아무튼 다 가져오는거',
          method: 3,
          status: 3,
          writter: {
            id: 1,
            name: '로사짱',
            email: 'a@naver.com',
            profileImg: 'anjanj.png',
          },
        },
      ],
    },
  ],
};

type APIListPropsType = {
  apiList?: SpaceApiList;
  checkedIds?: (number | string)[];
  checkBox?: boolean;
  onToggleCheck?: (apiId: number | string, check: boolean) => void;
  selectedId?: number;
  setSelectedIdHandler?: (id: number) => void;
  onClickApi?: (api: UseTestApiCompactType) => void;
};

const ApiList = function ({
  apiList = checkedMok,
  checkedIds = [],
  checkBox = false, // checkbox===true이면 -> figma화면이랑 api 연결중!
  onToggleCheck,
  selectedId,
  setSelectedIdHandler,
  onClickApi,
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
  // const {data: sectionApiList} = useSectionsApi(spaceId, sectionId, selectedMethod, searchInputData)
  const { data: sectionApiList } = useSectionsApi(spaceId, 1);

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

  return (
    <>
      <ul
        className={`h-full w-full overflow-y-scroll scrollbar-hide flex flex-col items-center gap-3`}
      >
        {spaceApiList?.apiCategories?.map((cate, cateIdx) => (
          <>
            {isUpdateModal && (
              <Modal
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
                {isModal && (
                  <ul
                    className={`absolute z-10 bg-grayscale-deepdarkdeep rounded-[8px] w-full shadow-lg`}
                  >
                    <li
                      key={`${cate.categoryId}_${cateIdx}_update`}
                      className={`text-center py-1 border-t-[1px] border-grayscale-dark first:border-none cursor-pointer`}
                      onClick={openUpdateModal}
                    >
                      수정
                    </li>
                    <li
                      key={`${cate.categoryId}_${cateIdx}_delete`}
                      className={`text-center py-1 border-t-[1px] border-grayscale-dark first:border-none cursor-pointer`}
                      onClick={openDeleteModal}
                    >
                      삭제
                    </li>
                  </ul>
                )}
                <span>{cate.categoryName}</span>
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
                {cate?.apis?.map((api, apiIdx) => (
                  <APIlistItem
                    key={`${api.id}-${apiIdx}-apiz`}
                    checkBox={checkBox} // 체크박스 달고있는 list
                    checked={!!checkedIds.find((id) => id === api.id)}
                    item={api}
                    className={`w-full duration-[0.33s] hover:scale-[101%]`}
                    // checkedList={checkBox ? refinedCheckedList : undefined}
                    onToggleCheck={onToggleCheck}
                    setSelectedIdHandler={setSelectedIdHandler}
                    onClickApi={onClickApi ? onClickApi : undefined}
                  />
                ))}
              </ul>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default ApiList;
