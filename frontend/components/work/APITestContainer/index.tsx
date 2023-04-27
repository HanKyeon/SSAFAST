import { RTCSpaceData } from '@/pages/space/[spaceId]/work';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const TestContainer = function ({ store, serverSideStore }: Props) {
  return (
    <div>
      <div>TEST CONTAINER</div>
      <div>TEST CONTAINER</div>
      <div>TEST CONTAINER</div>
    </div>
  );
};

export default TestContainer;
