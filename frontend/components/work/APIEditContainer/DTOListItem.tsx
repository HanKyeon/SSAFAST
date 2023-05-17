import { useStoreSelector } from '@/hooks/useStore';

interface Props {
  dtoName: string;
  dtoDesc: string;
  dtoId: string | number;
  selectedId: number | string | null;
  setSelected: (id: string | number) => void;
}

const DTOListItem = function ({
  dtoDesc,
  dtoName,
  dtoId,
  setSelected,
  selectedId,
}: Props) {
  const selectHandler = function () {
    setSelected(dtoId);
  };
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <div
      className={`w-full flex flex-row h-[6%] border-b-[2px] cursor-pointer duration-[0.33s] hover:scale-y-105 ${
        selectedId !== dtoId
          ? 'border-b-grayscale-dark'
          : dark
          ? 'border-b-mincho-strong text-mincho-strong'
          : 'border-b-taro-strong text-taro-strong'
      }`}
      onClick={selectHandler}
    >
      <div className="w-[30%] h-full flex px-2 truncate">{dtoName}</div>
      <div className="w-[70%] h-full flex px-2 truncate">{dtoDesc}</div>
    </div>
  );
};

export default DTOListItem;
