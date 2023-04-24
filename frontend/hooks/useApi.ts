import { useCallback, useState } from 'react';
import { useStoreDispatch } from './useStore';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiRequest from '@/utils/axios';

const useApi = function () {
  const dispatch = useStoreDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // 순수 axios 사용 할 때
  const axiosFn = useCallback(async function (
    requestData: AxiosRequestConfig,
    setDataFn: (res: AxiosResponse) => void,
    useToast: boolean = false,
    successMessage: string = `성공!`,
    failureMessage: string = `실페!`
  ) {
    setIsLoading(() => true);
    setIsError(() => false);
    await axios(requestData)
      .then((res) => {
        setDataFn(res);
      })
      .then((res) => {
        setIsLoading(() => false);
      })
      .catch((err) => {
        setIsError(() => true);
        setIsLoading(() => false);
      });
  },
  []);

  // interceptor 적용된 api 요청 시
  const apiRequestFn = useCallback(async function (
    requestData: AxiosRequestConfig,
    setDataFn: (res: AxiosResponse) => void,
    useToast: boolean = false,
    successMessage: string = `성공!`,
    failureMessage: string = `실페!`
  ) {
    setIsLoading(() => true);
    setIsError(() => false);
    await apiRequest(requestData)
      .then((res) => {
        setDataFn(res);
      })
      .then((res) => {
        setIsLoading(() => false);
      })
      .catch((err) => {
        setIsError(() => true);
        setIsLoading(() => false);
      });
  },
  []);

  return {
    isLoading,
    isError,
    axiosFn,
    apiRequestFn,
  };
};

export default useApi;
