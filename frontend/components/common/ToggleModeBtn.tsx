import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import { HiMoon, HiSun } from 'react-icons/hi';

const ToggleModeBtn = function (): JSX.Element {
  const { dark: isDark } = useStoreSelector((state) => state.dark);
  const dispatch = useStoreDispatch();
  const onClickToggle = (): void => {
    dispatch(darkActions.toggleDark({}));
  };

  const styles = {
    toggleBg: 'w-[45px] h-[20px] bg-grayscale-deepdark rounded-[20px] relative',
    toggleCircle:
      'w-[25px] h-[25px] bg-white rounded-full absolute top-[-2.5px] flex items-center justify-center transition-all duration-[0.4s]',
  };

  return (
    <div
      className={`${styles['toggleBg']} cursor-pointer`}
      onClick={onClickToggle}
    >
      <div
        className={`${styles['toggleCircle']} ${
          isDark ? 'right-[0%]' : 'right-[100%] translate-x-[100%]'
        } hover:scale-[105%]`}
      >
        {isDark ? (
          <HiMoon className="text-grayscale-dark" />
        ) : (
          <HiSun className="text-grayscale-dark" />
        )}
      </div>
    </div>
  );
};

export default ToggleModeBtn;
