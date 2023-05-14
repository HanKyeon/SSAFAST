import { defaultTypes } from '@/utils/constraints';
import AnimationBox from '@/components/common/AnimationBox';
import { ApiCreateForm } from './ApiWrite';
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form';
import { Box, CircleBtn } from '@/components/common';
import { useState } from 'react';
import { useDtoList } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useStoreSelector } from '@/hooks/useStore';

interface Props {
  item: FieldArrayWithId<ApiCreateForm, 'document.request.headers', 'id'>;
  index: number;
  formName: string;
  remove: (index: number) => void;
}

const HeaderController = function ({ item, index, formName, remove }: Props) {
  const { control, getValues, watch } = useFormContext();
  const { dark } = useStoreSelector((state) => state.dark);
  const [typeData, setTypeData] = useState<string | number>(``);
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: dtoListData } = useDtoList(spaceId);

  const getTypeValue = function () {
    // console.log(getValues(formName)[index].type);
    setTypeData(() => getValues(formName)[index].type);
  };

  return (
    <AnimationBox
      key={`${item.id}-container`}
      className="flex flex-col w-full items-center pl-12"
    >
      <Box
        variant="three"
        className="px=3 py-2 flex flex-row gap-3 w-full items-center"
      >
        <Controller
          key={`${formName}-keyName-${index}`}
          name={`${formName}.${index}.keyName`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[23%] px-5">
              {/* <label>이름</label> */}
              <input
                name={`${formName}.${index}.typeName`}
                onChange={field.onChange}
                value={field.value}
                title={field.value}
                placeholder="Key"
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light truncate px-2"
              />
            </div>
          )}
        />
        <Controller
          key={`${formName}-type-${item.id}`}
          name={`${formName}.${index}.type`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[17%] px-3">
              {/* <label>타입</label> */}
              <select
                name={`${formName}.${index}.type`}
                onChange={(v) => {
                  field.onChange(v);
                  getTypeValue();
                }}
                value={field.value}
                placeholder="Type"
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light aria-selected:bg-black px-2"
              >
                <option value={``}>Type</option>
                {defaultTypes.map((type) => {
                  return (
                    <option
                      key={`${type.id}-${type.desc}-${index}`}
                      value={type.id}
                      title={type.desc}
                    >
                      {type.name}
                    </option>
                  );
                })}
                {dtoListData?.dtoList.map((dto) => {
                  return (
                    <option
                      key={`${dto.id}-dtoType-${index}`}
                      value={dto.id}
                      title={dto.description}
                    >
                      {dto.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        />
        <Controller
          key={`${formName}.${index}.desc`}
          name={`${formName}.${index}.desc`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-row gap-2 w-[48%] px-4">
              {/* <label>설명</label> */}
              <input
                name={`${formName}.${index}.desc`}
                onChange={field.onChange}
                value={field.value}
                className="w-full flex items-center justify-center outline-none border-b-[3px] border-b-grayscale-dark bg-opacity-0 bg-theme-white-light"
                placeholder="Description"
              />
            </div>
          )}
        />
        <CircleBtn
          type="button"
          btnType="delete"
          onClick={() => remove(index)}
        ></CircleBtn>
      </Box>
    </AnimationBox>
  );
};

export default HeaderController;
