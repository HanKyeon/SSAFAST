import { PropsWithChildren, useEffect, useState } from 'react';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import ReactDOM from 'react-dom';
import AnimationBox from './AnimationBox';
import styles from './Toast.module.css';
import { toastActions } from '@/store/toast-slice';
import { useRouter } from 'next/router';

interface Props {
  message?: string;
}

const Smile = function () {
  return (
    <>
      <div
        className={`${
          styles[`face`]
        } max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] translate-y-[10%]`}
      >
        <div className={`${styles[`eye`]}`}></div>
        <div className={`${styles[`eye`]} ${styles[`right`]}`}></div>
        <div className={`${styles[`mouth`]} ${styles[`happy`]}`}></div>
      </div>
      <div className={`${styles[`shadow`]} ${styles[`scale`]}`}></div>
    </>
  );
};
const Sad = function () {
  return (
    <>
      <div
        className={`${
          styles[`face2`]
        } max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] translate-y-[10%]`}
      >
        <div className={`${styles[`eye`]}`}></div>
        <div className={`${styles[`eye`]} ${styles[`right`]}`}></div>
        <div className={`${styles[`mouth`]} ${styles[`sad`]}`}></div>
      </div>
      <div className={`${styles[`shadow`]} `}></div>
    </>
  );
};

const Toast = function ({ children }: PropsWithChildren<Props>) {
  const {
    isToast,
    isSuccess,
    message: toastMessage,
    nextURL,
  } = useStoreSelector((state) => state.toast);
  const dispatch = useStoreDispatch();
  const router = useRouter();
  const closeToast = function () {
    dispatch(toastActions.toastOff({}));
  };
  const [urlClass, setURLClasses] = useState<string>(
    nextURL ? `cursor-pointer text-blue-500` : ``
  );
  useEffect(
    function () {
      setURLClasses(() => (nextURL ? `cursor-pointer text-blue-500` : ``));
    },
    [nextURL]
  );
  const goNextURL = function () {
    if (nextURL) {
      router.push(nextURL);
      // window.location.href = nextURL;
    }
  };

  if (typeof window === `undefined`) {
    return <></>;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <AnimationBox
          isOpened={isToast}
          className={`box-border fixed min-w-[288px] w-[32%] h-[15%] z-[100] flex justify-center items-center bottom-[0%] left-[50%]`}
        >
          <div
            className={`box-border w-full h-full rounded-[8px] flex flex-row items-center justify-center z-[100] translate-x-[-50%] translate-y-[-30%] p-2 bg-[#FFFEE1] shadow-2xl drop-shadow-2xl duration-[0.33s] active:bg-[#F4F2C3]`}
            onClick={closeToast}
          >
            <div
              className={`box-border flex flex-row items-center justify-evenly w-full h-full rounded-[8px] border-[6px] border-[#FEDEAC] bg-[#FFFEE1] duration-[0.33s] active:bg-[#F4F2C3]`}
            >
              <div
                className={`box-border basis-[32%] w-[32%] h-full flex flex-col items-center justify-center gap-1`}
              >
                {isSuccess ? <Smile /> : <Sad />}
              </div>
              <div
                className={`basis-[68%] w-[68%] flex font-hopang-black items-center justify-center whitespace-pre-line flex-col px-3 ${
                  toastMessage.length > 10 ? `text-[1.33rem] ` : `text-[1.9rem]`
                }`}
              >
                {nextURL ? toastMessage : toastMessage}
                {nextURL && (
                  <>
                    <div onClick={goNextURL} className={`${urlClass}`}>
                      이동하기
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </AnimationBox>,
        document.getElementById('backdrop-root')!
      )}
    </>
  );
};

export default Toast;
