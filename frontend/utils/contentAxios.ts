import { tokenActions } from '@/store/token-slice';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import store, { DispatchToast } from '@/store/index';

/*
서버에 요청을 날리는 axios instance
*/

// const interceptorRequest = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_HOSTNAME}`, // 서버 주소
//   withCredentials: true,
//   timeout: 10000, // 10초까지만 대기
// });

const contentAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOSTNAME}`, // 서버 주소
  withCredentials: true,
  timeout: 10000, // 10초까지만 대기
});
contentAxios.defaults.headers.post[`Content-Type`] = `multipart/form-data`;
// request 인터셉터
contentAxios.interceptors.request.use(
  (config) => {
    const state = store.getState(); // 리덕스 상태 가져오기
    const accessToken = state.token.accessToken; // 리덕스 accessToken 읽기

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
contentAxios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    const response = error.response; // 에러 정보
    if (response.status === 401) {
      console.log('재요청');
      const originalConfig = error.config; // 기존 요청 정보 저장 (accessToken 재발급 후 재요청)

      // access Token 재발급
      const state = store.getState(); // 리덕스 상태 가져오기
      const accessToken = state.token.accessToken; // 리덕스 accessToken 읽기
      const refreshToken = state.token.refreshToken; // 리덕스 refreshToken 읽기

      const config: AxiosRequestConfig = {
        method: 'post',
        url: `/api/auth/reissue`,
      };

      return axios(config)
        .then((res) => {
          console.log('토큰 재발급 성공', res);
          const newAccessToken = res.headers.getAuthorization;
          store.dispatch(
            tokenActions.setAccessToken({ accessToken: newAccessToken })
          );

          // 기존 요청 새로운 token으로 재시도
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          return contentAxios(originalConfig);
        })
        .catch((err) => {
          console.log('토큰 재발급 에러 : ', err);
          store.dispatch(tokenActions.resetTokens({}));
          store.dispatch(DispatchToast('다시 로그인해주세요.', false));
          // window.location.href = 'https://www.ssafast.com';
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

export default contentAxios;
