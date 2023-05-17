import { useRouter } from 'next/router';
import { UseTestApiCompactType } from './UseTestContainer';
import { SpaceParams } from '@/pages/space';
import {
  PrevResponse,
  PrevResponses,
  UsecaseDetailType,
  UsecaseListItemType,
} from '@/hooks/queries/queries';
import ToggleableHeader from '../../APIDocsContainer/ToggleableHeader';
import UCResItem from './UCResItem';
import { Control } from 'react-hook-form';

const resDataMock: PrevResponses = {
  prevResponses: [
    {
      apiId: 1,
      apiName: 'apiname2이에요',
      desc: 'desc2입니당',
      headers: [
        {
          keyName: 'Content-Type',
          type: 1,
          desc: '응답온 정보의 타입 명시',
          itera: false,
          constraints: ['NotNull'],
        },
        {
          keyName: 'Authenticate',
          type: 1,
          desc: '세션 유지를 위한 jwt 토큰 발급',
          itera: false,
          constraints: ['NotNull'],
        },
      ],
      body: {
        fields: [
          {
            keyName: 'Access-Token',
            type: 1,
            desc: '페이지에 접근할 수 있는 토큰 발급',
            itera: false,
            constraints: ['NotNull'],
          },
          {
            keyName: 'Refresh-Token',
            type: 1,
            desc: '세션 만료 시 재발급을 위한 토큰',
            itera: false,
            constraints: ['NotNull'],
          },
        ],
        nestedDtos: {
          16: [
            {
              keyName: 'userList',
              type: 16,
              desc: '추천한 사용자 ID',
              itera: true,
              constraints: ['NotNull'],
            },
          ],
        },
      },
    },
    {
      apiId: 2,
      apiName: 'apiname2이에요',
      desc: 'desc2입니당',
      headers: [
        {
          keyName: 'Content-Type',
          type: 1,
          desc: '응답온 정보의 타입 명시',
          itera: false,
          constraints: ['NotNull'],
        },
        {
          keyName: 'Authenticate',
          type: 1,
          desc: '세션 유지를 위한 jwt 토큰 발급',
          itera: false,
          constraints: ['NotNull'],
        },
      ],
      body: {
        fields: [
          {
            keyName: 'Access-Token',
            type: 1,
            desc: '페이지에 접근할 수 있는 토큰 발급',
            itera: false,
            constraints: ['NotNull'],
          },
          {
            keyName: 'Refresh-Token',
            type: 1,
            desc: '세션 만료 시 재발급을 위한 토큰',
            itera: false,
            constraints: ['NotNull'],
          },
        ],
        nestedDtos: {
          16: [
            {
              keyName: 'userList',
              type: 16,
              desc: '추천한 사용자 ID',
              itera: true,
              constraints: ['NotNull'],
            },
          ],
        },
      },
    },
  ],
};

type UCResBoxPropsType = {
  curUsecase: UsecaseListItemType;
  currentApi: UseTestApiCompactType;
  resApis: string;
  control: Control<UsecaseDetailType, any>;
};

const UCResBox = function ({
  curUsecase,
  currentApi,
  resApis,
  control,
}: UCResBoxPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  // const {
  //   data: resDatas,
  //   isLoading,
  //   isError,
  // } = useUsecaseResponses(spaceId, resApis);
  return (
    <div className={`flex-1 overflow-scroll scrollbar-hide`}>
      {resDataMock.prevResponses.map((resData: PrevResponse, idx: number) => (
        <UCResItem
          key={`${resData.apiId}_${idx}`}
          item={resData}
          name={resData.apiName}
          control={control}
          formName={`${resData.apiId}`}
        />
        // <div className={`w-full`}>
        //   <ToggleableHeader title={resData.apiName} />
        // </div>
      ))}
    </div>
  );
};

export default UCResBox;
