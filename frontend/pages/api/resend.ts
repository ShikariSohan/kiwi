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
        const url = process.env.USER_SERVICE_BASEURL+"/api/user/resend";
        try{
            const axiosRes = await axios.post(url,);
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
