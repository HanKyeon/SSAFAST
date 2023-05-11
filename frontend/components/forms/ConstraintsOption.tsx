import useInput from '@/hooks/useInput';
import { useRef } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

interface Props {
  typeData: string | number;
  AddConstraint: (val: string) => void;
}

interface SelectValue {
  selected: string | number;
}

const ConstraintsOption = function ({ typeData, AddConstraint }: Props) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputData } = useInput(inputRef);
  return (
    <div className="w-full flex flex-row gap-2">
      <select ref={selectRef}>
        <option value={``}>ㅎㅇ</option>
      </select>
      <input ref={inputRef} className="text-grayscale-deepdarklight" />
      <div>추가하기</div>
    </div>
  );
};

export default ConstraintsOption;

const StringOption = function () {
  return (
    <>
      <option>
        ㅇ
        <input type="number" />
      </option>
    </>
  );
};

const NumberOption = function () {
  return (
    <>
      <option>d</option>
      <input type="number" />
    </>
  );
};

export { StringOption, NumberOption };
