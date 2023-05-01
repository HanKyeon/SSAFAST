import { useEffect, useMemo, useState } from 'react';
import {
  useFigmaDatas,
  useFigmaSections,
  useSpaceFrames,
} from './queries/queries';
import { useQueryClient } from '@tanstack/react-query';

const useFigmaOrigin = function (
  figmaId: string = ``,
  spaceId: string = ``,
  selectedIds: string[] = [`4:14`, `115:522`, `101:417`, `232:1897`, `232:2481`]
) {
  const queryClient = useQueryClient();

  const {
    data: figmaData,
    isLoading: figmaDataLoading,
    isPreviousData: isFigmaPreviousData,
  } = useFigmaDatas(figmaId);
  const { data: figmaImages, isLoading: figmaImagesLoading } = useFigmaSections(
    figmaId,
    figmaData?.ids || ``
  );
  const { data: selectedFrames, isLoading: selectedFramesLoading } =
    useSpaceFrames(spaceId);
  const figmaIds = figmaData?.ids.split(','); // selectedFrames에서 figmaIds를 받음

  const figmaRefineData = useMemo(
    function () {
      if (figmaData && figmaImages) {
        return figmaData.noz.map((nod) => {
          return {
            ...nod,
            image: figmaImages.images[`${nod.figmaId}`],
            selected: !!selectedIds.find((nodId) => nodId === nod.figmaId),
          };
        });
      }
      return [];
    },
    [figmaData, figmaImages, selectedIds, figmaId]
  );

  return {
    figmaData,
    figmaImages,
    figmaDataLoading,
    figmaImagesLoading,
    figmaRefineData,
  };
};

export default useFigmaOrigin;
