// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import figmaAxios from '@/utils/figmaAxios';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  if (req.method === 'get' || req.method === `GET`) {
    return axios({
      method: `get`,
      baseURL: `https://api.figma.com`,
      url: `/v1/files/${req.query.figmaId}`, // figmaId 입력해야함.
      params: {
        depth: 3,
      },
      headers: { Authorization: req.headers.authorization },
    })
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((err) => {
        return res.status(400).json({ message: '400에러임' });
      });
  } else if (req.method === 'post' || req.method === 'POST') {
    return axios({
      method: `post`,
      baseURL: `https://www.figma.com`,
      url: `/api/oauth/token`,
      params: { ...req.query },
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res
          .status(err?.status)
          .json({ message: '너한테 피그마 토큰 안줄거야' });
      });
  }
  return res.status(400).json({ message: '킹받지?' });
}
