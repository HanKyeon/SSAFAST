import { FormEvent, useEffect, useState } from 'react';
import { Box, Button } from '../common';
import { workFigma } from './presence-type';
import AnimationBox from '../common/AnimationBox';

interface Props {
  figmaData: workFigma;
  activeIdx: number | null;
  idx: number;
  setActive: (idx: number | null) => void;
}

const FigmaListItem = function ({
  figmaData,
  activeIdx,
  idx,
  setActive,
}: Props) {
  const [isExpand, setIsExpand] = useState<boolean>(activeIdx === idx);

  useEffect(
    function () {
      setIsExpand(() => activeIdx === idx);
    },
    [activeIdx]
  );

  const expandHandler = function (e: FormEvent) {
    e.preventDefault();
    if (idx === activeIdx) {
      setActive(null);
    } else {
      setActive(idx);
    }
  };
  const deleteHandler = function (e: FormEvent) {
    e.stopPropagation();
    console.log('삭제 모달 온');
  };
  return (
    <Box
      variant="three"
      fontType="normal"
      className="pt-3 px-5 whitespace-nowrap w-full h-auto duration-[0.33s] flex flex-col gap-6 pb-4 cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between gap-5 w-full">
        <div
          className="w-full text-ellipsis overflow-hidden"
          onClick={expandHandler}
        >
          {figmaData.name}
        </div>
        <Button className="text-[1.2rem]" onClick={deleteHandler}>
          삭제
        </Button>
      </div>

      {isExpand && (
        <AnimationBox
          isOpened={isExpand}
          appearClassName="animate-[appear-opacity-softly_0.22s_both]"
          disappearClassName="animate-[disappear-opacity-softly_0.22s_both] relative"
          className="w-full"
        >
          <img
            className="object-contain rounded-[8px] w-full"
            src={figmaData.sectionUrl}
            alt={`${figmaData.name}`}
          />
        </AnimationBox>
      )}
    </Box>
  );
};

export default FigmaListItem;
