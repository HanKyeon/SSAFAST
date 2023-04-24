import { useStoreDispatch } from '@/hooks/useStore';
import { DispatchToast } from '@/store';
import apiRequest from '@/utils/axios';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const FigmaCodeLoadingPage = function () {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const { code, state } = router.query;
  useEffect(
    function () {
      if (!code || code.length === 0) {
        return;
      }
      axios({
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
          // tokenDispatch
          // res[`user_id`]
          // res[`access_token`]
          // res[`refresh_token`]

          // user의 figma token 갱신하는 요청
          apiRequest({
            method: `post`,
          });
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
      <div>하이요 피그마 토큰 받아오고 저장하고 있어용~</div>
    </>
  );
};

export default FigmaCodeLoadingPage;
