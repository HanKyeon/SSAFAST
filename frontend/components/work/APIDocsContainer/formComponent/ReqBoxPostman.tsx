import ToggleableHeader from '@/components/work/APIDocsContainer/ToggleableHeader';
import { Box } from '@/components/common';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MockupData2Type } from '..';
import { useApiDetailAtTest } from '@/hooks/queries/queries';
import { useRouter } from 'next/router';
import { SpaceParams } from '@/pages/space';
import BodyListInput from './BodyListInput';
import FieldListInput from './FieldListInput';
import { useApiSingleTestDetail } from '@/hooks/queries/queries';

interface Props {
  data?: MockupData2Type;
  selectedId?: number;
}

const ReqBoxPostman = function ({ data, selectedId }: Props): JSX.Element {
  const router = useRouter();
  const { spaceId } = router.query as SpaceParams;
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { data: selectedApiDetail } = useApiSingleTestDetail(
    spaceId,
    selectedId!
  );

  return (
    <Box
      className={`${
        isOpen && 'flex-1'
      } w-full relative min-h-0 overflow-scroll scrollbar-hide duration-[0.33s]`}
    >
      <ToggleableHeader
        title="Request"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        big
      />
      <div
        className={`p-2 pb-4 flex flex-col gap-3 flex-1 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {/* 헤더 컴포넌트 */}
        <FieldListInput
          depth={0}
          typeName={`headers`}
          formName={`document.request.headers`}
        />
        {/* 바디 컴포넌트 */}
        <BodyListInput
          typeName={`body`}
          formName={`document.request.body`}
          selectedId={selectedId!}
        />
        {/* 패스 배리어블 컴포넌트 */}
        <FieldListInput
          depth={0}
          typeName={`path variables`}
          formName={`document.request.pathVars`}
        />

        {/* 파라미터 컴포넌트 */}
        <FieldListInput
          depth={0}
          typeName={`params`}
          formName={`document.request.params`}
        />
      </div>
    </Box>
  );
};

export default ReqBoxPostman;
