import { Message } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const method = req.method;
  switch (method) {
    case 'GET':
      try {
        console.log(req.query.userId);
        console.log(req.headers.authorization);
        const botUrl = process.env.PDF_SERVICE_BASEURL + '/api/bot/pdf/' + req.query.userId;
     //   const botUrl = process.env.PDF_SERVICE_BASEURL + '/api/bot/pdf/userId?=' + req.query.userId;
        const axiosRes = await axios.get(botUrl, {
          headers: {
            Authorization: req.headers.authorization,
          },
        });
        const botResponse = axiosRes.data;
        console.log({ botResponse });
        res.status(200).json(botResponse);
      } catch (error: any) {
        console.log({ error });
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    case 'DELETE':
      try {
        const botUrl = process.env.PDF_SERVICE_BASEURL + '/api/bot/pdf/' + req.query.pdfId;
        const axiosRes = await axios.delete(botUrl, {
          headers: {
            Authorization: req.headers.authorization,
          },
        });
        const botResponse = axiosRes.data;
        console.log({ botResponse });
        res.status(200).json(botResponse);
      }
      catch (error: any) {
        console.log({ error });
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
