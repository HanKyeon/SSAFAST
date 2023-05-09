import { useState } from 'react';
import RequestForm from './RequestForm';

const LoadItem = function () {
  const [api, setApi] = useState<boolean>(true);
  return (
    <>
      {api && (
        <div className="h-[10%] w-full flex flex-col justify-center items-center">
          API 선택하기
        </div>
      )}
      {!api && (
        <div className="h-[10%] w-full flex flex-col justify-center items-center">
          API ITEM 놓기
        </div>
      )}

      <div className="h-[90%] w-full flex flex-col">
        <RequestForm />
      </div>
    </>
  );
};

export default LoadItem;
