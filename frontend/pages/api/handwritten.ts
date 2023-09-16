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
      const {image} = (req.body) ;
      console.log(image)
      const botUrl = "http://localhost:8083/api";
      try{
        const axiosRes = await axios.post(botUrl, image,
          {
              headers: {
                "Content-Type": "multipart/form-data",
                }
          });
        console.log(axiosRes.data);
        const botResponse = axiosRes.data;
        return res.status(200).json(botResponse.toString());
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
