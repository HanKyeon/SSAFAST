import MetaHead from '@/components/common/MetaHead';
import { SpinnerDots } from '@/components/common/Spinner';
import { tokenActions } from '@/store/token-slice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useStoreDispatch } from '@/hooks/useStore';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

// 여기도 권한 요청 받고서만 들어오는 곳.

const GoogleLoadingPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const [cookies, setCookie] = useCookies(['refresh']);

  console.log(props);

  const login = () => {
    const data = router.query;
    const refresh = data[`refresh-token`];
    const access = data[`access-token`];

    // 로그인 -> 여기와서 쿼리에서 re-t:쿠키, ac-t:reduxstore에 저장
    if (refresh) {
      setCookie('refresh', refresh);
      dispatch(tokenActions.setAccessToken({ accessToken: access }));
      dispatch(tokenActions.setRefreshToken({ refreshToken: refresh }));
    }
    router.push(`/space`);
  };

  useEffect(() => {
    login();
  });

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
