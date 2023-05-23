import { useEffect, useState } from 'react';
import { ResType } from './ResBox';

// const mockupData = {
//   headers: {
//     'X-Content-Type-Options': ['nosniff'],
//     'X-XSS-Protection': ['1; mode=block'],
//     'Cache-Control': ['no-cache, no-store, max-age=0, must-revalidate'],
//     Pragma: ['no-cache'],
//     Expires: ['0'],
//     'X-Frame-Options': ['SAMEORIGIN'],
//     'Content-Type': ['application/json'],
//     'Transfer-Encoding': ['chunked'],
//     Date: ['Thu, 04 May 2023 02:00:31 GMT'],
//     'Keep-Alive': ['timeout=60'],
//     Connection: ['keep-alive'],
//   },
//   body: {
//     name: '민초현[서울_6반_A607]팀원',
//     id: 1,
//     profileImg:
//       'https://lh3.googleusercontent.com/a/AGNmyxbcgYZp6-g_cTCTGBAFEBZdsh2lhQBk1oYi3nWP=s96-c',
//     email: 'chohyeon9708@gmail.com',
//   },
//   statusCodeValue: 200,
//   statusCode: 'OK',
// };

type ResJSONPropsType = {
  response: any;
};

const ResJSON = function ({ response }: ResJSONPropsType): JSX.Element {
  const [jsonData, setJsonData] = useState<string>();
  console.log(response, '<<');
  useEffect(() => {
    setJsonData(() => JSON.stringify(response, null, 2));
  }, [response]);
  return (
    <div
      className={`border-[1px] border-grayscale-dark rounded-[8px] p-2 min-h-[30px] flex gap-2 text-content`}
    >
      {/* <div className={`w-[20px] h-full text-right`}>1</div> */}
      <pre className={`flex-1 h-full overflow-scroll`}>{jsonData}</pre>
    </div>
  );
};

export default ResJSON;
