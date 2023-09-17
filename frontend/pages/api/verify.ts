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
        case 'POST':
        const {id,code} = (req.body) ;
        const body = {
            id:id,
            code:code
        }
        const url = process.env.USER_SERVICE_BASEURL+"/api/user/verify";
        try{
            const axiosRes = await axios.post(url,body,{
                headers: {
                    "Content-Type": "application/json",
                    }
            });
            res.status(201).json({
                "message":"Verified successfully",
            });
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
