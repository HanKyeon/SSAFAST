import { RTCSpaceData } from '@/pages/space/[spaceId]/work';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}

const APIConnectContainer = function ({ store, serverSideStore }: Props) {
  return (
    <div>
      <div>에이피아이커넥트컨테이너</div>
      <div>에이피아이커넥트컨테이너</div>
      <div>에이피아이커넥트컨테이너</div>
    </div>
  );
};

export default APIConnectContainer;
