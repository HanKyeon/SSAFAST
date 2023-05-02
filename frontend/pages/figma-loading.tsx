import MetaHead from '@/components/common/MetaHead';
import { SpinnerDots } from '@/components/common/Spinner';
import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import { figmaTokenActions } from '@/store/figma-token-slice';
import apiRequest from '@/utils/axios';
import figmaAxios from '@/utils/figmaAxios';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 여기는 권한 요청 받고서만 들어오는 곳.

const FigmaCodeLoadingPage = function () {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const { code, state } = router.query;
  useEffect(
    function () {
      if (!code || code.length === 0) {
        return;
      }
      figmaAxios({
        method: `post`,
        baseURL: `https://www.figma.com`,
        url: `/api/oauth/token`,
        params: {
          client_id: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_ID}`,
          response_type: `code`,
          redirect_uri: `${process.env.NEXT_PUBLIC_HOSTNAME}/figma-loading`,
          client_secret: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_SECRET}`,
          code: code,
          grant_type: `authorization_code`,
        },
      })
        .then((res) => {
          const access = res[`access_token` as keyof AxiosResponse];
          const refresh = res[`refresh_token` as keyof AxiosResponse];
          if (access && refresh) {
            dispatch(figmaTokenActions.setAccessToken({ figmaAccess: access }));
            dispatch(
              figmaTokenActions.setRefreshToken({ figmaRefresh: refresh })
            );
            // user의 figma token을 저장하는 요청.
            apiRequest({
              method: `post`,
              data: {
                // 토큰 두개 넣어서 post
              },
            });
          }
        })
        .then((res) => {
          dispatch(DispatchToast('생성 완료!', true));
          router.push(`/space`);
        })
        .catch((err) => {
          dispatch(DispatchToast('에러가 발생했습니다!', false));
          router.push(`/space`);
        });
    },
    [code]
  );
  return (
    <>
      <MetaHead />
      <div className="h-full w-full flex items-center justify-center">
        <SpinnerDots />
      </div>
    </>
  );
};

export default FigmaCodeLoadingPage;
