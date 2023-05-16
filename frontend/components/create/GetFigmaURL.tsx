import { FormEvent, RefObject, useEffect, useRef } from 'react';
import { Button } from '../common';
import useInput from '@/hooks/useInput';
import { useFigmaDatas, useUserFigmaTokens } from '@/hooks/queries/queries';
import AnimationBox from '../common/AnimationBox';
import Description from '../../public/assets/images/Description.png';
import Image from 'next/image';
import { SpinnerDots } from '../common/Spinner';
import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { toastActions } from '@/store/toast-slice';

interface Props {
  setFigmaIdHandler: (id: string) => void;
  setFigmaUrlHandler: (url: string) => void;
  fstData?: string;
  figmaId?: string;
}

const GetFigmaURL = function ({
  fstData = ``,
  figmaId = ``,
  setFigmaIdHandler,
  setFigmaUrlHandler,
}: Props) {
  const dispatch = useStoreDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: userFigmaTokens,
    isLoading: userFigmaTokenLoading,
    isError: userFigmaTokenError,
  } = useUserFigmaTokens();

  const { onChangeHandler, inputData, setFstData } = useInput(inputRef, 2500);
  useEffect(function () {
    if (fstData.trim().length) {
      setFstData(fstData);
    }
  }, []);

  const acceptFigmaUrlHandler = function (e: FormEvent) {
    e.preventDefault();
    if (!userFigmaTokens) {
      window.location.href = `https://www.figma.com/oauth?
client_id=${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_HOSTNAME}/figma-loading&scope=file_read&state=asdaa&response_type=code`;
      dispatch(
        DispatchToast(
          '피그마 접근 권한 요청 부탁드립니다! 잠시 기다려주세요!',
          true
        )
      );
      return;
    }
    if (inputData.trim().length) {
      setFigmaUrlHandler(inputData);
      setFigmaIdHandler(inputData.split(`?`)[0].split(`/`)[4]);
    } else {
      dispatch(DispatchToast('url을 입력해주세요!', false));
    }
  };

  const { data, isLoading, isFetching, isError } = useFigmaDatas(figmaId);

  useEffect(function () {
    dispatch(toastActions.toastOff({}));
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-5 py-4 text-[24px]">
      <div>피그마 url을 입력해주세요.</div>

      <div className="flex flex-row justify-center items-center w-full text-ellipsis whitespace-nowrap text-[23px]">
        <div className="h-full w-[60%] flex flex-row justify-center items-center border-b-[3px] border-b-theme-white-normal py-3 px-2 gap-3">
          <input
            className="p-2 bg-opacity-0 bg-theme-dark-normal w-[60%]"
            ref={inputRef}
            onChange={onChangeHandler}
            placeholder="피그마 초대 url을 입력해주세요!"
            size={2500}
          />
          <Button
            className="hover:scale-[105%] active:bg-teal-500"
            onClick={acceptFigmaUrlHandler}
          >
            {isFetching ? <SpinnerDots /> : '확인'}
          </Button>
        </div>
      </div>
      <div className="w-full h-[66%] flex items-center justify-center relative">
        <AnimationBox
          isOpened={!!data?.thumbnails && !isFetching}
          className="h-full w-full rounded-[13px] flex items-center justify-center flex-col gap-4"
        >
          <img
            className="h-[90%] object-contain rounded-[13px] bg-theme-dark-light p-3"
            src={`${data?.thumbnails}`}
            alt="피그마"
          />
          <div className="h-[10%] w-full flex items-center justify-center">
            {data?.name}
          </div>
        </AnimationBox>
        <AnimationBox
          isOpened={!data?.thumbnails && !isFetching}
          className="h-full w-full rounded-[13px] flex items-center justify-center"
        >
          <Image
            src={Description}
            alt={'안내'}
            className="h-full w-full object-contain"
            width={50}
            height={50}
          />
        </AnimationBox>
      </div>
    </div>
  );
};

export default GetFigmaURL;
