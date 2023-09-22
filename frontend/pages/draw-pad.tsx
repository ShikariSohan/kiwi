import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CanvasSketchTool } from 'react-arts';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import axios from 'axios';
import { Center, Container } from '@mantine/core';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { IconReload } from '@tabler/icons-react';
import { generate } from 'random-words';
export default function AppShellDemo(props: any) {
  const canvasRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [genarated_text, setGenarated_text] = useState<string>('');
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const [mainWord, setmainWord] = useState<string[]>(
    generate({ minLength: 2, maxLength: 4, exactly: 1 })
  );

  useEffect(() => {
    // Update the current ref
    if (canvasRef.current) {
      takeScreenshot(canvasRef.current);
    }
  }, [canvasRef, image, takeScreenshot]);

  const onClick = async () => {
    if (canvasRef.current) {
      //instead of download put your logic
      const func = async (
        image: string,
        { name = 'img', extension = 'jpg' } = {}
      ) => {
        const base64Image = image;
        try {
          const res = await axios.post('/api/handwritten', {
            image: base64Image,
          });
          // console.log      )
          setGenarated_text(res.data[0].generated_text);
        } catch (err) {
          console.log(err);
        }
      };
      takeScreenshot(canvasRef.current).then((image: string) => func(image));
    }
  };
  return (
    <Layout>
      <Center style={{ height: '100vh', width: '97vw', flexFlow: 'column' }}>
        <div className="text-normal">Write down the word:</div>
        {domLoaded && (
          <div className="text-word flex items-center gap-2">
            {mainWord}
            <button
              onClick={() =>
                setmainWord(
                  generate({ minLength: 2, maxLength: 4, exactly: 1 })
                )
              }
            >
              <IconReload />
            </button>
          </div>
        )}
        <Container ref={canvasRef}>
          <CanvasSketchTool height={570} width={870} />
        </Container>
        <ButtonPrimary onClick={onClick}>Save</ButtonPrimary>
      </Center>
    </Layout>
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
