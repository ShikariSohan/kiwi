import { Message } from "../../types";

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  const method = req.method;
  switch(method)
  {
    case 'POST':
    
      try{
        const {image} = req.body;
        console.log(image);
        
        const url = process.env.WRITING_SERVICE_BASEURL + "/api";
        const axiosRes = await axios.post(url,{
          image
        });
          
        console.log(axiosRes.data);
        const botResponse = axiosRes.data;

        return res.status(200).json(botResponse);
      }
        catch(err){
            console.log(err)
        }
        break;
      
    default:
       res.status(405).end();
      break;
  }
  
  
}
