import { Dispatch, SetStateAction, useState } from 'react';
import { BsCheck } from 'react-icons/bs';

type CheckBoxPropsType = {
  isChecked: boolean;
  onToggleCheck: () => void;
  className?: string;
};

const CheckBox = function ({
  isChecked,
  onToggleCheck,
  className,
}: CheckBoxPropsType): JSX.Element {
  return (
    <div className={`${className}`}>
      <div
        onClick={onToggleCheck}
        className={`flex justify-center items-center w-[20px] h-[20px] rounded-[4px] border-theme-white-normal border-[1px] cursor-pointer`}
      >
        {isChecked && <BsCheck />}
      </div>
      <input
        title="checkbox"
        type="checkbox"
        checked={isChecked ? true : false}
        className={`hidden`}
      />
    </div>
  );
};

export default CheckBox;
