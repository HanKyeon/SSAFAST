import Image from 'next/image';
import Box from './Box';
import { useStoreSelector } from '@/hooks/useStore';
import LightLogo from '/public/assets/images/LightLogo.png';
import DarkLogo from '/public/assets/images/DarkLogo.png';
import { PropsWithChildren } from 'react';

interface Props {
  msg: string;
}
const Logogogo = function ({ msg, children }: PropsWithChildren<Props>) {
  const { dark } = useStoreSelector((state) => state.dark);
  return (
    <Box
      variant="two"
      className="h-full w-[80%] p-5 flex flex-col items-center justify-center gap-3"
    >
      <Image
        className="animate-[spinning_2s_infinite] get-pers"
        src={dark ? DarkLogo : LightLogo}
        alt="로고"
        width={216}
        height={191}
      />
      <div className="text-[48px]">SSAFAST</div>
      <div className="text-[22px]">
        {msg || '당신의 프로젝트를 시작해보세요!'}
      </div>
      {children}
    </Box>
  );
};

export default Logogogo;
