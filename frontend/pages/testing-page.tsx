import { Box } from '@/components/common';
import { DtoForm } from '@/components/forms';
import axios from 'axios';

const TestingPage = function () {
  const clickHandler = function () {
    const ress = axios({
      method: `post`,
      url: `/api/figma`,
      params: {
        client_id: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_SECRET}`,
        redirect_uri: `${process.env.NEXT_PUBLIC_HOSTNAME}/figma-loading`,
        code: 'ueIdquasM8bIIEUrVWlsZLjYY',
        grant_type: `authorization_code`,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
  const clickHandler2 = function () {
    const ress = axios({
      method: `post`,
      baseURL: `https://www.figma.com`,
      url: `/api/oauth/token`,
      params: {
        client_id: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_PUBLIC_FIGMA_ROCKET_APP_CLIENT_SECRET}`,
        redirect_uri: `${process.env.NEXT_PUBLIC_HOSTNAME}/figma-loading`,
        code: 'ueIdquasM8bIIEUrVWlsZLjYY',
        grant_type: `authorization_code`,
      },
      // method: `get`,
      // baseURL: `https://api.figma.com`,
      // url: `/v1/files/GTrnPhdA7vjujMiA54I2QI`, // figmaId 입력해야함.
      // params: {
      //   depth: 3,
      // },
      // headers: { Authorization: `` },
    }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <DtoForm />
    </div>
  );
};

export default TestingPage;
