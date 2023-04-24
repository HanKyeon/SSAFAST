import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <div>하이요ㅕ</div>
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
