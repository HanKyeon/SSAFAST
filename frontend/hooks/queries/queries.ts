import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './QueryKeys';

export const a = 1;

export const useFigmaTokens = function (figmaId: string) {
  return useQuery({
    queryKey: queryKeys.figmaTokens(figmaId),
    queryFn: async function () {
      return;
    },
    onSuccess: function () {},
    onError: function () {},
    refetchOnMount: false,
  });
};

export const useFigmaDatas = function (figmaId: string) {
  return useQuery({
    queryKey: queryKeys.figmaDatas(figmaId),
    queryFn: async function () {
      return;
    },
    onSuccess: function () {},
    onError: function () {},
    refetchOnMount: false,
  });
};

export const useFigmaSections = function (figmaId: string) {
  return useQuery({
    queryKey: queryKeys.figmaSections(figmaId),
    queryFn: async function () {
      return;
    },
    onSuccess: function () {},
    onError: function () {},
    refetchOnMount: false,
  });
};
