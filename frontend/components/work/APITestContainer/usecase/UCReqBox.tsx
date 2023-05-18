import { useRouter } from 'next/router';
import { UseTestApiCompactType } from './UseTestContainer';
import { SpaceParams } from '@/pages/space';
import {
  ApiDetailAtTest,
  UsecaseDetailType,
  UsecaseListItemType,
  useApiDetailAtTest,
} from '@/hooks/queries/queries';
import { Control, useFieldArray } from 'react-hook-form';
import ReqItem from '../../APIDocsContainer/ReqItem';
import ReqItemBody from '../../APIDocsContainer/ReqItemBody';
import UCReqItem from './UCReqItem';
import { Dispatch, SetStateAction } from 'react';

// const curapiMock: ApiDetailAtTest = {
//   request: {
//     additionalUrl: '/blog/:userId/comment',
//     headers: [
//       {
//         keyName: 'Content-Type',
//         type: 1,
//         desc: '데이터 타입',
//         value: 'null',
//       },
//       {
//         keyName: 'Authorization',
//         type: 1,
//         desc: '유저 인증 토큰',
//         value: 'null',
//       },
//     ],
//     body: {
//       fields: [
//         {
//           keyName: 'ID',
//           type: 1,
//           desc: '사용자 ID',
//           itera: false,
//           constraints: ['NotNull'],
//           value: 'null',
//         },
//         {
//           keyName: 'PW',
//           type: 1,
//           desc: '사용자 PW',
//           itera: false,
//           constraints: ['NotNull'],
//           value: 'null',
//         },
//       ],
//       nestedDtos: {
//         '11': [
//           {
//             name: 'UserInfo', // 실제 dto class 이름 (type)
//             keyName: null, // 사용자가 지정한 변수명 e.g) Test test2; (key)
//             desc: '사용자 정보를 저장하는 class',
//             constraints: [], //없는거야 값 없는거야 프론트로 따지면 interface 때문에 우짤수 없는 애야
//             itera: false,
//             fields: [
//               {
//                 keyName: 'userID',
//                 type: 1,
//                 desc: '추천인ID',
//                 value: 'null',
//                 itera: false,
//                 constraints: ['NotNull'],
//               },
//               {
//                 keyName: 'userPW',
//                 type: 1,
//                 desc: '추천인PW',
//                 value: 'null',
//                 itera: false,
//                 constraints: ['NotNull'],
//               },
//             ],
//             nestedDtos: {},
//           },
//         ],
//       },
//       nestedDtoLists: {
//         '12': [
//           {
//             name: 'RecUserInfo',
//             keyName: null,
//             desc: '추천한 사용자들의 정보를 담는 class',
//             constraints: [], //없는거야 값 없는거야 프론트로 따지면 interface 때문에 우짤수 없는 애야
//             itera: true,
//             fields: [
//               {
//                 keyName: 'userID',
//                 type: 1,
//                 desc: '추천인ID',
//                 value: null,
//                 itera: false,
//                 constraints: ['NotNull'],
//               },
//             ],
//             nestedDtos: {},
//           },
//         ],
//       },
//     },
//     pathVars: [
//       {
//         keyName: 'userId',
//         type: 1,
//         desc: '유저 ID',
//         constraints: ['NotNull'],
//         value: 'null',
//       },
//     ],
//     params: [
//       {
//         keyName: 'order',
//         type: 1,
//         desc: '정렬 조건',
//         constraints: ['NotNull'],
//         value: 'null',
//       },
//     ],
//   },
//   response: [
//     {
//       statusCode: 200,
//       desc: '설명',
//       headers: [
//         {
//           keyName: 'Content-Type',
//           type: 1,
//           desc: '데이터 타입',
//           value: 'null',
//         },
//       ],
//       body: {
//         fields: [
//           {
//             keyName: 'message',
//             type: 1,
//             desc: '응답에 대한 설명',
//             itera: false,
//             value: 'success!',
//           },
//         ],
//         nestedDtos: {},
//         nestedDtoLists: {},
//       },
//     },
//   ],
// };

type UCReqBoxPropsType = {
  curUsecase: UsecaseListItemType;
  currentApi: UseTestApiCompactType;
  control: Control<UsecaseDetailType, any>;
};

const UCReqBox = function ({
  curUsecase,
  currentApi,
  control,
}: UCReqBoxPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: curapi,
    isLoading,
    isError,
  } = useApiDetailAtTest(spaceId, currentApi.id);

  console.log('뿌!', curapi);

  //   const {
  //     fields: headersFields,
  //     append: headersAppend,
  //     remove: headersRemove,
  //   } = useFieldArray({
  //     control,
  //     name: `testDetails.${currentApi.id as string}.request.headers`,
  //   });
  //   const {
  //     fields: paramsFields,
  //     append: paramsAppend,
  //     remove: paramsRemove,
  //   } = useFieldArray({
  //     control,
  //     name: `testDetails.${currentApi.id as string}.request.params`,
  //   });
  //   const {
  //     fields: pathFields,
  //     append: pathAppend,
  //     remove: pathRemove,
  //   } = useFieldArray({
  //     control,
  //     name: `testDetails.${currentApi.id as string}.request.pathVars`,
  //   });

  return (
    <div className={`flex-1 overflow-scroll scrollbar-hide`}>
      {curapi?.document.request.headers && (
        <UCReqItem
          //   fields={headersFields}
          formName={`testDetails.${currentApi.id as string}.request.headers`}
          name="headers"
          control={control}
          item={curapi.document.request.headers}
        />
      )}
      {/* {curapiMock.request.body && (
        <ReqItemBody
          //   fields={headersFields}
          formName={`request.headers`}
          name="headers"
          control={control}
          item={curapiMock.request.body}
        />
      )} */}
      {curapi?.document.request.params && (
        <UCReqItem
          //   fields={headersFields}
          formName={`testDetails.${currentApi.id as string}.request.params`}
          name="params"
          control={control}
          item={curapi.document.request.params}
        />
      )}
      {curapi?.document.request.pathVars && (
        <UCReqItem
          //   fields={headersFields}
          formName={`testDetails.${currentApi.id as string}.request.pathVars`}
          name="path variables"
          control={control}
          item={curapi.document.request.pathVars}
        />
      )}
    </div>
  );
};

export default UCReqBox;
