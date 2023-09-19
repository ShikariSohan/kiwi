import { Message } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jsPDF from "jspdf";
import { uploadToFileFirebase } from '../../config/firebase';
import { cp } from 'fs';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  const method = req.method;
  switch (method) {
    case 'POST':
    const imagePrompt  = [
        "A little boy running from spider",
    ]

    let description = "";
    for (let i = 0; i < imagePrompt.length; i++) {
      description = description + imagePrompt[i] + "\n\n";
    }

   const url =  await genaratePdfs(imagePrompt);
   const botUrl = process.env.BOT_SERVICE_BASEURL+'/api/bot/pdf';
   const botBody = {
    url : url,
    userId: "1234",
    title : "Hello darkness",
    description : description
   }
   const data = await axios.post(botUrl, botBody);

    console.log({data});

    res.status(200).end();

      
    //   return res.status(200).json(botResponse);
    default:
      res.status(405).end();
      break;
  }
}

const generateImage = async (prompt : string) => {
   console.log({prompt});
  
    try {
      const key = process.env.OPENAI_API_KEY;
      const data = {
        prompt,
        n: 1,
        size: '256x256'
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      };
      const response = await axios.post(
        " https://api.openai.com/v1/images/generations",
        data,
        { headers }
        );
        const img = response.data.data[0].url;
      
        
        return img;

    } catch (error: any) {
      console.error("Error:", error);
    }
}

const genaratePdfs = async (prompts:any) => {
    const doc = new jsPDF();
    doc.setFontSize(25);
    doc.setFont("times", "bold");
    var titleSplit = doc.splitTextToSize("A cat in the cradle", 200);
    doc.text(titleSplit,15, 100);
    for (let i = 0; i < prompts.length; i++) {
      doc.addPage();
      let img = await generateImage(prompts[i]);
      console.log({img});
     img = await urlTOBase64(img);
      var splitPrompt = doc.splitTextToSize(prompts[i], 180);
      doc.text(splitPrompt,15, 100);
      doc.addPage();
     
      doc.addImage(img, "JPEG", 52, 74, 105, 148);
    }
    doc.save("a4.pdf");
    const file = doc.output("blob");
    
    const url = await uploadToFileFirebase(
      "a4.pdf"
    )
    return url;
   
}

const urlTOBase64 = async (url:string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return base64;
}


