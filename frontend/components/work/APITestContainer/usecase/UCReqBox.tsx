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
import UCReqItemDto from './UCReqItemDto';

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

  console.log('뿌! 현재 선택된 api의 정보 ::::::::::', curapi);

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
      {/* headers!!!! */}
      {curapi?.document.request.headers &&
        curapi?.document.request.headers.length > 0 && (
          <UCReqItem
            //   fields={headersFields}
            formName={`testDetails.${currentApi.id as string}.request.headers`}
            name="headers"
            control={control}
            item={curapi.document.request.headers}
          />
        )}
      {/* BODY 다!!!!!!!!! */}
      {curapi?.document.request.body?.fields &&
        curapi?.document.request.body?.fields?.length > 0 && (
          <UCReqItem
            //   fields={headersFields}
            formName={`testDetails.${
              currentApi.id as string
            }.request.body.fields`}
            name="body_fields"
            control={control}
            item={curapi.document.request.body.fields}
          />
        )}
      {curapi?.document.request.body?.nestedDtos &&
        Object.keys(curapi?.document.request.body?.nestedDtos).length > 0 && (
          <UCReqItemDto
            //   fields={headersFields}
            formName={`testDetails.${
              currentApi.id as string
            }.request.body.nestedDtos`}
            name="body_dtos"
            control={control}
            item={curapi.document.request.body.nestedDtos}
          />
        )}
      {curapi?.document.request.body?.nestedDtoLists &&
        Object.keys(curapi?.document.request.body?.nestedDtoLists).length >
          0 && (
          <UCReqItemDto
            //   fields={headersFields}
            formName={`testDetails.${
              currentApi.id as string
            }.request.body.nestedDtoLists`}
            name="body_dtoLists"
            control={control}
            item={curapi.document.request.body.nestedDtoLists}
          />
        )}
      {/* params!!!! */}
      {curapi?.document.request.params && (
        <UCReqItem
          //   fields={headersFields}
          formName={`testDetails.${currentApi.id as string}.request.params`}
          name="params"
          control={control}
          item={curapi.document.request.params}
        />
      )}
      {/* pathVars!!!! */}
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
