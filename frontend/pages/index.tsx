import Image from 'next/image';
import { Inter } from 'next/font/google';
import { wrapper } from '@/store';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const pushHandler = function () {
    router.push(`/space/create`);
  };
  return (
    <main>
      <div>하이요ㅕ</div>
      <div onClick={pushHandler}>이동</div>
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
