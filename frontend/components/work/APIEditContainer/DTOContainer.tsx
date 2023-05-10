import { Box, Button } from '@/components/common';
import { DtoForm } from '@/components/forms';
import {
  DtoFieldInCompo,
  DtoInterfaceInForm,
} from '@/components/forms/DtoForm';
import { useStoreSelector } from '@/hooks/useStore';
import { RiAddCircleLine } from 'react-icons/ri';
import { useForm, FormProvider } from 'react-hook-form';

// 상수 스타일
const addBtnStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-mincho-strong active:border-teal-600 text-mincho-strong'
      : 'border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong'
  }` as const;

const DTOContainer = function () {
  const { dark } = useStoreSelector((state) => state.dark);
  const methods = useForm<DtoInterfaceInForm>();
  const { handleSubmit, control, getValues } = methods;

  return (
    <Box
      variant="one"
      fontType="header"
      className="h-full w-full flex flex-row gap-[1.12%]"
    >
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center p-4 flex flex-col"
      >
        <div className="h-[8%] w-full flex flex-row items-center justify-between">
          <div className="text-[36px]">DTO List</div>
          <div
            className={`border-[3px] rounded-full px-5 py-2 flex items-center justify-center cursor-pointer duration-[0.33s] hover:scale-105 gap-1 ${addBtnStyle(
              dark
            )}`}
          >
            <div>Add DTO</div>
            <RiAddCircleLine className="text-[24px]" />
          </div>
        </div>
        <div className="h-[92%] w-full flex flex-col overflow-y-scroll">
          <div className="w-full flex flex-row">
            <div>DTO Name</div>
            <div>Description</div>
          </div>
        </div>
      </Box>
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center p-5 flex flex-col"
      >
        <DtoForm methods={methods} />
      </Box>
    </Box>
  );
};

export default DTOContainer;
