import { Box, Button } from '@/components/common';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import AnimationBox from '@/components/common/AnimationBox';

interface Props {
  responseData: any;
  changeSetResponse: (data: any) => void;
}

const LoadResultDetail = function ({ responseData, changeSetResponse }: Props) {
  const [statusOpen, setStatusOpen] = useState<boolean>(true);

  return (
    <>
      {responseData && (
        <AnimationBox isOpened={responseData}>
          <div>
            <Button
              isEmpty
              className="flex flex-row gap-2 items-center"
              onClick={() => changeSetResponse(undefined)}
            >
              <IoMdArrowRoundBack /> Back
            </Button>
          </div>
          <div className=" h-auto w-full flex flex-col p-5">
            <label className="py-3">Latencies</label>
            <div className="px-4 flex">
              <Box variant="three" className="flex flex-col p-7">
                <div className="flex gap-4 w-auto justify-between">
                  <label>max</label>
                  <input
                    className="border-b-2 text-center bg-transparent w-[60%]"
                    value={`${responseData.latencies.max} ( μs )`}
                    disabled
                  />
                </div>
                <div className="flex gap-4 w-auto justify-between">
                  <label>mean</label>
                  <input
                    className="border-b-2 text-center bg-transparent w-[60%]"
                    value={`${responseData.latencies.mean} ( μs )`}
                    disabled
                  />
                </div>
                <div className="flex gap-4 w-auto justify-between">
                  <label>50th</label>
                  <input
                    className="border-b-2 text-center bg-transparent w-[60%]"
                    value={`${responseData.latencies.fiftieth} ( μs )`}
                    disabled
                  />
                </div>
                <div className="flex gap-4 w-auto justify-between">
                  <label>95th</label>
                  <input
                    className="border-b-2 text-center bg-transparent w-[60%]"
                    value={`${responseData.latencies.ninetyFifth} ( μs )`}
                    disabled
                  />
                </div>
                <div className="flex gap-4 w-auto justify-between">
                  <label>99th</label>
                  <input
                    className="border-b-2 text-center bg-transparent w-[60%]"
                    value={`${responseData.latencies.ninetyNinth} ( μs )`}
                    disabled
                  />
                </div>
              </Box>
            </div>
          </div>
          <div className="flex gap-4 p-5">
            <label>Throughput</label>
            <input
              className="border-b-2 text-center bg-transparent w-auto"
              value={`${responseData.throughput}`}
              disabled
            />
          </div>
          <div className="py-3">
            <ToggleableHeader
              title="StatusCode"
              isOpen={statusOpen}
              setIsOpen={setStatusOpen}
            />
            {statusOpen &&
              responseData.statusCodes.map((item: any, index: number) => (
                <div key={item.id} className="flex items-center pl-9">
                  <Box
                    variant="three"
                    className="flex flex-col items-center w-[50%] p-7"
                  >
                    <div className="flex gap-4 w-auto items-center">
                      <label>{`${item.code}`}</label>
                      <input
                        className="border-b-2 text-center bg-transparent w-[60%]"
                        value={`${item.count}`}
                        disabled
                      />
                      회
                    </div>
                  </Box>
                </div>
              ))}
          </div>
        </AnimationBox>
      )}
      {!responseData && <div></div>}
    </>
  );
};

export default LoadResultDetail;
