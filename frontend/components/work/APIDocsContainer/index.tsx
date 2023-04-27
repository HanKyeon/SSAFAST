import { RTCSpaceData } from '@/pages/space/[spaceId]/work';

interface Props {
  serverSideStore?: RTCSpaceData;
  store: any;
}
const APIDocsContainer = function ({ store, serverSideStore }: Props) {
  return (
    <div>
      <div>API DOCS CONTAINER</div>
      <div>API DOCS CONTAINER</div>
      <div>API DOCS CONTAINER</div>
    </div>
  );
};

export default APIDocsContainer;
