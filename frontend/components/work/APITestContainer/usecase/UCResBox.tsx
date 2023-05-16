import { useRouter } from 'next/router';
import { UseTestApiCompactType } from './UseTestContainer';
import { SpaceParams } from '@/pages/space';
import { useUseCaseResList } from '@/hooks/queries/queries';

type UCResBoxPropsType = {
  currentApi: UseTestApiCompactType;
  resApis: string;
};

const UCResBox = function ({
  currentApi,
  resApis,
}: UCResBoxPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const {
    data: resData,
    isLoading,
    isError,
  } = useUseCaseResList(spaceId, resApis);
  return <div className={`flex-1 overflow-scroll scrollbar-hide`}></div>;
};

export default UCResBox;
