// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  console.log({ method })
  switch (method) {
    case 'GET':
      const resData = await axios.get(
        process.env.USER_SERVICE_BASEURL + '/api/profile',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization,
          },
        }
      );
      const profiles = resData.data;
      res.status(200).json(profiles);
      break;
    case 'POST':
      const { name, age, gender } = req.body;
      const body = {
        name: name,
        age: age,
        gender: gender,
      };
      const url = process.env.USER_SERVICE_BASEURL + '/api/profile';
      try {
        const axiosRes = await axios.post(url, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization,
          },
        });
        const profiles = axiosRes.data;
        res.status(201).json(profiles);
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }

      break;
    case 'PUT':
     console.log("Here profile");
      const putUrl = process.env.USER_SERVICE_BASEURL + '/api/profile/update';
      try {
        const axiosRes = await axios.put(putUrl, req.body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization,
          },
        });
        const profiles = axiosRes.data;
        res.status(200).json(profiles);
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
