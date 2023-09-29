

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
    story: string;
    title: string;
  };
  error?: string;
};


function generatePrompt(message: string) {
  return `generate a story from the given prompt with title. the story should be minimal, short in length, easy vocabulary and interesting. the output should be as the following:
  Title: {story title} 
  Story: 
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
    const profile = req.body.profile;

    if (!content) {
      console.log('Missing content');
      return res.status(defaultErrorStatus).json({ error: 'Missing Content' });
    }
    let pre =    "Remeber you are dealing with a child. Age is "+ profile.age + "years old. And gender is "+ profile.gender +". ";
    let prompt = `${pre} ${generatePrompt(content)}`;
    console.log({ prompt });

    const method = req.method;
    switch (method) {
      case 'POST':
        const message: Message[] = [{ role: 'user', content: prompt }];
        const resBody = {
          messages: message,
          model: 'gpt-3.5-turbo',
        };
        const botUrl = process.env.BOT_SERVICE_BASEURL+'/api/bot/complete';;
        const axiosRes = await axios.post(botUrl, resBody);
        console.log({ data: axiosRes.data });
        const [title, story] = axiosRes.data.split(/Title:\s*(.*?)\nStory:\s*(.*)/s).slice(1, 3);
        

        return res.status(200).json({
          result: {
            title: title.trim(),
            story: story.trim(),
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
