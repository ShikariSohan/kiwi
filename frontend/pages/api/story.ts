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
    story: Correction[];
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
  return `generate a story from the given prompt with title for 5-6 years old boy. the story should be minimal, short in length, easy vocabulary and interesting. the output should be as the following:
  Title: {story title}
  ...the story and rest
  here is the prompt provided by the user:
  ${message}`;
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
        const botUrl = 'http://localhost:8082/api/bot/complete';
        const axiosRes = await axios.post(botUrl, resBody);
        console.log({ data: axiosRes.data });
        return res.status(200).json({
          result: {
            story: axiosRes.data,
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
