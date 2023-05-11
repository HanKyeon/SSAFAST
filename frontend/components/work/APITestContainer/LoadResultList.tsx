import LoadListInner from './LoadListInner';

const data = [
  {
    id: 1,
    duration: 10,
    reqSec: 1,
    latencyMean: 100,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 333,
    duration: 100000,
    reqSec: 1,
    latencyMean: 100,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
  {
    id: 999,
    duration: 10,
    reqSec: 1,
    latencyMean: 122222222200,
    throuthput: 1000,
    createdTime: '2023.12.31',
  },
];

// const data = [];

interface ListData {
  data: {
    id: number;
    duration: number;
    reqSec: number;
    latencyMean: number;
    throuthput: number;
    createdTime: Date;
  }[];
}

interface Props {
  toggleIsList: () => void;
}

const LoadResultList = function ({ toggleIsList }: Props) {
  const colName = {
    id: 'id',
    duration: 'duration(sec)',
    reqSec: 'req/s',
    latencyMean: 'mean(μs)',
    throuthput: 'throuthput',
    createdTime: 'date',
  };
  return (
    <>
      {data[0] && (
        <div className="h-full w-full">
          <div className="h-[10%] w-full py-5 pr-2">
            <LoadListInner item={colName} />
          </div>

          <div className="h-[90%] w-full flex flex-col justify-start overflow-y-scroll">
            {data.map((item) => (
              <div key={item.id} className="w-full py-2">
                <LoadListInner item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!data[0] && (
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
