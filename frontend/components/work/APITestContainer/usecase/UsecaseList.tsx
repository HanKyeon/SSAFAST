import {
  UsecaseListItemType,
  useUsecaseDetail,
  useUsecaseList,
} from '@/hooks/queries/queries';
import { useStoreSelector } from '@/hooks/useStore';
import { SpaceParams } from '@/pages/space';
import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils';
import { useRouter } from 'next/router';
import { BiMessageError } from 'react-icons/bi';

type UsecaseListPropsType = {
  onClickUsecaseItem: (usecase: UsecaseListItemType) => void;
};

const UsecaseList = function ({
  onClickUsecaseItem,
}: UsecaseListPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const { data: list, isLoading, isError } = useUsecaseList(spaceId);

  return (
    <>
      {list && list.length > 0 ? (
        <div className={`w-full flex-1 min-h-0 flex flex-col mb-2`}>
          <div
            className={`w-full flex gap-3 text-grayscale-dark text-content py-3 text-center`}
          >
            <div className={`w-[150px]`}>Name</div>
            <div className={`flex-1`}>Description</div>
          </div>
          <ul
            className={`flex flex-col w-full flex-1 overflow-scroll scrollbar-hide`}
          >
            {list.map((item: UsecaseListItemType, idx: number) => (
              <li
                key={`${item.id}_${idx}`}
                className={`w-full flex items-center gap-3 p-2 rounded-[8px] cursor-pointer ${
                  isDark
                    ? 'hover:bg-grayscale-deepdarkdeep'
                    : 'hover:bg-grayscale-light'
                }`}
                onClick={() => onClickUsecaseItem(item)}
              >
                <div className={`w-[150px]`}>{item.name}</div>
                <div className={`flex-1`}>{item.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-2 items-center justify-center flex-1 w-full`}
        >
          <BiMessageError className={`text-[24px] text-grayscale-dark`} />
          <p className={`text-content text-grayscale-dark`}>
            새 유스케이스를 생성해주세요.
          </p>
        </div>
      )}
    </>
  );
};

export default UsecaseList;
