import { useState } from 'react';
import RequestForm from './RequestForm';

const LoadItem = function () {
  const [api, setApi] = useState<boolean>(true);
  return (
    <div className="w-full h-full">
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
      {api && (
        <div className="h-[90%] w-full flex flex-col">
          <RequestForm />
        </div>
      )}
      {!api && <div>hi</div>}
    </div>
  );
};

export default LoadItem;
