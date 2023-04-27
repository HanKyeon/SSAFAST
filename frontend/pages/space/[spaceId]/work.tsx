import { wrapper } from '@/store';
import { InferGetServerSidePropsType } from 'next';
import {
  MouseEvent,
  PointerEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RoomProvider, useOthers, useUpdatePresence } from '@y-presence/react';
import { useRouter } from 'next/router';
import { SpaceParams } from '..';
import apiRequest from '@/utils/axios';
import { WebrtcProvider } from 'y-webrtc';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import * as Y from 'yjs';
import WorkContainer from '@/components/work/WorkContainer';

const SpaceWorkPage = function (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { serverSideStore } = props;

  return (
    <div className="h-full w-full">
      <WorkContainer serverSideStore={serverSideStore} />
    </div>
  );
};

export default SpaceWorkPage;

export const getServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    const { spaceId } = context.params as SpaceParams;
    let spaceData = {
      figmaList: [
        { figmaSectionId: `00:00`, sectionUrl: ``, refreshId: ``, name: `` },
        { figmaSectionId: `00:00`, sectionUrl: ``, refreshId: ``, name: `` },
        { figmaSectionId: `00:00`, sectionUrl: ``, refreshId: ``, name: `` },
        { figmaSectionId: `00:00`, sectionUrl: ``, refreshId: ``, name: `` },
        { figmaSectionId: `00:00`, sectionUrl: ``, refreshId: ``, name: `` },
      ],
      apiList: [],
      useCaseList: [],
      overloadList: [],
    };
    // await apiRequest({
    //   method: `get`,
    //   url: `/`,
    // }).then((res) => {
    //   // sapceData에 space 정보 넣어주기.
    // });

    return {
      props: {
        serverSideStore: {
          space: {},
        },
      },
    };
  };
});
