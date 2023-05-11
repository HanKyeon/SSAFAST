interface Props {
  dtoName: string;
  dtoDesc: string;
  dtoId: string | number;
  setSelected: (id: string | number) => void;
}

const DTOListItem = function ({ dtoDesc, dtoName, dtoId, setSelected }: Props) {
  const selectHandler = function () {
    setSelected(dtoId);
  };
  return (
    <div
      className="w-full flex flex-row h-[6%] border-b-[2px] border-b-grayscale-dark"
      onClick={selectHandler}
    >
      <div className="w-[30%] h-full flex px-2 truncate">{dtoName}</div>
      <div className="w-[70%] h-full flex px-2 truncate">{dtoDesc}</div>
    </div>
  );
};

export default DTOListItem;
