import BoxHeader from '@/components/common/BoxHeader';
import SideApiItem from './SideApiItem';
import { UseTestApiCompactType } from './UseTestContainer';
import { HiPlusCircle } from 'react-icons/hi';
import { Box, Button } from '@/components/common';
import { UsecaseListItemType, useUsecaseDetail } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useTestUsecase } from '@/hooks/queries/mutations';

type SideContainerPropsType = {
  curUsecase: UsecaseListItemType;
  apis: UseTestApiCompactType[];
  onClickApi: (api: UseTestApiCompactType) => void;
  onClickAddApiBtn: () => void;
};

const SideContainer = function ({
  curUsecase,
  apis,
  onClickApi,
  onClickAddApiBtn,
}: SideContainerPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: ucData,
    isLoading,
    isError,
  } = useUsecaseDetail(
    spaceId,
    curUsecase.id,
    curUsecase.isNew ? curUsecase.isNew : false
  );

  return (
    <Box
      variant="two"
      fontType="normal"
      className="basis-[25%] w-[25%] h-full p-5 flex flex-col gap-6"
    >
      {/* usecase TITLE */}
      <div className={`w-full`}>
        <BoxHeader title="info" className={`!pb-1`} />
        <span className={`text-content`}>
          {curUsecase.isNew
            ? curUsecase.name
            : ucData
            ? ucData.name
            : '뭐 없다 안된다?'}
        </span>
        <p className={`text-small text-grayscale-deeplightlight`}>
          {curUsecase.isNew
            ? curUsecase.desc
            : ucData
            ? ucData.desc
            : '뭐 없다 안된다?'}
        </p>
      </div>
      {/* api 순서대로 조록 */}
      <div className={`w-full flex-1 flex flex-col min-h-0`}>
        <BoxHeader title="order" className={`!pb-1`} />
        <div className={`flex-1 overflow-scroll scrollbar-hide`}>
          <ul>
            {apis.length > 0 &&
              apis.map((api: UseTestApiCompactType, idx: number) => (
                <SideApiItem
                  key={`${api.id}_${idx}`}
                  api={api}
                  onClickApi={() =>
                    onClickApi({
                      id: api.id,
                      method: api.method,
                      name: api.name,
                      idx,
                    })
                  }
                />
              ))}
          </ul>
          <div
            className={`flex gap-2 justify-center items-center border-[1px] border-grayscale-dark py-2 border-dashed rounded-[8px] text-grayscale-dark mt-4 cursor-pointer`}
            onClick={onClickAddApiBtn}
          >
            Add api <HiPlusCircle />
          </div>
        </div>
      </div>
      {/* 버튼 wrapper */}
      <div className={`w-full flex gap-3`}>
        <Button
          type="button"
          className={`flex-1 !bg-mammoth-normal !border-mammoth-normal !py-1`}
        >
          초기화
        </Button>
        <Button type="submit" className={`flex-1 !py-1`}>
          실행
        </Button>
      </div>
    </Box>
  );
};

export default SideContainer;
