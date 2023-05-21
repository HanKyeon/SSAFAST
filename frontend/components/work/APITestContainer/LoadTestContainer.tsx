import { Box } from '@/components/common';
import { useStoreSelector } from '@/hooks/useStore';
import LoadItem from './LoadItem';
import LoadResult from './LoadResult';
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import APIList from '../APIEditContainer/APIList';
import { useApiSingleTestDetail } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';

const LoadTestContainer = function () {
  const { dark } = useStoreSelector((state) => state.dark);
  const [api, setApi] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [currentApiId, setCurrentApiId] = useState<number | string>(0);
  const [responseData, setResponseData] = useState<any>();
  const apiIdHandler = function (id: string | number) {
    setCurrentApiId(id);
    setIsModal(false);
    console.log(currentApiId);
    if (id !== 0) {
      setApi(true);
    }
  };

  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { data: selectedApiData } = useApiSingleTestDetail(
    spaceId,
    currentApiId
  );

  const selectApi = function () {
    setIsModal(true);
  };

  const closeModal = function () {
    setIsModal((v) => !v);
  };
  const changeSetResponse = function (data: any) {
    setResponseData(data);
  };
  return (
    <>
      {isModal && (
        <Modal closeModal={closeModal} parentClasses="h-[50%] w-[50%]">
          <Box className={`w-full h-full pt-7 pb-5 px-10 flex flex-col gap-7`}>
            <div className={`w-full text-center`}>
              추가할 API를 선택해 주세요.
            </div>
            <div className={`w-full flex-1 overflow-scroll scrollbar-hide`}>
              <APIList apiIdHandler={apiIdHandler} isFiltered={true} />
            </div>
          </Box>
        </Modal>
      )}
      <Box
        variant="one"
        fontType="header"
        className="h-full w-full flex flex-row gap-[1.12%]"
      >
        {/* 왼쪽 */}
        <Box
          variant="two"
          fontType="normal"
          className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center overflow-y-scroll p-4 flex flex-col"
        >
          <LoadItem
            api={api}
            selectApi={selectApi}
            item={selectedApiData}
            currentApiId={currentApiId as number}
            changeSetResponse={changeSetResponse}
          />
        </Box>
        {/* 오른쪽 */}
        <Box
          variant="two"
          fontType="normal"
          className="basis-[50%] w-[50%] h-full flex-1 items-center justify-center pt-4 pl-4"
        >
          <LoadResult
            isList={isList}
            changeSetResponse={changeSetResponse}
            currentApiId={currentApiId as number}
            responseData={responseData}
          />
        </Box>
      </Box>
    </>
  );
};

export default LoadTestContainer;
