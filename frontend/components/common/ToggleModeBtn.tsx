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
      'w-[25px] h-[25px] bg-white rounded-full absolute right-0 top-[-2.5px] flex items-center justify-center',
  };

  return (
    <div className={`${styles['toggleBg']}`} onClick={onClickToggle}>
      <div className={`${styles['toggleCircle']}`}>
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
