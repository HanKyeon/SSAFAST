// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import figmaAxios from '@/utils/figmaAxios';
import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return axios({
    method: `get`,
    baseURL: `https://api.figma.com`,
    url: `/v1/images/${req.query.figmaId}`, // figmaId 입력해야함.
    params: {
      ids: req.query.ids,
    },
    headers: { Authorization: req.headers.authorization },
  })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err: AxiosError) => {
      return res
        .status(err.status || 500)
        .json({ message: `${err.status || 500}에러임` });
    });
}
