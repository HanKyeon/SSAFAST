// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return axios({
    method: `post`,
    baseURL: `https://www.figma.com`,
    url: `/api/oauth/token`,
    params: req.query,
  }).then((response) => {
    console.log(response.data);
    return res.status(200).json(response.data);
  });
}
