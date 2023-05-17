import { Dispatch, SetStateAction, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const methods = ['전체', 'GET', 'PUT', 'POST', 'DEL', 'PATCH'];

type EomSelectPropsType = {
  type: 'methods' | 'type';
  options?: any[];
  selectedIdx: number;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
};

const EomSelect = function ({
  type = 'methods',
  options = methods,
  selectedIdx,
  setSelectedIdx,
}: EomSelectPropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ToggleOptionBox = (): void => {
    setIsOpen((prev) => !prev);
  };
  const onClickOption = (option: string, index: number): void => {
    setSelectedIdx(index);
    ToggleOptionBox();
  };

  return (
    <div className={`relative w-[90px] text-content`}>
      {/* select box */}
      <div
        className={`flex items-center justify-between w-full cursor-pointer`}
        onClick={ToggleOptionBox}
      >
        <span className={`flex-1 text-center`}>{options[selectedIdx]}</span>
        <MdKeyboardArrowDown className={`text-[22px]`} />
      </div>
      {/* option들 뿅 나오는 */}
      {isOpen && (
        <ul
          className={`absolute z-10 bg-grayscale-deepdarkdeep rounded-[8px] w-full shadow-lg`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`text-center py-1 border-t-[1px] border-grayscale-dark first:border-none cursor-pointer`}
              onClick={() => onClickOption(option, index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EomSelect;
