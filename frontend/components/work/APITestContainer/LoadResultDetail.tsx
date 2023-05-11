import { Box, Button } from '@/components/common';
import ToggleableHeader from '../APIDocsContainer/ToggleableHeader';
import { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface Props {
  toggleIsList: () => void;
}

const LoadResultDetail = function ({ toggleIsList }: Props) {
  const [statusOpen, setStatusOpen] = useState<boolean>(true);
  const [errMsgOpen, setErrMsgOpen] = useState<boolean>(true);
  return (
    <>
      <div>
        <Button
          // onClick={''}
          isEmpty
          className="flex flex-row gap-2 items-center"
          onClick={toggleIsList}
        >
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>
      <div className=" h-auto w-full flex flex-col p-5">
        <label className="py-3">Latency</label>
        <div className="px-4 flex">
          <Box variant="three" className="flex flex-col w-[50] p-7">
            <div className="flex gap-4 w-auto justify-between">
              <label>min</label>
              <input
                className="border-b-2 text-center bg-transparent w-[43%]"
                value={'HI'}
                disabled
              />
            </div>
            <div className="flex gap-4 w-auto justify-between">
              <label>max</label>
              <input
                className="border-b-2 text-center bg-transparent w-[43%]"
                value={'HI'}
                disabled
              />
            </div>
            <div className="flex gap-4 w-auto justify-between">
              <label>mean</label>
              <input
                className="border-b-2 text-center bg-transparent w-[43%]"
                value={'HI'}
                disabled
              />
            </div>
            <div className="flex gap-4 w-auto justify-between">
              <label>50th</label>
              <input
                className="border-b-2 text-center bg-transparent w-[43%]"
                value={'HI'}
                disabled
              />
            </div>
            <div className="flex gap-4 w-auto justify-between">
              <label>90th</label>
              <input
                className="border-b-2 text-center bg-transparent w-[43%]"
                value={'HI'}
                disabled
              />
            </div>
            <div className="flex gap-4 w-auto justify-between">
              <label>95th</label>
              <input
                className="border-b-2 text-center bg-transparent w-[43%]"
                value={'HI'}
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
          value={'HI'}
          disabled
        />
      </div>
      <div className="py-3">
        <ToggleableHeader
          title="StatusCode"
          isOpen={statusOpen}
          setIsOpen={setStatusOpen}
        />
      </div>
      <div className="py-3">
        <ToggleableHeader
          title="Error Message"
          isOpen={errMsgOpen}
          setIsOpen={setErrMsgOpen}
        />
      </div>
    </>
  );
};

export default LoadResultDetail;
