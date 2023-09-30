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
      let { messages,profile } = req.body as {
        messages: Message[];
        profile: any;
      };
      let initPersonaMessage = {
        role : 'system',
        content : `You are talking to a kid name ${profile.name} age ${profile.age} and gender is ${profile.gender}. So please reponse with the user in mind. And explain him/her the concept in a simple way.`,
      }
      messages.unshift(initPersonaMessage);
      const resBody = {
        messages: messages,
        model: 'gpt-3.5-turbo',
      };
      const botUrl = process.env.BOT_SERVICE_BASEURL+'/api/bot/complete';
      const axiosRes = await axios.post(botUrl, resBody);
      const botResponse = axiosRes.data;
      console.log({ botResponse });
      return res.status(200).json(botResponse);
    default:
      res.status(405).end();
      break;
  }
}
