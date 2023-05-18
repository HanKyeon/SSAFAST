import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { useEffect, useState } from 'react';
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  FormProvider,
  Controller,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Button, CircleBtn, Input } from '@/components/common';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import ReqItem from '../APIDocsContainer/ReqItem';
import ReqItemBody from '../APIDocsContainer/ReqItemBody';
import {
  FieldsType,
  HeadersType,
  BodyType,
  MockupData2Type,
} from '../APIDocsContainer';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import {
  ApiDetailInTest,
  useApiDetailAtTest,
  useApiSingleTestDetail,
  useBaseUrl,
} from '@/hooks/queries/queries';
import ReqBoxPostman from '../APIDocsContainer/formComponent/ReqBoxPostman';
import apiRequest from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface LoadForm extends ApiDetailInTest {
  testInfo: {
    duration: number; // testInfo.duration
    reqPerSec: number; // testInfo.reqPerSec
  };
}

interface Props {
  selectedId: number;
  changeSetResponse: (data: any) => void;
}

const RequestForm = function ({ selectedId, changeSetResponse }: Props) {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const dispatch = useStoreDispatch();
  const queryClient = useQueryClient();
  const methods = useForm<LoadForm>();
  const { control, handleSubmit, reset } = methods;
  const { data: apiDetailData } = useApiSingleTestDetail(spaceId, selectedId);
  const { data: baseUrlListdata } = useBaseUrl(spaceId);

  useEffect(
    function () {
      if (apiDetailData) {
        reset({
          ...apiDetailData,
          testInfo: {
            duration: undefined, // testInfo.duration
            reqPerSec: undefined, // testInfo.reqPerSec
          },
        });
      }
    },
    [apiDetailData]
  );
  const formDataSettingHandler = function (data: LoadForm) {
    console.log(
      baseUrlListdata?.baseurls.find((v) => v.id === data.baseurlId)?.url
    );
    if (
      baseUrlListdata?.baseurls
        .find((v) => v.id === data.baseurlId)
        ?.url.split('/')[2]
        .slice(0, 9) === `localhost`
    ) {
      dispatch(DispatchToast('로컬 서버는 지원하지 않습니다!', false));
      return;
    }
    let url: string = `${
      baseUrlListdata?.baseurls.find((v) => v.id === data.baseurlId)?.url! +
      apiDetailData?.document.request.additionalUrl
    }`;
    console.log(`url :`, url);
    let method = data.method;
    console.log(
      `method :`,
      [``, `GET`, `POST`, `PUT`, `DEL`, `PATCH`][data.method]
    );
    let headers: any = {};
    data.document.request.headers.forEach((v) => {
      headers[v.keyName] = v.value;
    });
    console.log(`headers :`, headers);

    let pathVars: any = {};

    data.document.request.pathVars.forEach((v) => {
      pathVars[v.keyName] = v.value;
    });
    console.log(`path variables :`, pathVars);

    let params: any = {};
    data.document.request.params.forEach((v) => {
      params[v.keyName] = v.value;
    });

    console.log(`params :`, params);
    let body: any = {};

    // fields
    data.document.request.body.fields.map((v) => {
      body[v.keyName] = v.value;
    });

    // nestedDtos
    Object.keys(data.document.request.body.nestedDtos || {}).map((dtoId) => {
      data.document.request.body.nestedDtos![dtoId].map((dto) => {
        // nestedDtos = dto
        let ret: any = {}; // 이게 dto의 value
        // dto 값의 fields
        dto.fields!.map((v) => {
          ret[v.keyName] = v.value;
        });
        // 이중 중첩 dto
        Object.keys(dto.nestedDtos || {}).map((idtoId) => {
          dto.nestedDtos![idtoId].map((inDto) => {
            let ininRet: any = {};
            inDto.fields!.map((innerField) => {
              ininRet[innerField.keyName] = innerField.value;
            });
            ret[inDto.keyName!] = { ...ininRet };
          });
        });
        body[dto.keyName!] = { ...ret };
      });
    });
    let requestData = undefined;
    if (method === 1) {
      requestData = {
        url,
        method,
        headers,
        pathVars,
        params,
      };
    } else if (method === 3) {
      requestData = {
        url,
        method,
        headers,
        pathVars,
        params,
        body: JSON.stringify(body),
      };
    }
    if (data.testInfo.reqPerSec > 50) {
      dispatch(
        DispatchToast(
          '아직 50회 이상의 초당 요청 횟수는 지원되지 않습니다.',
          false
        )
      );
      return;
    }
    if (data.testInfo.duration > 5) {
      dispatch(
        DispatchToast('아직 5초 이상의 duration은 지원되지 않습니다.', false)
      );
      return;
    }
    // 요청 결과도 처리해야함.
    apiRequest({
      method: `post`,
      url: `/api/overload`,
      data: requestData,
      params: {
        workspaceId: parseInt(spaceId),
        apiId: selectedId,
        duration: data.testInfo.duration,
        reqSec: data.testInfo.reqPerSec,
      },
    }).then((res) => {
      console.log('리스폰스 내놔', res.data);
      changeSetResponse(res.data);
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="h-full w-full flex flex-col justify-between"
          onSubmit={handleSubmit(formDataSettingHandler)}
        >
          <div className="flex flex-col">
            <ReqBoxPostman selectedId={selectedId} />
            <div className="flex flex-col gap-7 pt-4">
              <Controller
                name={`testInfo.reqPerSec`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex">
                    <div className="flex gap-7">
                      <label className="w-48" htmlFor={`testInfo.reqPerSec`}>
                        Request Per Second
                      </label>
                      <div className="flex flex-col">
                        <Input
                          className="w-48 text-center"
                          type="text"
                          placeholder="초당 요청 횟수"
                          name={`testInfo.reqPerSec`}
                          onChange={field.onChange}
                        />
                        {fieldState?.invalid && (
                          <span>초당 요청 횟수를 입력하여 주세요</span>
                        )}
                      </div>
                    </div>
                    <>회</>
                  </div>
                )}
              />
              <Controller
                name={`testInfo.duration`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <div className="flex">
                    <div className="flex gap-7">
                      <label className="w-48" htmlFor={`testInfo.duration`}>
                        Duration
                      </label>
                      <div className="flex flex-col">
                        <Input
                          className="w-48 text-center"
                          type="text"
                          placeholder="요청 지속 시간"
                          name={`testInfo.duration`}
                          onChange={field.onChange}
                        />
                        {fieldState?.invalid && (
                          <span>지속 시간을 입력해 주세요.</span>
                        )}
                      </div>
                    </div>
                    <>초</>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex pb-4 justify-end items-end">
            <Button className="w-6" type="submit">
              실행
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default RequestForm;
