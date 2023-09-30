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
import Head from 'next/head';
import Confetti from 'react-dom-confetti';
import { Alert } from '@mantine/core';

export default function AppShellDemo(props: any) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [AlertText, setAlertText] = useState('Something went wrong!');
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const handleClick = () => {
    setShowConfetti(true);
    // hide after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const config = {
    angle: '155',
    spread: 360,
    startVelocity: '30',
    elementCount: '121',
    dragFriction: '0.07',
    duration: '7360',
    stagger: '3',
    width: '29px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };
  const [show, setShow] = useState(false);
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
    setAlert(false);
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
          if (pred) {
            handleClick();
          } else {
            setAlertText(
              removeNonAlphabeticCharacters({
                inputString: res.data[0].generated_text,
              }) === ''
                ? 'Please write something!😥'
                : `You have written: ${removeNonAlphabeticCharacters({
                    inputString: res.data[0].generated_text,
                  })}`
            );

            setAlert(true);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
          setAlertText('Something went wrong! Please try again');
          setAlert(true);
        }
      };
      takeScreenshot(canvasRef.current).then((image: string) => func(image));
    }
  };
  return (
    <>
      <Head>
        <title>Draw N Learn | Kiwi</title>
      </Head>
      <Layout>
        <div
          className="flex-container text-gray-900 dark:bg-dark dark:text-light h-screen bg-gray-100 antialiased"
          style={{
            padding: '90px',
            // backgroundColor: '#fff',
          }}
        >
          <Center
            style={{
              height: '89vh',
              width: '97vw',
              flexFlow: 'column',
              backgroundImage: 'url("/assets/letters.gif")', // Your background image URL
              backgroundSize: 'auto 80%', // Auto width, full height
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left center', // Align image to the left and top
            }}
          >
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
                  'Check My Writing'
                )}
              </ButtonPrimary>
            </div>
            <Confetti active={showConfetti} config={config} />
          </Center>
        </div>
        {alert && (
          <Alert
            title="Oh no!"
            color="red"
            withCloseButton
            sx={{
              // marginLeft: '10%',
              bottom: '1%',
              position: 'fixed',
              width: '20%',
              right: '0%',
            }}
            onClose={() => setAlert(false)}
          >
            {AlertText}
          </Alert>
        )}
      </Layout>
    </>
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
