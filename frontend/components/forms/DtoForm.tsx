import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  FormProvider,
  Controller,
  useController,
} from 'react-hook-form';
import { Form, Input, Select } from './components';
import { Box, Button } from '../common';
import {
  UseFormRegister,
  UseFieldArrayRemove,
  FieldArrayWithId,
  UseFormReturn,
} from 'react-hook-form/dist/types';
import { DtoDetail, getDtoDetail, useDtoList } from '@/hooks/queries/queries';
import ToggleModeBtn from '../common/ToggleModeBtn';
import DtoController from './DtoController';
import { BsTrash, BsSave } from 'react-icons/bs';
import { useCallback, useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queries/QueryKeys';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import apiRequest from '@/utils/axios';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { IoAddCircle } from 'react-icons/io5';
import AnimationBox from '../common/AnimationBox';

export interface DtoFieldInCompo {
  type: string | number; // 필드 타입. string 등
  typeName: string;
  desc: string; // 설명
  itera: boolean; // 배열 여부
  constraints: {
    mainName: string;
    minV: number | null;
    maxV: number | null;
    validateReg: string | null;
  }[]; // 제한 조건 들
}

export interface DtoInterfaceInForm {
  name: string;
  desc: string;
  fields: DtoFieldInCompo[];
}

interface Props {
  methods: UseFormReturn<DtoInterfaceInForm, any>;
  defaultData?: DtoDetail;
}

const DtoForm = function ({ defaultData, methods }: Props) {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const { spaceId } = router.query as SpaceParams;
  const queryClient = useQueryClient();
  const { dark } = useStoreSelector((state) => state.dark);
  const { handleSubmit, control, getValues, getFieldState } = methods;

  const {
    fields: wonsiFields,
    append: wonsiAppend,
    remove: wonsiRemove,
  } = useFieldArray({
    name: `fields`,
    control,
  });

  const removeHandler = useCallback(function (idx: number) {
    wonsiRemove(idx);
  }, []);
  // 생성 mutate
  const { mutate, mutateAsync } = useMutation({
    mutationFn: async function () {
      return apiRequest({
        method: `delete`,
        url: `/api/dto/${defaultData?.id}`,
        params: {},
        // data: {}
      });
    },
    onSuccess: function () {
      if (defaultData) {
        queryClient.removeQueries({
          queryKey: queryKeys.spaceDtoDetail(parseInt(spaceId), defaultData.id),
        });
        queryClient.invalidateQueries(queryKeys.spaceDto(parseInt(spaceId)));
        queryClient.invalidateQueries(queryKeys.spaceApi(parseInt(spaceId)));
      }
    },
  });
  const { data: dtoListData } = useDtoList(spaceId);

  // 이 부분은 확신이 없음!
  useEffect(
    function () {
      dtoListData?.dtoList.forEach((dto) => {
        queryClient.setQueryData(
          queryKeys.spaceDtoDetail(spaceId, dto.id),
          async (old) => {
            let data;
            await getDtoDetail(dto.id).then((res) => {
              data = res.data;
            });
            return data;
          }
        );
      });
    },
    [dtoListData]
  );

  const [isModal, setIsModal] = useState<boolean>(false);
  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);
  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);

  const dataSetting = function (data: DtoInterfaceInForm) {
    let fields: DtoFieldInCompo[] = [];
    let nestedDtos: DtoFieldInCompo[] = [];
    data.fields.forEach((field) => {
      if ((field.type as number) > 10) {
        nestedDtos.push(field);
      } else {
        fields.push(field);
      }
    });
    const config = { fields, nestedDtos };
    console.log(data);
    console.log(config);
  };

  const deleteHandler = function () {
    console.log('삭제');
    if (defaultData) {
      mutateAsync().then((res) => {
        dispatch(DispatchToast('삭제 완료!', true));
      });
    }
    closeModal();
  };

  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal} parentClasses="h-[50%] w-[50%]">
          <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
            <div className="text-[36px]">정말 삭제하시겠습니까?</div>
            <div className="text-[24px] text-red-500">
              삭제 후엔 되돌릴 수 없습니다.
            </div>
            <div className="flex flex-row gap-4">
              <Box
                variant="three"
                className="w-[80px] h-[60px] rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={closeModal}
              >
                닫기
              </Box>
              <div
                className="w-[80px] h-[60px] bg-red-500 rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={deleteHandler}
              >
                삭제
              </div>
            </div>
          </Box>
        </Modal>
      )}

      <AnimationBox className="w-full h-full flex flex-col gap-2">
        <FormProvider {...methods}>
          <form
            className="w-full h-full flex flex-col gap-2"
            onSubmit={handleSubmit(dataSetting)}
          >
            <div className="w-full basis-[7%] h-[7%] flex flex-row items-center justify-end gap-5">
              <BsSave className="cursor-pointer hover:scale-105 duration-[0.33s]" />
              <BsTrash
                className="cursor-pointer hover:scale-105 duration-[0.33s] text-red-500"
                onClick={openModal}
              />
              <Button className="flex items-center justify-center hover:scale-105">
                Save
              </Button>
            </div>
            <div className="w-full h-[6%] text-[32px] flex items-center justify-center">
              {defaultData ? `DTO 수정하기` : `DTO 생성하기`}
            </div>
            <Controller
              name={`name`}
              control={control}
              rules={{
                required: true,
                validate: (value, formValue) => !!value.length,
              }}
              render={({ field }) => {
                return (
                  <AnimationBox className="w-full h-[6%] flex flex-row items-center justify-center gap-3">
                    <label
                      htmlFor="name"
                      className="w-[20%] h-full flex items-center justify-start"
                    >
                      DTO Name
                    </label>
                    <input
                      id={`name`}
                      className="w-[80%] h-full text-[22px] bg-opacity-0 bg-grayscale-deeplightlight border-b-[3px] border-b-grayscale-deepdarklight outline-none px-2"
                      type="text"
                      name="name"
                      placeholder="DTO Name"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </AnimationBox>
                );
              }}
            />
            <Controller
              name={`desc`}
              control={control}
              rules={{
                required: true,
                validate: (value, formValue) => !!value.length,
              }}
              render={({ field }) => {
                return (
                  <AnimationBox className="w-full h-[6%] flex flex-row items-center justify-center gap-3">
                    <label
                      htmlFor="desc"
                      className="w-[20%] h-full flex items-center justify-start"
                    >
                      Description
                    </label>
                    <input
                      id={`desc`}
                      className="w-[80%] h-full text-[22px] bg-opacity-0 bg-grayscale-deeplightlight border-b-[3px] border-b-grayscale-deepdarklight outline-none px-2"
                      type="text"
                      name="desc"
                      placeholder="Description"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </AnimationBox>
                );
              }}
            />
            <div className="w-full h-[7%] flex flex-row gap-3 items-center">
              <span className="text-[28px]">Fields</span>
              <IoAddCircle
                className={`h-full cursor-pointer text-[32px] hover:scale-105 duration-[0.33s] ${
                  dark ? 'text-taro-strong' : 'text-mincho-strong'
                }`}
                onClick={() => {
                  wonsiAppend({
                    type: ``,
                    typeName: ``,
                    desc: ``,
                    itera: false,
                    constraints: [],
                  });
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              {wonsiFields.map((item, idx) => {
                return (
                  <DtoController
                    key={`${item.id}-dto-container`}
                    idx={idx}
                    item={item}
                    remove={removeHandler}
                  />
                );
              })}
            </div>
          </form>
        </FormProvider>
      </AnimationBox>
    </>
  );
};

export default DtoForm;
