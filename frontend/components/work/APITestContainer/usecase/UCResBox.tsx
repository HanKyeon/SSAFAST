import { useRouter } from 'next/router';
import { UseTestApiCompactType } from './UseTestContainer';
import { SpaceParams } from '@/pages/space';
import {
  PrevResponse,
  UsecaseDetailType,
  UsecaseListItemType,
  useUsecaseResponses,
} from '@/hooks/queries/queries';
import ToggleableHeader from '../../APIDocsContainer/ToggleableHeader';
import UCResItem from './UCResItem';
import { Control } from 'react-hook-form';
import { useEffect, useState } from 'react';
import UCResItemDto from './UCResItemDto';

type UCResBoxPropsType = {
  curUsecase: UsecaseListItemType;
  currentApi: UseTestApiCompactType;
  resApiIds: string;
  control: Control<UsecaseDetailType, any>;
};

const UCResBox = function ({
  curUsecase,
  currentApi,
  resApiIds,
  control,
}: UCResBoxPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: resDatas,
    isLoading,
    isError,
  } = useUsecaseResponses(spaceId, resApiIds);

  // const [refineData, setRefineData] = useState<any>({});
  // useEffect(() => {
  //   let headersFields: any = [];
  //   let bodyFields: any = [];
  //   let nestedDtosFIelds: any = [];
  //   resDatas?.forEach((api) => {
  //     api.headers?.forEach((header) => {
  //       headersFields.push({
  //         keyName: header.keyName,
  //         type: header.type,
  //         desc: header.desc,
  //         value: header.value,
  //         itera: header.itera,
  //         constraints: [...header.constraints!],
  //       });
  //     });

  //     api.body?.fields?.forEach((bodyField) => {
  //       bodyFields.push({
  //         keyName: bodyField.keyName,
  //         type: bodyField.type,
  //         desc: bodyField.desc,
  //         value: bodyField.value,
  //         itera: bodyField.itera,
  //         constraints: [...bodyField.constraints!],
  //       });
  //     });

  //     for (const [dtoId, dtoLi] of Object.entries(api.body?.nestedDtos || {})) {
  //       dtoLi.forEach((dto) => {
  //         dto.fields?.forEach((innerField) => {
  //           nestedDtosFIelds.push({
  //             keyName: `${dto.name}.${innerField.keyName}`,
  //             type: innerField.type,
  //             desc: innerField.desc,
  //             itera: innerField.itera,
  //             constraints: [...innerField.constraints!],
  //             value: innerField.value,
  //           });
  //         });
  //       });
  //     }
  //   });
  //   setRefineData({
  //     headers: headersFields,
  //     body: bodyFields,
  //     nestedDtos: nestedDtosFIelds,
  //   });

  //   console.log('response 목록!!!!!!!', resDatas);
  // }, [resDatas]);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className={`flex-1 overflow-scroll scrollbar-hide`}>
      {resDatas?.map((resData: PrevResponse, idx: number) => (
        <>
          <ToggleableHeader
            key={`${resData.apiId}-container-${idx}`}
            title={resData.apiName}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {isOpen && (
            <>
              {resData.headers && (
                <UCResItem
                  key={`${resData.apiId}-${idx}-res-header-item`}
                  item={resData.headers}
                  name={'headers'}
                  control={control}
                  formName={`${resData.apiId}.headers`}
                />
              )}
              {resData.body &&
                resData.body.fields &&
                resData.body.fields.length > 0 && (
                  <UCResItem
                    key={`${resData.apiId}-${idx}-body-item`}
                    item={resData.body.fields}
                    name={'body_fields'}
                    control={control}
                    formName={`${resData.apiId}.body`}
                  />
                )}
              {resData.body && resData.body.nestedDtos && (
                <UCResItemDto
                  key={`${resData.apiId}-${idx}-body-nested`}
                  item={resData.body.nestedDtos}
                  name={'body_dtos'}
                  control={control}
                  formName={`${resData.apiId}.body`}
                />
              )}
            </>
          )}
          {/* // <div className={`w-full`}>
        //   <ToggleableHeader title={resData.apiName} />
        // </div> */}
        </>
      ))}
    </div>
  );
};

export default UCResBox;
