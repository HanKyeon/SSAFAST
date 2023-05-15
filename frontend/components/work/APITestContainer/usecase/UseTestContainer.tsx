import { Box, Button, Input } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import MappingContainer from './MappingContainer';
import { HiPlusCircle } from 'react-icons/hi';
import SideApiItem from './SideApiItem';
import BoxHeader from '@/components/common/BoxHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { ApiTestForm, MockupData2Type } from '../../APIDocsContainer';
import { EventHandler, FormEvent, useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import { IoArrowBackOutline } from 'react-icons/io5';
import useInput from '@/hooks/useInput';
import APIList from '../../APIEditContainer/APIList';
import { EachCateApi } from '@/hooks/queries/queries';

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

export interface UseTestForm {
  rootApiId: string | number;
  testDetails: {
    [key: string | number]: {
      additionalUrl: string;
      parent?: string | number;
      child?: string | number;
      request: {
        headers?: RequestItem;
        pathVars?: RequestItem;
        params?: RequestItem;
        body?: {
          fields?: RequestItem;
          nestedDtos?: UseTestDtoItem;
          nestedDtoLists?: UseTestDtoItem;
        };
      };
      response: {
        headers?: ResponseItem;
        body?: {
          fields?: ResponseItem;
          nestedDtos?: UseTestDtoItem;
          nestedDtoLists?: UseTestDtoItem;
        };
      };
    };
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
  const { dark } = useStoreSelector((state) => state.dark);

  const testName = useRef<HTMLInputElement>(null);
  const { inputData, onChangeHandler } = useInput(testName);

  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(true);
  const [curTestId, setCurTestId] = useState<number | string>();
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [newTestName, setNewTestName] = useState<string>('');
  const [isApiListOpen, setIsApiListOpen] = useState<boolean>(false);
  const [curApi, setCurApi] = useState<UseTestApiCompactType>();
  const [apis, setApis] = useState<UseTestApiCompactType[]>([]);

  const methods = useForm<UseTestForm>({
    defaultValues: {
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
    // 유스케이스 테스트 생성하는 dispatch
    // 1에서 나온 usecaseTestId를 curTestId에!
    setCurTestId(1);
    onToggleListModal();
    onToggleNewModal();
  };
  const onClickApi = (api: UseTestApiCompactType): void => {
    // side에서 api하나 클릭 -> req, res 세팅
    setCurApi(api);
  };
  // const onClickApitoAdd = (apiId: string | number,apiName: string, method: 1|2|3|4|5): void => {
  const onClickApitoAdd = (api: UseTestApiCompactType): void => {
    setCurApi(api);
    setApis((prev) => [...prev, api]);
    onToggleAddApiModal();
  };
  const onClickAddApiBtn = (): void => {
    onToggleAddApiModal();
  };
  const checkData = function (data: UseTestForm) {
    console.log(data);
  };

  return (
    <Box variant="one" fontType="header" className="h-full w-full">
      {isListModalOpen ? (
        <Modal closeModal={onToggleListModal} parentClasses="h-[50%] w-[50%]">
          {!isNewModalOpen ? (
            <Box
              className={`w-full h-full p-5 flex flex-col justify-between items-center`}
            >
              <div>usecase test 리스트</div>
              <Button onClick={onClickOpenNew}>New Test</Button>
            </Box>
          ) : (
            <Box
              className={`w-full h-full p-5 flex flex-col justify-between items-center`}
            >
              <div
                className={`flex gap-2 items-center text-mincho-normal hover:text-mincho-strong`}
                onClick={onToggleNewModal}
              >
                <IoArrowBackOutline />
                <span className={`text-content mt-[3px]`}>뒤로</span>
              </div>
              <Input
                inputref={testName}
                onChange={onChangeHandler}
                placeholder="usecase test name"
              />
              <Button onClick={onClickNew}>Start</Button>
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
              <Box
                variant="two"
                fontType="normal"
                className="basis-[25%] w-[25%] h-full p-5 flex flex-col gap-6"
              >
                {/* usecase TITLE */}
                <div className={`w-full`}>
                  <BoxHeader title="info" className={`!pb-1`} />
                  <span className={`text-content`}>
                    유저가 서비스를 처음 사용
                  </span>
                  <p className={`text-small text-grayscale-deeplightlight`}>
                    회원가입부터 게시글을 작성하는데까지의 흐름
                  </p>
                </div>
                {/* api 순서대로 조록 */}
                <div className={`w-full flex-1 flex flex-col min-h-0`}>
                  <BoxHeader title="order" className={`!pb-1`} />
                  <div className={`flex-1 overflow-scroll scrollbar-hide`}>
                    <ul>
                      {apis.length > 0 &&
                        apis.map((api: UseTestApiCompactType, idx: number) => (
                          <SideApiItem
                            key={`${api.id}_${idx}`}
                            api={api}
                            onClickApi={() =>
                              onClickApi({
                                id: api.id,
                                method: api.method,
                                name: api.name,
                                idx,
                              })
                            }
                          />
                        ))}
                    </ul>
                    <div
                      className={`flex gap-2 justify-center items-center border-[1px] border-grayscale-dark py-2 border-dashed rounded-[8px] text-grayscale-dark mt-4 cursor-pointer`}
                      onClick={onClickAddApiBtn}
                    >
                      Add api <HiPlusCircle />
                    </div>
                  </div>
                </div>
                {/* 버튼 wrapper */}
                <div className={`w-full flex gap-3`}>
                  <Button
                    className={`flex-1 !bg-mammoth-normal !border-mammoth-normal !py-1`}
                  >
                    초기화
                  </Button>
                  <Button className={`flex-1 !py-1`}>실행</Button>
                </div>
              </Box>
              {/* Request랑 Response Container */}
              <MappingContainer curapi={curApi} />
            </form>
          </FormProvider>
          {isApiListOpen && (
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
