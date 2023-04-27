import { useMemo, useState } from 'react';
import {
  useFigmaDatas,
  useFigmaSections,
  useSelectedFrames,
} from './queries/queries';

const useFigmaOrigin = function (figmaId: string = ``, spaceId: string = ``) {
  const { data: figmaData, isLoading: figmaDataLoading } =
    useFigmaDatas(figmaId);
  const { data: figmaImages, isLoading: figmaImagesLoading } = useFigmaSections(
    figmaId,
    figmaData?.ids || ``
  );
  const { data: selectedFrames, isLoading: selectedFramesLoading } =
    useSelectedFrames(spaceId);
  const figmaIds = figmaData?.ids.split(','); // selectedFrames에서 figmaIds를 받음
  const 골라진임의값 = [`4:14`, `115:522`, `101:417`, `232:1897`, `232:2481`];

  const figmaRefineData = useMemo(
    function () {
      if (figmaData && figmaImages) {
        return figmaData.noz.map((nod) => {
          return {
            ...nod,
            image: figmaImages.images[`${nod.figmaId}`],
            selected: !!골라진임의값.find((nodId) => nodId === nod.figmaId),
          };
        });
      }
      return [];
    },
    [figmaData, figmaImages, 골라진임의값]
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
