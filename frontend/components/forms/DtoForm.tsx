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
import {
  DtoDetail,
  getDtoDetail,
  useDtoClasses,
  useDtoDetail,
  useDtoList,
} from '@/hooks/queries/queries';
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
import { valuedConstraints } from '@/utils/constraints';

export interface RefineDtoField {
  type: number; // 필드 타입. string 등
  keyName: string;
  desc: string; // 설명
  itera: boolean; // 배열 여부
  constraints: string[]; // 제한 조건 들
  value: any;
}

export interface DtoFieldInCompo {
  type: number; // 필드 타입. string 등
  keyName: string;
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
  defaultData?: DtoInterfaceInForm;
  resetSelected: () => void;
  selectedId: string | number | null;
}

const DtoForm = function ({ defaultData, resetSelected, selectedId }: Props) {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const { spaceId } = router.query as SpaceParams;
  const queryClient = useQueryClient();
  const { dark } = useStoreSelector((state) => state.dark);
  const methods = useForm({
    defaultValues: defaultData,
  });
  const { handleSubmit, control, reset, resetField } = methods;
  const { data: dtoClassCode } = useDtoClasses(spaceId, selectedId as number);
  useEffect(
    function () {
      if (!selectedId) {
        reset({ name: ``, desc: ``, fields: [] });
      } else {
        reset(defaultData);
      }
    },
    [defaultData]
  );

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

  const { mutateAsync: deleteMutateAsync } = useMutation({
    mutationFn: async function (dtoId: number | string) {
      return apiRequest({
        method: `delete`,
        url: `/api/dto/${dtoId}`,
      });
    },
    onSuccess: function (data) {
      queryClient.invalidateQueries(queryKeys.spaceDto(parseInt(spaceId)));
      queryClient.invalidateQueries(queryKeys.spaceApi(parseInt(spaceId)));
    },
  });
  const { mutateAsync: postMutateAsync } = useMutation({
    mutationFn: async function (data: any) {
      return apiRequest({
        method: `post`,
        url: `/api/dto`,
        data: data,
      });
    },
  });
  const { data: dtoListData } = useDtoList(spaceId);

  const [isModal, setIsModal] = useState<boolean>(false);
  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);
  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);

  const [isCodeModal, setIsCodeModal] = useState<boolean>(false);
  const closeCodeModal = useCallback(function () {
    setIsCodeModal(() => false);
  }, []);
  const openCodeModal = useCallback(function () {
    setIsCodeModal(() => true);
  }, []);

  const dataSetting = async function (data: DtoInterfaceInForm) {
    let name = data.name;
    let desc = data.desc;
    let fields: RefineDtoField[] = [];
    let nestedDtos: any = {};

    for await (const field of data.fields) {
      if (!!field.type && field.type < 11) {
        fields.push({
          constraints: [
            ...field.constraints
              .map((constraint) => {
                const mainName = constraint.mainName;
                if (mainName === 'Max') {
                  if (constraint.maxV === null) {
                    return ``;
                  }
                  return `Max(value=${constraint.maxV})`;
                } else if (mainName === `Min`) {
                  if (constraint.minV === null) {
                    return ``;
                  }
                  return `Min(value=${constraint.minV}`;
                } else if (mainName === `Range`) {
                  if (constraint.minV === null || constraint.maxV === null) {
                    return ``;
                  }
                  return `Range(min=${constraint.minV},max=${constraint.maxV})`;
                } else if (mainName === `Pattern`) {
                  return `${
                    constraint.validateReg?.length
                      ? `Pattern(regexp=${constraint.validateReg})`
                      : ``
                  }`;
                } else if (mainName === `Length`) {
                  if (constraint.minV === null || constraint.maxV === null) {
                    return ``;
                  }
                  return `Length(min=${constraint.minV},max=${constraint.maxV})`;
                }
                return mainName;
              })
              .filter((v) => v.length !== 0),
          ],
          desc: field.desc,
          itera: field.itera,
          type: field.type,
          keyName: field.keyName,
          value: null,
        });
      } else {
        const dtoId = field.type;
        let data: any;
        // data = dtoListData?.dtoList.find((dto) => dto.id === dtoId);
        await apiRequest({
          method: `get`,
          url: `/api/dto/${dtoId}`,
        }).then((res) => {
          data = {
            keyName: field.keyName,
            type: dtoId,
            desc: field.desc,
            itera: false,
            constraints: [],
            nestedDtos: { ...res.data.nestedDtos },
          };
        });
        console.log(`요청해서 응답으로 온 dtoId ${dtoId}의 정보`, data);
        if (!data) {
          return;
        }
        if (nestedDtos[dtoId]) {
          nestedDtos[dtoId].push(data);
        } else {
          nestedDtos[dtoId] = [{ ...data! }];
        }
      }
    }
    if (selectedId) {
      apiRequest({
        method: `put`,
        url: `/api/dto/${selectedId}`,
        data: {
          workspaceId: spaceId,
          name,
          description: desc,
          document: { fields, nestedDtos },
        },
      })
        .then((res) => {
          dispatch(DispatchToast('수정 완료!', true));
          queryClient.invalidateQueries(queryKeys.spaceDtoList(spaceId));
          queryClient.invalidateQueries(
            queryKeys.spaceDtoDetail(spaceId, selectedId)
          );
        })
        .then((res) => {
          reset({ name: ``, desc: ``, fields: [] });
          resetSelected();
        });
    } else {
      postMutateAsync({
        workspaceId: spaceId,
        name,
        description: desc,
        document: { fields, nestedDtos },
      })
        .then((res) => {
          dispatch(DispatchToast('생성 완료!', true));
          queryClient.invalidateQueries(
            queryKeys.spaceDtoList(parseInt(spaceId))
          );
        })
        .then((res) => {
          reset({ name: ``, desc: ``, fields: undefined });
          resetSelected();
        })
        .catch((err) => {
          if (err.response.data === 'DTO DEPTH OVER 2') {
            dispatch(DispatchToast('DTO의 최대 깊이는 2입니다!', false));
          }
        });
    }
    // console.log({
    //   workspaceId: spaceId,
    //   name,
    //   description: desc,
    //   document: { fields, nestedDtos },
    // });
  };

  const deleteHandler = function () {
    console.log('삭제');
    if (selectedId) {
      deleteMutateAsync(selectedId).then((res) => {
        dispatch(DispatchToast('삭제 완료!', true));
        resetSelected();
      });
    } else {
      dispatch(DispatchToast('작성 정보가 초기화 됩니다.', true));
      reset({ name: ``, desc: ``, fields: [] });
    }
    resetSelected();
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
      {isCodeModal && (
        <Modal closeModal={closeCodeModal} parentClasses="h-[70%] w-[60%]">
          <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
            <div className="text-[36px]">DTO Code</div>
            <div className="text-[24px] text-red-500">
              가장 최근 저장된 데이터 코드입니다.
            </div>
            <Box variant="three" className="w-full h-full p-5 overflow-scroll">
              <pre>
                {dtoClassCode?.dtoClass ||
                  '이 편지는 17세기 영국으로부터 시작되어...'}
              </pre>
            </Box>
            <div className="flex flex-row gap-4">
              <Box
                variant="three"
                className="w-[80px] h-[60px] rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={closeCodeModal}
              >
                닫기
              </Box>
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
              <BsSave
                className="cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={openCodeModal}
              />
              <BsTrash
                className="cursor-pointer hover:scale-105 duration-[0.33s] text-red-500"
                onClick={openModal}
              />
              <Button className="flex items-center justify-center hover:scale-105">
                Save
              </Button>
            </div>
            <div className="w-full h-[6%] text-[32px] flex items-center justify-center">
              {selectedId ? `DTO 수정하기` : `DTO 생성하기`}
            </div>
            <Controller
              name={`name`}
              control={control}
              rules={{
                // required: true,
                validate: (value, formValue) => {
                  if (!value.length) {
                    dispatch(DispatchToast('필수 값이 없습니다.', false));
                  }
                  return !!value.length;
                },
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
                    type: 0,
                    keyName: ``,
                    desc: ``,
                    itera: false,
                    constraints: [],
                  });
                }}
              />
            </div>
            <div className="w-full h-[66%] flex flex-col gap-3 overflow-y-scroll">
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
