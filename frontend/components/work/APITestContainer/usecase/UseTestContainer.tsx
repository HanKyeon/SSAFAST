import { Box, Button } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import MappingContainer from './MappingContainer';
import { HiPlusCircle } from 'react-icons/hi';
import SideApiItem from './SideApiItem';
import BoxHeader from '@/components/common/BoxHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { ApiTestForm, MockupData2Type } from '../../APIDocsContainer';

// const mockupData2: MockupData2Type = {
//   request: {
//     headers: [
//       {
//         keyName: 'Content-Type',
//         type: 'String',
//         desc: 'Define request data type',
//         value: null,
//       },
//       {
//         keyName: 'Age',
//         type: 'Integer',
//         desc: 'Fields for cashing',
//         value: null,
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
//           value: null,
//         },
//         {
//           keyName: 'PW',
//           type: 1,
//           desc: '사용자 PW',
//           itera: false,
//           constraints: ['NotNull'],
//           value: null,
//         },
//       ],
//       nestedDtos: {
//         '11': {
//           name: 'UserInfo', // 실제 dto class 이름
//           keyName: '11Dto', // 사용자가 지정한 변수명 e.g) Test test2;
//           desc: '사용자 정보를 저장하는 class',
//           itera: false,
//           fields: [
//             {
//               keyName: 'userID',
//               type: 1,
//               desc: '추천인ID',
//               value: null,
//               itera: false,
//               constraints: ['NotNull'],
//             },
//             {
//               keyName: 'userPW',
//               type: 1,
//               desc: '추천인PW',
//               value: null,
//               itera: false,
//               constraints: ['NotNull'],
//             },
//           ],
//           nestedDtos: {},
//         },
//         '8': {
//           name: 'UserInfo', // 실제 dto class 이름
//           keyName: '8Dto', // 사용자가 지정한 변수명 e.g) Test test2;
//           desc: '사용자 정보를 저장하는 class',
//           itera: false,
//           fields: [
//             {
//               keyName: 'userID',
//               type: 1,
//               desc: '추천인ID',
//               value: null,
//               itera: false,
//               constraints: ['NotNull'],
//             },
//             {
//               keyName: 'userPW',
//               type: 1,
//               desc: '추천인PW',
//               value: null,
//               itera: false,
//               constraints: ['NotNull'],
//             },
//           ],
//           nestedDtos: {
//             '7': {
//               name: 'UserInfo', // 실제 dto class 이름
//               keyName: '7Dto', // 사용자가 지정한 변수명 e.g) Test test2;
//               desc: '사용자 정보를 저장하는 class',
//               itera: false,
//               fields: [
//                 {
//                   keyName: 'userID',
//                   type: 1,
//                   desc: '추천인ID',
//                   value: null,
//                   itera: false,
//                   constraints: ['NotNull'],
//                 },
//                 {
//                   keyName: 'userPW',
//                   type: 1,
//                   desc: '추천인PW',
//                   value: null,
//                   itera: false,
//                   constraints: ['NotNull'],
//                 },
//               ],
//               nestedDtos: {},
//             },
//           },
//         },
//       },
//       nestedDtoList: {
//         '12': {
//           name: 'RecUserInfo',
//           keyName: null,
//           desc: '추천한 사용자들의 정보를 담는 class',
//           itera: true,
//           fields: [
//             {
//               keyName: 'userID',
//               type: 1,
//               desc: '추천인ID',
//               value: null,
//               itera: false,
//               constraints: ['NotNull'],
//             },
//           ],
//           nestedDtos: {},
//         },
//       },
//     },
//     pathVars: [
//       {
//         keyName: 'userid',
//         type: 'String',
//         desc: 'for login',
//         constraints: ['NotNull'],
//         value: null,
//       },
//     ],
//     params: [
//       {
//         keyName: 'age',
//         type: 'int',
//         desc: 'user age',
//         constraints: ['NotNull'],
//         value: null,
//       },
//     ],
//   },
// };

export interface UseTestForm {
  rootApiId: null,
  testDetails: {
    // [key: string | number] : {}
  }
  request: {
    url: string; // request.url
    method: 1 | 2 | 3 | 4 | 5; // request.method

    // useFieldArray
    headers: HeadersType[]; // request.headers
    pathVars: FieldsType[]; // request.pathVars
    params: FieldsType[]; // request.params

    body: BodyType; // request.body
  };
}

const UseTestContainer = function () {
  const { dark } = useStoreSelector((state) => state.dark);
  const methods = useForm<ApiTestForm>({
    defaultValues: {
    "rootApiId": null,
    "testDetails": {
    }}
  );
  const { control, handleSubmit } = methods;

  const checkData = function (data: ApiTestForm) {
    console.log(data);
  };

  return (
    <Box variant="one" fontType="header" className="h-full w-full">
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
              <span className={`text-content`}>유저가 서비스를 처음 사용</span>
              <p className={`text-small text-grayscale-deeplightlight`}>
                회원가입부터 게시글을 작성하는데까지의 흐름
              </p>
            </div>
            {/* api 순서대로 조록 */}
            <div className={`w-full flex-1 flex flex-col min-h-0`}>
              <BoxHeader title="order" className={`!pb-1`} />
              <div className={`flex-1 overflow-scroll scrollbar-hide`}>
                <ul>
                  <SideApiItem />
                  <SideApiItem />
                  <SideApiItem />
                </ul>
                <div
                  className={`flex gap-2 justify-center items-center border-[1px] border-grayscale-dark py-2 border-dashed rounded-[8px] text-grayscale-dark mt-4 cursor-pointer`}
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
          <MappingContainer />
        </form>
      </FormProvider>
    </Box>
  );
};

export default UseTestContainer;
