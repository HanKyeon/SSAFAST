import { Box } from '@/components/common';
import BoxHeader from '@/components/common/BoxHeader';
import { UseTestApiCompactType } from './UseTestContainer';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useApiDetailAtTest } from '@/hooks/queries/queries';
import { SpaceParams } from '@/pages/space';

type MappingContainerPropsType = {
  curapi?: UseTestApiCompactType;
};

const MappingContainer = function ({
  curapi,
}: MappingContainerPropsType): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  // const { data, isLoading, isError } = useApiDetailAtTest(spaceId, curapi?.id);

  return (
    <>
      {/* Request */}
      <Box
        variant="two"
        fontType="normal"
        className="flex-1 h-full p-5 flex flex-col"
      >
        <BoxHeader title="Request" />
        {curapi && (
          <div className={`flex-1 overflow-scroll scrollbar-hide`}>
            {/*  */}
          </div>
        )}
      </Box>
      {/* Response */}
      <Box
        variant="two"
        fontType="normal"
        className="flex-1 h-full p-5 flex flex-col"
      >
        <BoxHeader title="Response" />
        {curapi && (
          <div className={`flex-1 overflow-scroll scrollbar-hide`}></div>
        )}
      </Box>
    </>
  );
};

export default MappingContainer;
