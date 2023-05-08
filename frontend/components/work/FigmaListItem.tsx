import { FormEvent, useEffect, useState } from 'react';
import { Box, Button } from '../common';
import { workFigma } from './presence-type';
import AnimationBox from '../common/AnimationBox';
import { SpaceFigma } from '@/hooks/queries/queries';
import Modal from '../common/Modal';
import { HiOutlineTrash } from 'react-icons/hi';
import { APIInfoType } from './APIEditContainer/APIList';
import APIlistItem from '../apis/APIlistItem';

interface Props {
  apiData?: APIInfoType[];
  figmaData: SpaceFigma;
  activeIdx: number | null;
  idx: number;
  setActive: (idx: number | null) => void;
}

const FigmaListItem = function ({
  apiData,
  figmaData,
  activeIdx,
  idx,
  setActive,
}: Props) {
  const [isExpand, setIsExpand] = useState<boolean>(activeIdx === idx);
  const [isModal, setIsModal] = useState<boolean>(false);
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
    setIsModal(() => true);
  };
  return (
    <>
      <AnimationBox isOpened={isModal} className="fixed">
        <Modal
          parentClasses="fixed h-[50%] w-[50%]"
          closeModal={() => setIsModal(() => false)}
        >
          <Box
            className={`w-full h-full flex flex-col items-center justify-center p-4`}
          >
            {figmaData.name}을 지우시겠습니까?
            <div className="w-full h-[20%] flex flex-row items-center justify-center gap-5">
              <Box
                className="basis-[33%] w-[33%] h-full flex items-center justify-center bg-mincho-normal"
                onClick={() => {
                  console.log('실행');
                  setIsModal(() => false);
                }}
              >
                ㅇㅇ
              </Box>
              <Box
                className="basis-[33%] w-[33%] h-full flex items-center justify-center bg-bana-normal"
                onClick={() => setIsModal(() => false)}
              >
                ㄴㄴ
              </Box>
            </div>
          </Box>
        </Modal>
      </AnimationBox>
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
            #{idx + 1} {figmaData.name}
          </div>
          {/* <Button className="text-[1.2rem]" onClick={deleteHandler}>
            삭제
          </Button> */}
          {activeIdx === idx && (
            <HiOutlineTrash
              className={`text-grayscale-dark hover:text-mammoth-normal text-[24px]`}
              onClick={deleteHandler}
            />
          )}
        </div>

        {isExpand && (
          <>
            <AnimationBox
              isOpened={isExpand}
              appearClassName="animate-[appear-opacity-softly_0.22s_both]"
              disappearClassName="animate-[disappear-opacity-softly_0.22s_both] relative"
              className="w-full"
            >
              <img
                className="object-contain rounded-[8px] w-full"
                src={figmaData.sectionUrl!}
                alt={`${figmaData.name}`}
              />
            </AnimationBox>
            {apiData?.length !== 0 && (
              <ul
                className={`w-[95%] my-0 mx-auto flex flex-col gap-1 duration-[0.33s]`}
              >
                {apiData?.map((api) => (
                  <APIlistItem key={api.id} item={api} />
                ))}
              </ul>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default FigmaListItem;
