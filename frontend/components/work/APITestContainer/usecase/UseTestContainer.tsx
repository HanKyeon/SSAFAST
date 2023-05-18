import { Box, Button, Input } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import BoxHeader from '@/components/common/BoxHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { ApiTestForm, MockupData2Type } from '../../APIDocsContainer';
import {
  EventHandler,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Modal from '@/components/common/Modal';
import { IoArrowBackOutline } from 'react-icons/io5';
import useInput from '@/hooks/useInput';
import APIList from '../../APIEditContainer/APIList';
import {
  EachCateApi,
  UsecaseDetailType,
  UsecaseListItemType,
  useApiDetailAtTest,
  useUsecaseDetail,
} from '@/hooks/queries/queries';
import UCReqBox from './UCReqBox';
import UCResBox from './UCResBox';
import SideContainer from './SideContainer';
import UsecaseList from './UsecaseList';
import {
  TestResponseType,
  useNewUsecase,
  useTestUsecase,
} from '@/hooks/queries/mutations';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import Logogogo from '@/components/common/Logogogo';
import { UCContext, UCContextInterface } from '.';
import useUcWithIds from '@/hooks/useUcWithIds';

export interface RequestItem {
  [key: string]: {
    type: number;
    desc: string;
    mapped: boolean;
    value: any;
    constraints?: string[];
    itera?: boolean;
  };
}

export interface UseTestDtoItem {
  [key: string | number]: {
    name: string;
    desc: string;
    fields?: RequestItem | ResponseItem;
    nestedDtos?: UseTestDtoItem;
    nestedDtoLists?: UseTestDtoItem;
  };
}

export interface ResponseItem {
  [key: string]: {
    type: number;
    desc: string;
    itera?: boolean;
  };
}

export type UseTestApiCompactType = {
  id: string | number;
  name: string;
  method: 1 | 2 | 3 | 4 | 5;
  idx?: number;
  status?: 0 | 1 | 2; // 0:- 1:Success 2: Fail
};

const UseTestContainer = function () {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;

  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const { mutateAsync: newUCMutate } = useNewUsecase(spaceId);

  const [ucNameInputEL, ucDescInputEl] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const { inputData: ucNameInput, onChangeHandler: onChangeUcNameInput } =
    useInput(ucNameInputEL);
  const { inputData: ucDescInput, onChangeHandler: onChangeUcDescInput } =
    useInput(ucDescInputEl);

  const {
    contextFormName,
    setContextFormName,
    contextResName,
    setContextResName,
    contextMapped,
    setContextMapped,
  } = useContext<UCContextInterface>(UCContext);

  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(true); // 유케저장목록모달
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isApiListOpen, setIsApiListOpen] = useState<boolean>(false);

  const [curUsecase, setCurUsecase] = useState<UsecaseListItemType>({
    id: 0,
    isNew: false,
  });
  // const { data: curUCData, isFetching: ucDataFetching } = useUsecaseDetail(
  //   spaceId,
  //   curUsecase.id,
  //   curUsecase.isNew ? curUsecase.isNew : false
  // );
  const onClickUsecaseItem = (usecase: UsecaseListItemType) => {
    if (usecase) {
      setCurUsecase({ ...usecase, isNew: false });
      // setIsListModalOpen(() => false);
      console.log(curUsecase);
    }
  };

  const [curapi, setCurApi] = useState<UseTestApiCompactType>();
  const [apis, setApis] = useState<UseTestApiCompactType[]>([]);
  const [countApi, setCountApi] = useState<number>(0);
  const [resApiIds, setResApiIds] = useState<string>('');
  const requestData = useUcWithIds(resApiIds);

  const methods = useForm<UsecaseDetailType>({
    defaultValues: {
      rootApiId: 0,
      testDetails: {},
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue: setFormValue,
    getValues,
    resetField,
  } = methods;

  useEffect(
    function () {
      if (contextFormName && contextResName) {
        console.log(contextFormName);
        console.log(contextResName);
        resetField(`${contextFormName}.value` as any, {
          defaultValue: contextResName,
        });
        resetField(`${contextFormName}.mapped` as any, { defaultValue: true });
        setContextFormName(() => ``);
        setContextResName(() => ``);
      }
    },
    [contextFormName, contextResName]
  );

  const onToggleListModal = (): void => {
    setIsListModalOpen((prev) => !prev);
  };
  const onToggleNewModal = (): void => {
    setIsNewModalOpen((prev) => !prev);
  };
  const onToggleAddApiModal = (): void => {
    setIsApiListOpen((prev) => !prev);
  };
  const onClickOpenNew = (): void => {
    onToggleNewModal();
  };
  const onClickNew = () => {
    newUCMutate({
      name: ucNameInput,
      description: ucDescInput,
      workspaceId: spaceId,
    }).then((res) => {
      console.log('usecaseTestId!!!!!!!!!', res.data.usecaseTestId);
      setCurUsecase({
        id: res.data.usecaseTestId,
        name: curUsecase.name,
        desc: curUsecase.desc,
        isNew: true,
      });
    });

    // 모달닫음
    onToggleListModal();
    onToggleNewModal();
  };
  const onClickApi = (api: UseTestApiCompactType): void => {
    // side에서 api하나 클릭 -> req, res 세팅
    console.log('mapping하는쪽 바꼈나? 현재 선택된 api는', api);
    setCurApi(api);
  };
  // const onClickApitoAdd = (apiId: string | number,apiName: string, method: 1|2|3|4|5): void => {
  const onClickApitoAdd = (api: UseTestApiCompactType): void => {
    if (countApi === 0) {
      setFormValue('rootApiId', api.id);
    }
    setCurApi({ ...api, idx: countApi });
    setApis((prev) => [...prev, { ...api, idx: countApi }]);
    setCountApi((prev) => prev + 1);
    onToggleAddApiModal();
  };
  const onClickAddApiBtn = (): void => {
    onToggleAddApiModal();
  };
  const onClickClearApis = (): void => {
    // 왼쪽 사이드에 있는 api 목록 지움
    setCurApi(undefined);
    setApis([]);
    setCountApi(0);

    // 지금까지 만들어졌던 useForm의 method 그 data도 초기화
    reset({
      rootApiId: '',
      testDetails: {},
    });

    // context도 초기화
    setContextFormName(null);
    setContextResName(null);
    setContextMapped(false);
  };

  const { mutateAsync: testMutate } = useTestUsecase(spaceId, curUsecase.id);
  const onClickTest = (data: UsecaseDetailType): void => {
    testMutate(data).then(({ data }) =>
      console.log('mutate 햇다@@@@@@!!!!!', data)
    );
    console.log('usecaes test submit 원본', data);
  };

  const a = useUcWithIds(
    apis
      .map((api) => api.id)
      .join(`,`)
      .slice(1)
  );
  useEffect(
    function () {
      if (a) {
        reset(a);
      }
    },
    [a]
  );

  useEffect(() => {
    // response 가져오기 위해 이전 api들의 id 가져오기
    if (curapi) {
      // const queryParams = new URLSearchParams();
      const apiIds = apis
        .map((api: UseTestApiCompactType) => api.id)
        .slice(0, curapi.idx);
      // queryParams.set('apiIds', apiIds.join(','));
      setResApiIds(apiIds.join(','));
      // console.log('!!!!!!!!!!!', apiIds.join(','));
      // console.log('?????????????', apiIds);
    }
  }, [curapi]);

  return (
    <Box variant="one" fontType="header" className="h-full w-full">
      {isNewModalOpen ? (
        // 처음에 저장된 usecase list 모달 오픈
        <Modal closeModal={onToggleListModal} parentClasses="h-[50%] w-[50%]">
          {isNewModalOpen ? ( // 생성 모달
            <Box
              className={`w-full h-full p-5 flex flex-col justify-between items-center`}
            >
              <div
                className={`w-full flex items-center gap-2 ${
                  isDark ? 'text-mincho-normal' : 'text-taro-normal'
                } cursor-pointer`}
                onClick={onToggleNewModal}
              >
                <IoArrowBackOutline />
                <span className={`text-content mt-[3px]`}>뒤로</span>
              </div>
              <div className={`flex flex-col gap-5 w-[90%] mb-7`}>
                <p className={`mb-2 text-center`}>새 유스케이스 테스트 생성</p>
                <Input
                  inputref={ucNameInputEL}
                  value={ucNameInput}
                  onChange={onChangeUcNameInput}
                  placeholder="Name"
                  className={`!w-[50%]`}
                />
                <Input
                  inputref={ucDescInputEl}
                  value={ucDescInput}
                  onChange={onChangeUcDescInput}
                  placeholder="Description"
                />
              </div>
              <Button onClick={onClickNew} className={`!py-1`}>
                생성
              </Button>
            </Box>
          ) : null}
        </Modal>
      ) : (
        <>
          {curUsecase.id ? (
            <FormProvider {...methods}>
              <form
                className="h-full w-full flex gap-[1.12%]"
                onSubmit={handleSubmit(onClickTest)}
              >
                {/* 왼쪽 사이드 */}
                <SideContainer
                  curUsecase={curUsecase}
                  apis={apis}
                  onClickApi={onClickApi}
                  onClickAddApiBtn={onClickAddApiBtn}
                  onClickClearApis={onClickClearApis}
                />
                {/* Request */}
                <Box
                  variant="two"
                  fontType="normal"
                  className="flex-1 h-full p-5 flex flex-col"
                >
                  <BoxHeader title="Request" />
                  {curapi && (
                    <UCReqBox
                      curUsecase={curUsecase}
                      control={control}
                      currentApi={curapi}
                      apis={apis}
                      setFormValue={setFormValue}
                    />
                  )}
                </Box>
                {/* Response */}
                <Box
                  variant="two"
                  fontType="normal"
                  className="flex-1 h-full p-5 flex flex-col"
                >
                  <BoxHeader title="Response" />
                  {curapi && (
                    <UCResBox
                      curUsecase={curUsecase}
                      control={control}
                      currentApi={curapi}
                      resApiIds={resApiIds}
                    />
                  )}
                </Box>
              </form>
            </FormProvider>
          ) : (
            <Box
              variant="two"
              className="w-full h-full flex items-center justify-center"
            >
              <Logogogo msg="유즈케이스를 골라주세요!">
                <div
                  className="bg-slate-600 rounded-full p-4 w-[10%] flex items-center justify-center cursor-pointer duration-[0.33s] hover:scale-105"
                  onClick={() => setIsNewModalOpen(true)}
                >
                  고르기
                </div>
              </Logogogo>
            </Box>
          )}
          {isApiListOpen && (
            // usecase에 api 추가하는 api list 모달
            <Modal
              closeModal={onToggleAddApiModal}
              parentClasses="h-[50%] w-[50%]"
            >
              <Box
                className={`w-full h-full pt-7 pb-5 px-10 flex flex-col gap-7`}
              >
                <div className={`w-full text-center`}>
                  추가할 API를 선택해 주세요.
                </div>
                <div className={`w-full flex-1 overflow-scroll scrollbar-hide`}>
                  <APIList onClickApi={onClickApitoAdd} />
                </div>
              </Box>
            </Modal>
          )}
        </>
      )}
    </Box>
  );
};

export default UseTestContainer;
