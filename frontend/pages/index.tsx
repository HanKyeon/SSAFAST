import Image from 'next/image';
import { Inter } from 'next/font/google';
import MetaHead from '@/components/common/MetaHead';
import LightLogo from '/public/assets/images/LightLogo.png';
import DarkLogo from '/public/assets/images/DarkLogo.png';
import { useStoreSelector } from '@/hooks/useStore';
import { Button } from '@/components/common';
import ToggleModeBtn from '@/components/common/ToggleModeBtn';
import AnimationBox from '@/components/common/AnimationBox';
import { useWidthHeight } from '@/hooks/useWidthHeight';
import { useRef } from 'react';
import MouseTracking from '@/components/canvas/MouseTracking';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  const onClickLogin = () => {
    window.location.href =
      'https://www.ssafast.com/oauth2/authorization/google';
  };
  const { dark } = useStoreSelector((state) => state.dark);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWidthHeight(containerRef);

  return (
    <main className="w-full h-full">
      <MetaHead />
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col items-center justify-center gap-5"
      >
        <div className="canvas-under-bg-container">
          <MouseTracking canvasHeight={height} canvasWidth={width} />
        </div>
        <div className="w-full h-[33%] flex flex-row items-center justify-center bg-opacity-50">
          <AnimationBox appearClassName="animate-[appear-from-bottom_0.66s_0.55s_both]">
            <Image
              className="animate-[shokshok_3.33s_0.11s_infinite]"
              src={dark ? DarkLogo : LightLogo}
              width={200}
              height={200}
              alt="로고"
            />
          </AnimationBox>
          <div className="flex flex-col h-full items-center justify-center">
            <AnimationBox
              className="text-[48px]"
              appearClassName="animate-[appear-from-bottom_0.66s_0.77s_both]"
            >
              <div className="animate-[shokshok_3.33s_0.22s_infinite]">
                SSAFAST
              </div>
            </AnimationBox>
            <AnimationBox
              className="text-[22px]"
              appearClassName="animate-[appear-from-bottom_0.66s_1.11s_both]"
            >
              <div className="animate-[shokshok_3.33s_0.44s_infinite]">
                빠른 프로젝트 진행을 위한 최고의 솔루션
              </div>
            </AnimationBox>
          </div>
        </div>
        <AnimationBox
          className="w-[33%] h-[10%] text-[36px] flex items-center justify-center"
          appearClassName="animate-[appear-from-bottom_0.66s_1.55s_both]"
        >
          <Button
            className="w-full h-full text-[33px] flex items-center justify-center p-5 hover:scale-[103%] duration-[0.33s] rounded-full animate-[shokshok_3.33s_0.55_infinite]"
            onClick={onClickLogin}
          >
            구글 로그인
          </Button>
        </AnimationBox>
      </div>
    </main>
  );
}

// export const getStaticProps: GetStaticProps = async function (context) {
//   return {
//     props: {
//       asdf: `asd`,
//     },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async function (context) {
//   return {
//     props: {
//       asdf: `asd`,
//     },
//   };
// };
