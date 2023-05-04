import MetaHead from '@/components/common/MetaHead';
import { SpinnerDots } from '@/components/common/Spinner';
import { tokenActions } from '@/store/token-slice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

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

export const getServerSideProps: GetServerSideProps = async function (context) {
  return {
    props: {},
  };
};
