import { tokenActions } from '@/store/token-slice';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import store, { DispatchToast } from '@/store/index';
import { figmaTokenActions } from '@/store/figma-token-slice';

/*
서버에 요청을 날리는 axios instance
*/

const figmaAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOSTNAME}`,
  withCredentials: true,
});

// request 인터셉터
figmaAxios.interceptors.request.use(
  (config) => {
    const state = store.getState(); // 리덕스 상태 가져오기
    const accessToken = state.figmatoken.figmaAccess; // 리덕스 accessToken 읽기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // 리덕스에 accessToken이 있을 경우 Authorization 헤더 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 인터셉터
figmaAxios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log(error);
    const response = error.response; // 에러 정보
    if (response.status === 401) {
      const originalConfig = error.config; // 기존 요청 정보 저장 (accessToken 재발급 후 재요청)
      // access Token 재발급
      const state = store.getState(); // 리덕스 상태 가져오기
      const refreshToken = state.figmatoken.figmaRefresh; // 리덕스 refreshToken 읽기
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `/api/oauth/refresh`,
        params: {
          client_id: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_ID}`,
          client_secret: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_SECRET}`,
          refresh_token: `${refreshToken}`,
        },
      };
      return axios(config)
        .then((res) => {
          const figmaAccess = res['figma_access' as keyof AxiosResponse];
          store.dispatch(
            figmaTokenActions.setAccessToken({ figmaAccess: figmaAccess })
          );
          originalConfig.headers.Authorization = `Bearer ${figmaAccess}`;
          return axios(originalConfig);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } else if (response.status === 403) {
      store.dispatch(DispatchToast('권한이 없습니다.', false));
    } else if (response.status >= 500) {
      store.dispatch(
        DispatchToast(
          '서버와의 통신할 수 없습니다.\n 잠시 후 다시 시도해 주세요',
          false
        )
      );
    }
    return Promise.reject(error);
  }
);

export default figmaAxios;
