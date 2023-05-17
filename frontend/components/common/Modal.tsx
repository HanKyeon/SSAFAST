import { PropsWithChildren, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { ImCross } from 'react-icons/im';
import AnimationBox from './AnimationBox';

interface Props {
  closeModal: () => void;
  parentClasses?: string;
}

function Modal({
  closeModal,
  parentClasses,
  children,
}: PropsWithChildren<Props>) {
  if (typeof window === `undefined`) {
    return <></>;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={closeModal}
            className={`flex justify-center items-center absolute z-50 top-0 right-0 bg-black bg-opacity-60 w-full h-full`}
          >
            <div
              className={`${parentClasses}`}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimationBox className="h-full w-full">{children}</AnimationBox>
            </div>
          </div>
        </>,
        document.getElementById('overlay-root')!
      )}
    </>
  );
}

export default Modal;
