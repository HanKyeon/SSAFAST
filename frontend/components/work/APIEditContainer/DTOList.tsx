import { useDtoList } from '@/hooks/queries/queries';
import DTOListItem from './DTOListItem';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

interface Props {
  setSelected: (id: number | string) => void;
  selectedId: number | string | null;
}

const DTOList = function ({ setSelected, selectedId }: Props) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: DtoListData } = useDtoList(parseInt(spaceId));

  return (
    <div className="w-full h-[92%] overflow-y-scroll flex flex-col gap-3">
      {DtoListData &&
        DtoListData?.dtoList.map((dto) => {
          return (
            <DTOListItem
              key={`${dto.id}-dto-list-item`}
              dtoDesc={dto.desc}
              dtoName={dto.name}
              dtoId={dto.id}
              selectedId={selectedId}
              setSelected={setSelected}
            />
          );
        })}
    </div>
  );
};

export default DTOList;
