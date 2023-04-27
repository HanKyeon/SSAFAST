import { useStoreDispatch } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';

const ToggleModeBtn = function (): JSX.Element {
  const dispatch = useStoreDispatch();
  const onClickToggle = (): void => {
    dispatch(darkActions.toggleDark({}));
  };
  return (
    <div
      className="w-[50px] h-[20px] bg-grayscale-deepdark rounded-[20px] relative"
      onClick={onClickToggle}
    >
      <div className="w-[25px] h-[25px] bg-white rounded-full absolute right-0 top-[-2.5px]"></div>
    </div>
  );
};

export default ToggleModeBtn;
