import { wrapper } from '@/store';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

const SpacePreviewPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const { spaceName } = router.query;
  console.log(spaceName);
  return (
    <>
      <div>하잏</div>
      <div>하잏</div>
    </>
  );
};

export default SpacePreviewPage;

export const getServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    return {
      props: {
        asdf: `asdf`,
      },
    };
  };
});

// export const getStaticProps = wrapper.getStaticProps(function (store) {
//   return async function (context) {
//     return {
//       props: {
//         asdf: `asd`,
//       },
//     };
//   };
// });
