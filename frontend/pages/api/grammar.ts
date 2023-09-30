// import { Message } from '../../types';
// import type { NextApiRequest, NextApiResponse } from 'next';

// import axios from 'axios';
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<String>
// ) {
//   const method = req.method;
//   switch (method) {
//     case 'POST':
//       const { messages } = req.body as {
//         messages: Message[];
//       };
//       const resBody = {
//         messages: messages,
//         model: 'gpt-3.5-turbo',
//       };
//       const botUrl = 'http://localhost:8082/api/bot/complete';
//       const axiosRes = await axios.post(botUrl, resBody);
//       const botResponse = axiosRes.data;
//       console.log({ botResponse });
//       return res.status(200).json(botResponse);
//     default:
//       res.status(405).end();
//       break;
//   }
// }


import { Message } from '@/types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
export type Correction = {
  original: string;
  corrected: string;
  offset: number;
  length: number;
};

type Data = {
  result?: {
    corrections: Correction[];
  };
  error?: string;
};

function getIndicesOf(
  searchStr: string,
  content: string,
  caseSensitive = false
) {
  let searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }

  let startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    content = content.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }

  while ((index = content.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }

  return indices;
}

function generatePrompt(message: string) {
  return `Pretend that you are an English Grammar teacher. Correct the grammatical mistakes in this text. The output should be the corrected text only. ${message}.`;
}

const defaultErrorMessage = 'Failed to process your request';
const defaultErrorStatus = 500;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const content = req.body.content;

    if (!content) {
      console.log('Missing content');
      return res.status(defaultErrorStatus).json({ error: 'Missing Content' });
    }

    let prompt = generatePrompt(content);
    console.log({ prompt });

    const method = req.method;
    switch (method) {
      case 'POST':
        const message: Message[] = [{ role: 'user', content: prompt }];
        const resBody = {
          messages: message,
          model: 'gpt-3.5-turbo',
        };
        console.log("Here");
        const botUrl = process.env.BOT_SERVICE_BASEURL + '/api/bot/complete';
        
        const axiosRes = await axios.post(botUrl, resBody);
        let data = axiosRes.data;
        data = data.replace('Pretend that you are an English Grammar teacher. Correct the grammatical mistakes in this text. The output should be the corrected text only', '');
        console.log({ data: data });
    
        return res.status(200).json({
          result: {
            corrections: data,
          },
        });
    }
  } catch (error: any) {
    if (error.response) {
      return res.status(error?.response?.status || defaultErrorStatus).json({
        error: error?.response?.data || defaultErrorMessage,
      });
    }

    return res
      .status(defaultErrorStatus)
      .json({ error: error?.message || defaultErrorMessage });
  }
}
