import { Box, Button } from '@/components/common';
import { DtoForm } from '@/components/forms';
import {
  DtoFieldInCompo,
  DtoInterfaceInForm,
} from '@/components/forms/DtoForm';
import { useStoreSelector } from '@/hooks/useStore';
import { RiAddCircleLine } from 'react-icons/ri';
import { useForm, FormProvider } from 'react-hook-form';
import DTOList from './DTOList';
import { useEffect, useMemo, useState } from 'react';
import { useDtoDetail } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

// 상수 스타일
const addBtnStyle = (dark: boolean) =>
  `${
    dark
      ? 'border-mincho-strong active:border-teal-600 text-mincho-strong'
      : 'border-taro-strong active:border-opacity-100 border-opacity-80 text-taro-strong'
  }` as const;

const DTOContainer = function () {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { dark } = useStoreSelector((state) => state.dark);

  const [selectedDtoItem, setSelectedDtoItem] = useState<
    number | string | null
  >(null);
  const { data, isLoading, isError } = useDtoDetail(
    spaceId,
    selectedDtoItem || ``
  );
  const [defaultData, setDefaultData] = useState<DtoInterfaceInForm>({
    desc: ``,
    fields: [],
    name: ``,
  });

  useEffect(
    function () {
      if (!selectedDtoItem) {
        setDefaultData(() => {
          return {
            desc: ``,
            fields: [],
            name: ``,
          };
        });
      } else {
        // data에 따른 default setting
      }
    },
    [data, selectedDtoItem]
  );

  // 여기 defaultData를 data 변경한 것으로 바꾸고,
  const methods = useForm<DtoInterfaceInForm>({ defaultValues: defaultData });
  const { handleSubmit, control, getValues } = methods;

  const resetSelectedHandler = function () {
    setSelectedDtoItem(() => null);
  };

  const selectDtoHandler = function (id: string | number) {
    setSelectedDtoItem(() => id);
  };

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
            onClick={resetSelectedHandler}
          >
            <div>Add DTO</div>
            <RiAddCircleLine className="text-[24px]" />
          </div>
        </div>
        <div className="h-[92%] w-full flex flex-col overflow-y-scroll gap-3">
          <div className="w-full h-[8%] flex flex-row text-[24px]">
            <div className="w-[30%] h-full flex items-center justify-center border-b-[3px] border-b-grayscale-dark">
              DTO Name
            </div>
            <div className="w-[70%] h-full flex items-center justify-center border-b-[3px] border-b-grayscale-dark">
              Description
            </div>
          </div>
          <DTOList setSelected={selectDtoHandler} />
        </div>
      </Box>
      <Box
        variant="two"
        fontType="normal"
        className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center p-5 flex flex-col"
      >
        <DtoForm
          methods={methods}
          resetSelected={resetSelectedHandler}
          selectedId={selectedDtoItem}
        />
      </Box>
    </Box>
  );
};

export default DTOContainer;
