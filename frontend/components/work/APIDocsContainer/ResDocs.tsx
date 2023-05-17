import { useEffect, useState } from 'react';
import { ResType } from './ResBox';

type HeadersType = {
  key: string;
  value: string | number;
};
type ResJSONPropsType = {
  response: ResType;
};

const ResDocs = function ({ response }: ResJSONPropsType): JSX.Element {
  const [refinedHeaders, setRefinedHeaders] = useState<HeadersType[]>();

  const makeHeadersArr = (): void => {
    const arr: HeadersType[] = [];
    for (const key in response.headers) {
      const value: string | number = response.headers[key];
      arr.push({ key, value });
    }
    setRefinedHeaders(arr);
  };

  useEffect(() => {
    makeHeadersArr();
  }, []);
  return (
    <>
      <div>
        <p>headers</p>
        {/* {response.headers && response.headers.} */}
        {/* {refinedHeaders && refinedHeaders.map(item => (

        ))} */}
      </div>
      <div>
        <p>body</p>
      </div>
    </>
  );
};

export default ResDocs;
