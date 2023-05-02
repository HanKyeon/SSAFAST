import Image from 'next/image';
import { Inter } from 'next/font/google';
import { DispatchLogout, DispatchToast, wrapper } from '@/store';
import { useRouter } from 'next/router';
import { Box, Button, CircleBtn } from '@/components/common';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import { FormEvent } from 'react';
import ToggleModeBtn from '@/components/common/ToggleModeBtn';
import MetaHead from '@/components/common/MetaHead';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const pushHandler = function () {
    router.push(`/space/create`);
  };

  const dispatch = useStoreDispatch();
  const { dark } = useStoreSelector((state) => state.dark);
  const changeDark = function () {
    dispatch(darkActions.toggleDark({}));
  };
  return (
    <main>
      <MetaHead />
      <div>하이요ㅕ</div>
      <div onClick={pushHandler}>이동</div>
      <Box variant="one" fontType="header" className={`p-7 duration-[0.33s]`}>
        ONE
        <Box variant="two" fontType="normal" className={`p-7 duration-[0.33s]`}>
          Two
          <Box
            variant="three"
            fontType="content"
            className={`p-7 duration-[0.33s]`}
          >
            Three
          </Box>
        </Box>
      </Box>
      <Button isEmpty onClick={changeDark}>
        toggle
      </Button>
      <ToggleModeBtn />
      <CircleBtn isEmpty btnType="plus">
        +
      </CircleBtn>
    </main>
  );
}

// export const getStaticProps = wrapper.getStaticProps(function (store) {
//   return async function (context) {
//     return {
//       props: {
//         asdf: `asd`,
//       },
//     };
//   };
// });

// export const getServerSideProps = wrapper.getServerSideProps(function (store) {
//   return async function (context) {
//     return {
//       props: {
//         asdf: `asd`,
//       },
//     };
//   };
// });
