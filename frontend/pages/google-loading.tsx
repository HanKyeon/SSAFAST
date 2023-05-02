import MetaHead from '@/components/common/MetaHead';
import { SpinnerDots } from '@/components/common/Spinner';

const GoogleLoadingPage = function () {
  return (
    <>
      <MetaHead />
      <div className="h-full w-full flex items-center justify-center">
        <SpinnerDots />
      </div>
    </>
  );
};

export default GoogleLoadingPage;
