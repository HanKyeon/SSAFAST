import { wrapper } from '@/store';
import { InferGetServerSidePropsType } from 'next';

const SpaceWorkPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <div>하잏 워킹</div>
      <div>하잏</div>
    </>
  );
};

export default SpaceWorkPage;

export const getServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    return {
      props: {},
    };
  };
});
