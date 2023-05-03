import MetaHead from '@/components/common/MetaHead';
import { SpinnerDots } from '@/components/common/Spinner';
import { wrapper } from '@/store';
import { tokenActions } from '@/store/token-slice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

const GoogleLoadingPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(props);
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async function (context) {
      const access = context.req.headers['www-authenticate'];
      if (access) {
        store.dispatch(tokenActions.setAccessToken({ accessToken: access }));
      }

      return {
        props: {
          asdf: `asdf`,
          access: access || '안되는데용?',
        },
      };
    };
  });
