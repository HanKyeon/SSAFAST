import { useRouter } from 'next/router';
import { UseTestApiCompactType } from './UseTestContainer';
import { SpaceParams } from '@/pages/space';
import {
  ApiDetailAtTest,
  UsecaseDetailType,
  UsecaseListItemType,
  useApiDetailAtTest,
} from '@/hooks/queries/queries';
import { Control, UseFormSetValue, useFieldArray } from 'react-hook-form';
import ReqItem from '../../APIDocsContainer/ReqItem';
import ReqItemBody from '../../APIDocsContainer/ReqItemBody';
import UCReqItem from './UCReqItem';
import { Dispatch, SetStateAction, useEffect } from 'react';
import UCReqItemDto from './UCReqItemDto';

type UCReqBoxPropsType = {
  curUsecase: UsecaseListItemType;
  currentApi: UseTestApiCompactType;
  control: Control<UsecaseDetailType, any>;
  setFormValue: UseFormSetValue<UsecaseDetailType>;
  apis: UseTestApiCompactType[];
};

const UCReqBox = function ({
  curUsecase,
  currentApi,
  control,
  setFormValue,
  apis,
}: UCReqBoxPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: curapi,
    isLoading,
    isError,
  } = useApiDetailAtTest(spaceId, currentApi.id);

  useEffect(() => {
    if (curapi) {
      setFormValue(
        `testDetails.${curapi.apiId}.additionalUrl`,
        curapi.document.request.additionalUrl
      );
      if (currentApi.idx && currentApi.idx > 0) {
        setFormValue(
          `testDetails.${curapi.apiId}.parent`,
          apis[currentApi.idx - 1].id
        );
        setFormValue(
          `testDetails.${apis[currentApi.idx - 1].id}.child`,
          curapi.apiId
        );
      }
    }
  }, [curapi]);

  return (
    <div className={`flex-1 overflow-scroll scrollbar-hide`}>
      {/* headers!!!! */}
      {curapi?.document.request.headers &&
        curapi?.document.request.headers.length > 0 && (
          <UCReqItem
            //   fields={headersFields}
            formName={`testDetails.${currentApi.id}.request.headers`}
            name="headers"
            control={control}
            item={curapi.document.request.headers!}
          />
        )}
      {/* BODY 다!!!!!!!!! */}
      {curapi?.document.request.body?.fields &&
        curapi?.document.request.body?.fields?.length > 0 && (
          <UCReqItem
            //   fields={headersFields}
            formName={`testDetails.${currentApi.id}.request.body.fields`}
            name="body_fields"
            control={control}
            item={curapi.document.request.body.fields}
          />
        )}
      {curapi?.document.request.body?.nestedDtos &&
        Object.keys(curapi?.document.request.body?.nestedDtos).length > 0 && (
          <UCReqItemDto
            //   fields={headersFields}
            formName={`testDetails.${currentApi.id}.request.body.nestedDtos`}
            name="body_dtos"
            control={control}
            item={curapi.document.request.body.nestedDtos}
          />
        )}
      {/* {curapi?.document.request.body?.nestedDtoLists &&
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
        )} */}
      {/* params!!!! */}
      {curapi?.document.request.params &&
        curapi?.document.request.params.length > 0 && (
          <UCReqItem
            //   fields={headersFields}
            formName={`testDetails.${currentApi.id}.request.params`}
            name="params"
            control={control}
            item={curapi.document.request.params}
          />
        )}
      {/* pathVars!!!! */}
      {curapi?.document.request.pathVars &&
        curapi?.document.request.pathVars.length > 0 && (
          <UCReqItem
            //   fields={headersFields}
            formName={`testDetails.${currentApi.id}.request.pathVars`}
            name="path variables"
            control={control}
            item={curapi.document.request.pathVars}
          />
        )}
    </div>
  );
};

export default UCReqBox;
