import { Box, Button, Input } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import BoxHeader from '@/components/common/BoxHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { ApiTestForm, MockupData2Type } from '../../APIDocsContainer';
import { EventHandler, FormEvent, useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import { IoArrowBackOutline } from 'react-icons/io5';
import useInput from '@/hooks/useInput';
import APIList from '../../APIEditContainer/APIList';
import {
  EachCateApi,
  UsecaseDetailType,
  UsecaseListItemType,
  useUsecaseDetail,
} from '@/hooks/queries/queries';
import UCReqBox from './UCReqBox';
import UCResBox from './UCResBox';
import SideContainer from './SideContainer';
import UsecaseList from './UsecaseList';
import { useNewUsecase } from '@/hooks/queries/mutations';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

const mockupData2: MockupData2Type = {
  request: {
    headers: [
      {
        keyName: 'Content-Type',
        type: 'String',
        desc: 'Define request data type',
        value: null,
      },
      {
        keyName: 'Age',
        type: 'Integer',
        desc: 'Fields for cashing',
        value: null,
      },
    ],
    body: {
      fields: [
        {
          keyName: 'ID',
          type: 1,
          desc: '사용자 ID',
          itera: false,
          constraints: ['NotNull'],
          value: null,
        },
        {
          keyName: 'PW',
          type: 1,
          desc: '사용자 PW',
          itera: false,
          constraints: ['NotNull'],
          value: null,
        },
      ],
      nestedDtos: {
        '11': {
          name: 'UserInfo', // 실제 dto class 이름
          keyName: '11Dto', // 사용자가 지정한 변수명 e.g) Test test2;
          desc: '사용자 정보를 저장하는 class',
          itera: false,
          fields: [
            {
              keyName: 'userID',
              type: 1,
              desc: '추천인ID',
              value: null,
              itera: false,
              constraints: ['NotNull'],
            },
            {
              keyName: 'userPW',
              type: 1,
              desc: '추천인PW',
              value: null,
              itera: false,
              constraints: ['NotNull'],
            },
          ],
          nestedDtos: {},
        },
        '8': {
          name: 'UserInfo', // 실제 dto class 이름
          keyName: '8Dto', // 사용자가 지정한 변수명 e.g) Test test2;
          desc: '사용자 정보를 저장하는 class',
          itera: false,
          fields: [
            {
              keyName: 'userID',
              type: 1,
              desc: '추천인ID',
              value: null,
              itera: false,
              constraints: ['NotNull'],
            },
            {
              keyName: 'userPW',
              type: 1,
              desc: '추천인PW',
              value: null,
              itera: false,
              constraints: ['NotNull'],
            },
          ],
          nestedDtos: {
            '7': {
              name: 'UserInfo', // 실제 dto class 이름
              keyName: '7Dto', // 사용자가 지정한 변수명 e.g) Test test2;
              desc: '사용자 정보를 저장하는 class',
              itera: false,
              fields: [
                {
                  keyName: 'userID',
                  type: 1,
                  desc: '추천인ID',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
                {
                  keyName: 'userPW',
                  type: 1,
                  desc: '추천인PW',
                  value: null,
                  itera: false,
                  constraints: ['NotNull'],
                },
              ],
              nestedDtos: {},
            },
          },
        },
      },
      nestedDtoList: {
        '12': {
          name: 'RecUserInfo',
          keyName: null,
          desc: '추천한 사용자들의 정보를 담는 class',
          itera: true,
          fields: [
            {
              keyName: 'userID',
              type: 1,
              desc: '추천인ID',
              value: null,
              itera: false,
              constraints: ['NotNull'],
            },
          ],
          nestedDtos: {},
        },
      },
    },
    pathVars: [
      {
        keyName: 'userid',
        type: 'String',
        desc: 'for login',
        constraints: ['NotNull'],
        value: null,
      },
    ],
    params: [
      {
        keyName: 'age',
        type: 'int',
        desc: 'user age',
        constraints: ['NotNull'],
        value: null,
      },
    ],
  },
};

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

  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(true);
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isApiListOpen, setIsApiListOpen] = useState<boolean>(false);

  const [curUsecase, setCurUsecase] = useState<UsecaseListItemType>({
    id: -1,
    isNew: false,
  });
  const {
    data: curUCData,
    isLoading,
    isError,
  } = useUsecaseDetail(
    spaceId,
    curUsecase.id,
    curUsecase.isNew ? curUsecase.isNew : false
  );
  const onClickUsecaseItem = (usecase: UsecaseListItemType) => {
    setCurUsecase({ ...usecase, isNew: false });
  };

  const [curapi, setCurApi] = useState<UseTestApiCompactType>();
  const [apis, setApis] = useState<UseTestApiCompactType[]>([]);
  const [countApi, setCountApi] = useState<number>(0);
  const [resApiIds, setResApiIds] = useState<string>('');

  const methods = useForm<UsecaseDetailType>({
    defaultValues: {
      name: '',
      desc: '',
      rootApiId: '',
      testDetails: {},
    },
  });
  const { control, handleSubmit } = methods;

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
      setCurUsecase({
        id: res.data.usecaseTestId,
        name: ucNameInput,
        desc: ucDescInput,
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
    setCurApi({ ...api, idx: countApi });
    setApis((prev) => [...prev, { ...api, idx: countApi }]);
    setCountApi((prev) => prev + 1);
    onToggleAddApiModal();
  };
  const onClickAddApiBtn = (): void => {
    onToggleAddApiModal();
  };
  const checkData = function (data: UsecaseDetailType) {
    console.log('usecaes test submit 원본', data);
  };
  useEffect(() => {
    // response 가져오기 위해 이전 api들의 id 가져오기
    if (curapi) {
      const queryParams = new URLSearchParams();
      const apiIds = apis
        .map((api: UseTestApiCompactType) => api.id)
        .slice(0, curapi.idx);
      queryParams.set('apiIds', apiIds.join(','));
      setResApiIds(queryParams.toString());
      // console.log('!!!!!!!!!!!', queryParams.toString());
    }
  }, [curapi]);

  return (
    <Box variant="one" fontType="header" className="h-full w-full">
      {isListModalOpen ? (
        // 처음에 저장된 usecase list 모달 오픈
        <Modal closeModal={onToggleListModal} parentClasses="h-[50%] w-[50%]">
          {!isNewModalOpen ? (
            // 생성 모달
            <Box
              className={`w-full h-full p-5 flex flex-col justify-between items-center gap-3`}
            >
              <div>유스케이스 테스트 목록</div>
              <UsecaseList onClickUsecaseItem={onClickUsecaseItem} />
              <Button className={`!py-1`} onClick={onClickOpenNew}>
                New Test
              </Button>
            </Box>
          ) : (
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
          )}
        </Modal>
      ) : (
        <>
          <FormProvider {...methods}>
            <form
              className="h-full w-full flex gap-[1.12%]"
              onSubmit={handleSubmit(checkData)}
            >
              {/* 왼쪽 사이드 */}
              <SideContainer
                curUsecase={curUsecase}
                apis={apis}
                onClickApi={onClickApi}
                onClickAddApiBtn={onClickAddApiBtn}
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
                    resApis={resApiIds}
                  />
                )}
              </Box>
            </form>
          </FormProvider>
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
