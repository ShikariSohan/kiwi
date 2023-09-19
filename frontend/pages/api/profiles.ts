// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
    switch(method)
    {
        case 'GET':
        const resData = await axios.get(process.env.USER_SERVICE_BASEURL+"/api/profile",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": req.headers.authorization
                }
        });
        const profiles = resData.data;
        res.status(200).json(profiles);        
        break;
        case 'POST':
        const {name,age} = (req.body) ;
        const body = {
            "name":name,
            "age":age
        }
        const url = process.env.USER_SERVICE_BASEURL+"/api/profile";
        try{
            const axiosRes = await axios.post(url,body,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": req.headers.authorization
                    }
            });
            const profiles = axiosRes.data;
            res.status(201).json(profiles);
        }
        catch(err){
            console.log(err)
            res.status(500).end();
        }
        
            break;
        
        default:
         res.status(405).end();
        break;
    }
}
