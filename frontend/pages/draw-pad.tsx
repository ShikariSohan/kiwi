import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CanvasSketchTool  } from 'react-arts';
import { useScreenshot, createFileName } from 'use-react-screenshot'
import axios from 'axios'
import {
  useMantineTheme,
  Center,
  Button,
  Container,
  Text
} from '@mantine/core';
import React from 'react';
export default function AppShellDemo(props: any) {
  const theme = useMantineTheme();
  const canvasRef = useRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const [genarated_text, setGenarated_text] = useState("")


  useEffect(() => {
    // Update the current ref
    if (canvasRef.current) {
      takeScreenshot(canvasRef.current);
    }
  }, [canvasRef, image, takeScreenshot]);



  const onClick = async () => {
    if(canvasRef.current){
      //instead of download put your logic
      const func = async (image: string,{name = "img", extension = "jpg" } = {}) => {
        const base64Image = image;
     try{
      const res = await axios.post("/api/handwritten", {
        image : base64Image
      });
      // console.log      )
      setGenarated_text(res.data[0].generated_text)
    
     }
      catch(err){
        console.log(err)
      }
      }
    takeScreenshot(canvasRef.current).then(
      (image: string) => func(image)
    )
      

  }
}
  return (

      <Center style={{height:"100vh", width:"100wh", flexFlow:"column"}}>
      <Container ref = {canvasRef}>
        <Text>{genarated_text}</Text>
      <CanvasSketchTool
        height={450}
        width={750}
    />
    </Container>
    <Button onClick={onClick} m="xl">Save</Button>

    </Center>
  );
}

// const download = (image: string,{name = "img", extension = "jpg" } = {}) => {
//   const a = document.createElement("a");
//   a.href = image;
//   a.download = createFileName(extension, name);
//   const c = createFileName(extension, name);
//   console.log(typeof(c))
//   a.click();

// }