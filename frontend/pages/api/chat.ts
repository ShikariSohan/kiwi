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
      const { messages } = req.body as {
        messages: Message[];
      };
      const resBody = {
        messages: messages,
        model: 'gpt-3.5-turbo',
      };
      const botUrl = 'http://localhost:8082/api/bot/complete';
      const axiosRes = await axios.post(botUrl, resBody);
      const botResponse = axiosRes.data;
      console.log({ botResponse });
      return res.status(200).json(botResponse);
    default:
      res.status(405).end();
      break;
  }
}
