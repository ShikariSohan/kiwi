import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CanvasSketchTool  } from 'react-arts';
import { useScreenshot, createFileName } from 'use-react-screenshot'

import {
  useMantineTheme,
  Center,
  Button,
  Container,
} from '@mantine/core';
import React from 'react';
export default function AppShellDemo(props: any) {
  const theme = useMantineTheme();
  const canvasRef = useRef(null)
  const [image, takeScreenshot] = useScreenshot()


  useEffect(() => {
    // Update the current ref
    if (canvasRef.current) {
      takeScreenshot(canvasRef.current);
    }
  }, [canvasRef, image, takeScreenshot]);



  const onClick = (event) => {
    if(canvasRef.current){
      //instead of download put your logic
    takeScreenshot(canvasRef.current).then(download)
    }

  }
  return (

      <Center style={{height:"100vh", width:"100wh", flexFlow:"column"}}>
      <Container ref = {canvasRef}>
      <CanvasSketchTool
        height={450}
        width={750}
    />
    </Container>
    <Button onClick={onClick} m="xl">Save</Button>

    </Center>
  );
}
const download = (image: string,{name = "img", extension = "jpg" } = {}) => {
  const a = document.createElement("a");
  a.href = image;
  a.download = createFileName(extension, name);
  a.click();
};
