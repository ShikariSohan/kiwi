import { Message } from '../../types';

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  const method = req.method;
  switch (method) {
    case 'POST':
      try {
        const { image } = req.body;
        const url = process.env.WRITING_SERVICE_BASEURL + '/api';
        console.log('Here...');
        const axiosRes = await axios.post(url, {
          image,
        });

        console.log({ data: axiosRes.data });
        const botResponse = axiosRes.data;
        console.log({ botResponse });
        res.status(200).json(botResponse);
      } catch (err: any) {
        console.log({ err });
        res.status(400).json({
          error: 'Something went wrong.',
        });
      }

      break;

    default:
      res.status(405).end();
      break;
  }
}
