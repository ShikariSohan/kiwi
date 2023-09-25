import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CanvasSketchTool } from 'react-arts';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import axios from 'axios';
import { Center, Container } from '@mantine/core';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { IconCheck, IconReload } from '@tabler/icons-react';
import { generate } from 'random-words';
import Sidebar from '@/components/Layout/Sidebar';
import { notifications } from '@mantine/notifications';
import LoadingDots from '@/components/LoadingDots';
export default function AppShellDemo(props: any) {
  const canvasRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [genarated_text, setGenarated_text] = useState<string>('');
  const [domLoaded, setDomLoaded] = useState(false);
  const [mainWord, setmainWord] = useState<string[]>(
    generate({ minLength: 2, maxLength: 4, exactly: 1 })
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    // Update the current ref
    if (canvasRef.current) {
      takeScreenshot(canvasRef.current);
    }
  }, [canvasRef, image, takeScreenshot]);

  const onClick = async () => {
    setLoading(true);
    // const id = notifications.show({
    //   loading: true,
    //   title: 'Loading your data',
    //   message: 'Data will be loaded in 3 seconds, you cannot close this yet',
    //   autoClose: false,
    //   withCloseButton: false,
    // });
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
          console.log({ res });
          setGenarated_text(res.data[0].generated_text);
          const pred: boolean =
            removeNonAlphabeticCharacters({
              inputString: res.data[0].generated_text,
            }) === mainWord[0];

          setLoading(false);
          alert(
            pred
              ? 'You are correct!'
              : 'Please write again, because the prediction says your text is: ' +
                  removeNonAlphabeticCharacters({
                    inputString: res.data[0].generated_text,
                  })
          );
        } catch (err) {
          console.log(err);
        }
      };
      takeScreenshot(canvasRef.current).then((image: string) => func(image));
    }
    // notifications.update({
    //   id,
    //   color: 'teal',
    //   title: 'Data was loaded',
    //   message: 'pred',
    //   icon: <IconCheck />,
    //   loading: false,
    //   autoClose: 2000,
    // });
  };
  return (
    <Layout>
      <div
        className="flex-container h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
        style={{ backgroundImage: 'url("/assets/background.png")' }}
      >
        <Center style={{ height: '100vh', width: '97vw', flexFlow: 'column' }}>
          <div className="text-normal">Write down the word:</div>
          {domLoaded && (
            <div className="text-word flex items-center gap-2">
              {mainWord[0]}
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
          <div style={{ marginTop: '2%' }}>
          <ButtonPrimary
          type="button"
          addClass="mt-8 rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={onClick}
          disabled={loading}
        >
          {loading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            'Check My Grammar'
          )}
        </ButtonPrimary>
          </div>
        </Center>
      </div>
    </Layout>
  );
}

function removeNonAlphabeticCharacters({
  inputString,
}: {
  inputString: string;
}) {
  return inputString.replace(/[^A-Za-z]+/g, '');
}

// const download = (image: string,{name = "img", extension = "jpg" } = {}) => {
//   const a = document.createElement("a");
//   a.href = image;
//   a.download = createFileName(extension, name);
//   const c = createFileName(extension, name);
//   console.log(typeof(c))
//   a.click();

// }
