// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import figmaAxios from '@/utils/figmaAxios';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
// import Cors from 'cors';

// const cors = Cors({
//   methods: [`POST`, `GET`]
// })

// function runMiddleware(req:NextApiRequest, res:NextApiResponse, fn: Function) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }
//       return resolve(result)
//     })
//   })
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
