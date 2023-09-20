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
    const {title,story} = req.body as {
      title: string;
      story: string;
    };
    console.log({title,story});
    const splitStory  = splitParagraph(story, 2 ,3);
   
    const replyUrl = process.env.BOT_SERVICE_BASEURL+'/api/bot/complete';
    let imagePrompt = [];
    for(let i = 0; i < splitStory.length; i++) {
      const imgPrompt = ` Generate only one prompt from the passage for a text-to-image model that can generate related and appropriate one image from the given prompt.  used for an AI model that hates unsafe content. The prompt should be able to with no names of any character of the story, and should be in a way that the images seem to be in a similar genre . Here is the prompt provided by the user: ${splitStory[i]}`;
    const message: Message[] = [{ role: 'user', content: imgPrompt }];
        const resBody = {
          messages: message,
          model: 'gpt-3.5-turbo',
        };
    const botResponse = await axios.post(replyUrl, resBody);
    const data1 = botResponse.data;
        imagePrompt.push({
          prompt: data1,
          text: splitStory[i]
        })
        
      }

    
   

   const url =  await genaratePdfs(imagePrompt, title);

   const botUrl = process.env.BOT_SERVICE_BASEURL+'/api/bot/pdf';
   const botBody = {
    url : url,
    userId: "1234",
    title : title,
    description : story
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

const genaratePdfs = async (prompts:any,title:string) => {
    const doc = new jsPDF();
    doc.setFontSize(25);
    doc.setFont("times", "bold");
    var titleSplit = doc.splitTextToSize(title, 200);
    doc.text(titleSplit,15, 100);
    for (let i = 0; i < prompts.length; i++) {
      doc.addPage();
      let img = await generateImage(prompts[i].prompt);
      console.log({img});
     img = await urlTOBase64(img);
      var splitPrompt = doc.splitTextToSize(prompts[i].text, 180);
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


function splitParagraph(text:string, minParagraphs:number, maxParagraphs:number) {
  const sentences = text.split(/[.!?]/);

  const paragraphs = [];
  let currentParagraph = "";

  for (const sentence of sentences) {
    if (currentParagraph.length === 0) {
      currentParagraph += sentence;
    } else {
      const potentialParagraph = currentParagraph + sentence;
      if (potentialParagraph.length <= maxParagraphs) {
        currentParagraph = potentialParagraph;
      } else {
        paragraphs.push(currentParagraph);
        currentParagraph = sentence;
      }
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph);
  }

  if (paragraphs.length < minParagraphs) {
    const mergedParagraphs = [];
    for (let i = 0; i < paragraphs.length; i += minParagraphs) {
      mergedParagraphs.push(paragraphs.slice(i, i + minParagraphs).join(" "));
    }
    return mergedParagraphs.slice(0, maxParagraphs);
  } else if (paragraphs.length > maxParagraphs) {
 
    return paragraphs.slice(0, maxParagraphs);
  } else {
    return paragraphs;
  }
}
