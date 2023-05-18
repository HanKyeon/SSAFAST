import { RTCSpaceData } from '@/pages/space/[spaceId]/work';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { PresenceUserData } from '../presence-type';
import Cursor from '../../common/Cursor';
import EditTab from './EditTab';
import LoadTestContainer from './LoadTestContainer';
import UseTestContainer from './usecase/UseTestContainer';
import { PointerEvent, useCallback, useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import { useStoreSelector } from '@/hooks/useStore';
import { Box, Button, Input } from '@/components/common';
import UseCaseTest from './usecase';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useOverloadBaseUrl } from '@/hooks/queries/queries';
import { ValidateUrl, useValidateUrl } from '@/hooks/queries/mutations';
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
interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const TestContainer = function ({ store, serverSideStore }: Props) {
  const others = useOthers<PresenceUserData>();
  const updatePresence = useUpdatePresence<PresenceUserData>();
  const pointerMoveHandler = useCallback(
    function (e: PointerEvent) {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    },
    [updatePresence]
  );
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: baseUrlListData, isLoading: isBaseUrlLoading } =
    useOverloadBaseUrl(parseInt(spaceId));

  const { mutate: certMutate, mutateAsync: certMutateAsync } = useValidateUrl(
    parseInt(spaceId)
  );

  const [isModal, setIsModal] = useState<boolean>(false);

  const closeModal = useCallback(function () {
    setIsModal(() => false);
  }, []);
  const openModal = useCallback(function () {
    setIsModal(() => true);
  }, []);

  const { presence: isPresence } = useStoreSelector((state) => state.dark);
  const [USE1LOAD2, setUSE1LOAD2] = useState<1 | 2>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [serverClass, setServerClass] = useState<1 | 2 | 3>(1);
  const goUseTest = function () {
    setUSE1LOAD2(() => 1);
  };
  const goLoadTest = function () {
    if (isAuthenticated === false) {
      openModal();
      return;
    }
    setUSE1LOAD2(() => 2);
  };

  const isBanned = function () {
    goUseTest();
    closeModal();
  };

  const isAccepted = async function (data: ValidateUrl) {
    // certMutateAsync(data).then(() => {
    //   setIsAuthenticated(true);
    //   closeModal();
    //   setUSE1LOAD2(() => 2);
    // });
  };
  const onSubmit = function (data: any) {
    console.log('data :', data);
  };

  const methods = useForm<ValidateUrl>();
  const { control, handleSubmit, reset } = methods;
  // console.log('baseUrlListData', baseUrlListData);
  return (
    <>
      {isModal && !baseUrlListData?.certification && (
        <Modal closeModal={closeModal} parentClasses="h-[80%] w-[80%]">
          <Box className="flex flex-col gap-4 w-full h-full p-5 items-center justify-center">
            <div className="text-[24px]">
              BaseUrl을 인증해야 사용할 수 있는 기능입니다.
            </div>
            <p>환경에 맞는 아래의 코드를 서버에 입력하여 실행해 주세요.</p>

            <div className="h-[50%] w-[50%] ">
              <div className="flex w-full">
                <div
                  onClick={() => setServerClass(1)}
                  className="cursor-pointer text-center text-sm h-[5%] py-2 px-7 rounded-tl-[8px] border-mincho-strong text-mincho-strong border-x-[2px] border-t-[2px] min-w-[40px] duration-[0.33s]"
                >
                  Java
                </div>
                <div
                  onClick={() => setServerClass(2)}
                  className="cursor-pointer text-center text-sm h-[5%] py-2 px-7 border-mincho-strong text-mincho-strong border-t-[2px] min-w-[40px] duration-[0.33s]"
                >
                  Flask
                </div>
                <div
                  onClick={() => setServerClass(3)}
                  className="cursor-pointer text-center text-sm h-[5%] py-2 px-7 rounded-tr-[8px] border-mincho-strong text-mincho-strong border-x-[2px] border-t-[2px] min-w-[40px] duration-[0.33s]"
                >
                  Django
                </div>
              </div>
              {serverClass === 1 && (
                <div className="w-full text-small h-[90%] border-red-900 border-[4px] flex flex-col justify-center items-center overflow-auto">
                  <pre>{`@RestController
@RequestMapping("/api/ssafast")
public class SsafastController {
    @PostMapping("")
    ResponseEntity<?> executeOverload(@RequestBody HashMap<String, String> map) {
        System.out.println(map.get("verification"));
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}`}</pre>
                </div>
              )}
              {serverClass === 2 && (
                <div className="w-full text-small h-[90%] border-red-900 border-[4px] flex flex-col items-center justify-center overflow-x-scroll">
                  <pre>
                    {`from flask import Flask, request

app = Flask(__name__)

@app.route('/api/ssafast', methods=['POST'])
def receive_message():
    message = request.form.get('verification')
    if not message:
        return 'fail'
    print(f'You sent: {message}')
    return 'success'`}
                  </pre>
                </div>
              )}
              {serverClass === 3 && (
                <div className="w-full text-small h-[90%] border-red-900 border-[4px] flex flex-col items-center justify-center overflow-x-scroll">
                  <pre>{`from django.http import HttpResponse
from django.views import View

class Ssafast(View):
    def post(self, request, *args, **kwargs):
        message = request.POST.get('verification', '')
        if message == '':
            return HttpResponse('fail')
        print(message)
        return HttpResponse('success')`}</pre>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-start overflow-y-scroll h-[40%] w-full">
              <label className="text-[18px]">인증해야할 URL 목록</label>
              <p>{`( 실행한 코드에서 나온 5자리의 수를 입력해주세요. )`}</p>
              <br />
              {baseUrlListData?.baseurls.map((item, index) => (
                <>
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex w-[50%] justify-between gap-12">
                        <div key={item.id}>{item.url}</div>
                        {/* {baseUrlListData.isCertified && (<div>
                      인증 완료
                    </div>)} */}
                        {!item.isCertified && (
                          <Controller
                            name={`certCodes.${index}.code`}
                            control={control}
                            render={({ field }) => {
                              return (
                                <Input
                                  placeholder="5자리 숫자"
                                  name={`certCodes.${index}.code`}
                                  type="text"
                                  onChange={field.onChange}
                                  value={field.value}
                                  className="text-center !w-24"
                                />
                              );
                            }}
                          />
                        )}
                        {item.isCertified && (
                          <div className="text-green-400">인증 완료</div>
                        )}
                      </div>
                    </form>
                  </FormProvider>
                </>
              ))}
            </div>
            <div className="flex flex-row gap-4">
              <Box
                variant="three"
                className="w-[80px] h-[60px] rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                // onClick={isAccepted}
              >
                인증하기
              </Box>
              <div
                className="w-[80px] h-[60px] bg-red-500 rounded-[13px] flex items-center justify-center cursor-pointer hover:scale-105 duration-[0.33s]"
                onClick={isBanned}
              >
                나가기
              </div>
            </div>
          </Box>
        </Modal>
      )}
      <div
        className="h-full w-full overflow-hidden"
        onPointerMove={pointerMoveHandler}
      >
        <EditTab
          goUseTest={goUseTest}
          goLoadTest={goLoadTest}
          isActive={USE1LOAD2}
        />
        {USE1LOAD2 % 2 ? <UseCaseTest /> : <LoadTestContainer />}
      </div>
      {isPresence &&
        others
          .filter((user) => user.presence.step === 1 && !user.presence.place)
          .map((user) => (
            <Cursor key={`${Math.random()}`} {...user.presence} />
          ))}
    </>
  );
};

export default TestContainer;
