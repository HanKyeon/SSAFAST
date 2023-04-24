import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import apiRequest from '@/utils/axios';

const useApiDebounce = function (
  value: string,
  request: AxiosRequestConfig,
  delay: number = 1000
) {
  useEffect(
    function () {
      const id = setTimeout(function () {
        apiRequest(request);
      }, delay);
      return function () {
        clearTimeout(id);
      };
    },
    [value]
  );
};

export default useApiDebounce;
