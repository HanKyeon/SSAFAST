import {
  useOverloadList,
  useOverloadListDetail,
} from '@/hooks/queries/queries';
import LoadListInner from './LoadListInner';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import { useEffect, useState } from 'react';

interface Props {
  changeSetResponse: (data: any) => void;
  currentApiId: number | string;
}

const LoadResultList = function ({ changeSetResponse, currentApiId }: Props) {
  const router = useRouter();
  const [detailId, setDetailId] = useState<number>(0);
  const { spaceId } = router.query as SpaceParams;
  const colName = {
    id: 'id',
    duration: 'duration(sec)',
    reqSec: 'req/s',
    latencyMean: 'mean(μs)',
    throughput: 'throughput',
    createdTime: 'date',
  };
  const { data, isFetched, isSuccess } = useOverloadList(spaceId, currentApiId);
  const { data: detailedData } = useOverloadListDetail(spaceId, detailId);
  useEffect(
    function () {
      if (changeSetResponse && isSuccess) {
        changeSetResponse(detailedData);
        console.log('할아방탱', detailedData);
      }
    },
    [detailedData]
  );
  const idHandler = function (id: number) {
    setDetailId(id);
  };
  return (
    <>
      {isFetched && (
        <div className="h-full w-full">
          <div className="h-[10%] w-full py-5 pr-2">
            <LoadListInner item={colName} />
          </div>

          <div className="h-[90%] w-full flex flex-col justify-start overflow-y-scroll">
            {data?.overlosdList.map((item: any) => (
              <div key={item.id} className="w-full py-2">
                <LoadListInner item={item} idHandler={idHandler} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!isFetched && (
        <div className="h-full w-full">
          <div className="h-[10%] w-full py-5 pr-2">
            <LoadListInner item={colName} />
          </div>

          <div className="h-[85%] w-full flex flex-col items-center justify-center">
            아직 테스트를 진행하지 않은 API 입니다.
          </div>
        </div>
      )}
    </>
  );
};

export default LoadResultList;
