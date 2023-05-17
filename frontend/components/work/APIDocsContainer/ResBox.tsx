import ToggleableHeader from '@/components/work/APIDocsContainer/ToggleableHeader';
import { Box } from '@/components/common';
import { useState } from 'react';
import ResJSON from './ResJSON';
import ResDocs from './ResDocs';

export type ResType = {
  headers: {
    [key: string]: string;
  };
  body: {
    [key: string]: string | number;
  };
  statusCodeValue: number;
  statusCode: string;
};

const resMockup: ResType = {
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked',
    Date: 'Thu, 04 May 2023 02:00:31 GMT',
    'Keep-Alive': 'timeout=60',
    Connection: 'keep-alive',
  },
  body: {
    name: '민초현[서울_6반_A607]팀원',
    id: 1,
    profileImg:
      'https://lh3.googleusercontent.com/a/AGNmyxbcgYZp6-g_cTCTGBAFEBZdsh2lhQBk1oYi3nWP=s96-c',
    email: 'chohyeon9708@gmail.com',
  },
  statusCodeValue: 200,
  statusCode: 'OK',
};

const ResBox = function (): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenJSON, setIsOpenJSON] = useState<boolean>(true);
  const [isOpenDocs, setIsOpenDocs] = useState<boolean>(true);

  return (
    <Box
      className={`${
        isOpen && 'flex-1'
      } w-full relative min-h-0 overflow-scroll scrollbar-hide duration-[0.33s]`}
    >
      <ToggleableHeader
        title="Response"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      {isOpen && (
        <div className={`p-2 pb-4 flex flex-col gap-3`}>
          <div className={`w-full`}>
            {/* <ToggleableHeader
              title="JSON"
              isOpen={isOpenJSON}
              setIsOpen={setIsOpenJSON}
            />
            {isOpenJSON && ( */}
            <div className={`px-6`}>
              <ResJSON response={resMockup} />
            </div>
            {/* )}
          </div>
          <div className={`w-full`}>
            <ToggleableHeader
              title="Docs"
              isOpen={isOpenDocs}
              setIsOpen={setIsOpenDocs}
            />
            {isOpenDocs && (
              <div className={`px-6`}>
                <ResDocs response={resMockup} />
              </div>
            )} */}
          </div>
        </div>
      )}
    </Box>
  );
};

export default ResBox;
