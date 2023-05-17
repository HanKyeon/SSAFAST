import Image from 'next/image';
import { Inter } from 'next/font/google';
import { DispatchLogout, DispatchToast } from '@/store';
import { useRouter } from 'next/router';
import { Box, Button, CircleBtn } from '@/components/common';
import { useStoreDispatch, useStoreSelector } from '@/hooks/useStore';
import { darkActions } from '@/store/dark-slice';
import { FormEvent, useState } from 'react';
import ToggleModeBtn from '@/components/common/ToggleModeBtn';
import MetaHead from '@/components/common/MetaHead';
import googleAxios from '@/utils/googleAxios';
import { GetServerSideProps, GetStaticProps } from 'next';

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

  const onClickLogin = () => {
    window.location.href =
      'https://www.ssafast.com/oauth2/authorization/google';
  };

  return (
    <main>
      <MetaHead />
      <div>하이요ㅕ</div>
      <div onClick={pushHandler}>이동</div>

      <ToggleModeBtn />
      <CircleBtn isEmpty btnType="plus">
        +
      </CircleBtn>
      <Button onClick={onClickLogin}>구글로그인</Button>
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
