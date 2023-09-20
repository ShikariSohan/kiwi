import { Message } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  const method = req.method;
  switch (method) {
    case 'GET':
      const botUrl = process.env.BOT_SERVICE_BASEURL+'/api/bot/pdf';
      const axiosRes = await axios.get(botUrl);
      const botResponse = axiosRes.data;
      console.log({ botResponse });
      return res.status(200).json(botResponse);
    default:
      res.status(405).end();
      break;
  }
}
