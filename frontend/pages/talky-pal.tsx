import Layout from '@/components/Layout/Layout';
import { Message } from '@/types';
import { Center, Loader } from '@mantine/core';
import {
  IconLockPause,
  IconMicrophone,
  IconPlayerPause,
} from '@tabler/icons-react';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
const AvatarBot: React.FC = () => {
  const microphoneRef = useRef(null);
  const videoRef = useRef(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [botTalking, setBotTalking] = useState(false);
  const [humanTalking, setHumanTalking] = useState(false);
  const [profile, setProfile] = useState<any>({
    name: 'Random User',
    age: 2,
    gender:"male"
  });
  const [botScript, setBotScript] = useState('');
  const [botVideos, setBotVideos] = useState(
    Math.floor(Math.random() * 2) === 1
      ? { type: 'monkey', phase: 3 }
      : { type: 'baby', phase: 3 }
  );
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    const profile = localStorage.getItem('profile');
    if (profile) {
      setProfile(JSON.parse(profile));
    }
  }, []);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const synth = window.speechSynthesis;

    if (botTalking) {
      const currentSrc = videoRef.current?.getAttribute('src');

      if (currentSrc && currentSrc.includes('silent')) {
        let startTime = 0;

        const match = currentSrc.match(/(?:baby|monkey)-silent-(\d+)\.mp4/);

        if (match) {
          const srcNumber = parseInt(match[1]);
          if (srcNumber === 1) {
            startTime = 0;
          } else if (srcNumber === 2) {
            startTime = 11;
          } else if (srcNumber === 3) {
            startTime = 21;
          }
        }

        // Set the currentTime property to the desired start time in seconds
        videoRef.current.currentTime = startTime;
        videoRef.current?.setAttribute(
          'src',
          `${botVideos.type}-talking-v2.mp4`
        );
        // Play the video
      }
      const u =
        botScript === ''
          ? new SpeechSynthesisUtterance('Please speak again')
          : new SpeechSynthesisUtterance(botScript);
      console.log({ voice: synth.getVoices() });

      if (botVideos.type === 'baby') {
        u.voice = synth
          .getVoices()
          .find((voice) => voice.lang.includes('hi-IN'));
        u.pitch = 1.3;
        u.rate = 0.9;
      } else {
        u.voice = synth
          .getVoices()
          .find((voice) =>
            voice.name.includes('Microsoft Mark - English (United States)')
          );
        u.pitch = 0.7;
        u.rate = 1;
      }

      synth.speak(u);
      videoRef.current?.load();
      resetTranscript();
      u.onend = () => {
        setBotTalking(false);
      };
    } else {
      synth.cancel();
      videoRef.current?.setAttribute(
        'src',
        `${botVideos.type}-silent-${
          !videoRef.current || videoRef.current.currentTime < 10
            ? 1
            : videoRef.current.currentTime < 20
            ? 2
            : 3
        }.mp4`
      );

      videoRef.current?.load();
    }

    if (transcript === '') setBotTalking(false);
  }, [botTalking]);

  const handleSend = async (message: Message) => {
    console.log({ message });
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: updatedMessages,
        profile,
      }),
    });

    if (!response) {
      setLoading(false);
      throw new Error(response);
    }

    const content = await response.json();

    console.log({ content });

    if (!content) {
      setLoading(false);
      throw new Error(content);
    }

    setLoading(false);
    setBotScript(content);
    setMessages((messages) => [
      ...messages,
      {
        role: 'assistant',
        content,
      },
    ]);
    setBotTalking(true);
  };
  const handleBotListen = async () => {
    if (!humanTalking) {
      setHumanTalking(true);
      microphoneRef.current.classList.add('listening');
      SpeechRecognition.startListening({
        continuous: true,
      });
    } else {
      setHumanTalking(false);
      setLoading(true);
      // videoRef.current.play();
      console.log({ transcript });
      //   setContent(transcript);
      microphoneRef.current.classList.remove('listening');
      SpeechRecognition.stopListening();
      console.log({ transcript });
      await handleSend({ role: 'user', content: transcript });
    }
  };

  return (
    <>
      <Head>
        <title>Talky Pal | Kiwi</title>
      </Head>
      <Layout>
        <Center
          style={{
            width: '100vw',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <Center
            style={{
              flexDirection: 'column',
              paddingTop: '7%',
            }}
          >
            <video
              ref={videoRef}
              autoPlay={true}
              id="v0"
              width={1100}
              preload="preload"
              className="sticky top-0"
              muted
              loop
            >
              <source
                type="video/mp4"
                src={`${botVideos.type}-silent-1.mp4`}
              ></source>
            </video>
          </Center>

          <Center>
            {loading && <Loader />}
            <button
              onClick={handleBotListen}
              disabled={botTalking || loading}
              className={`text-white m-5 rounded-full p-5 hover:cursor-pointer hover:opacity-80 ${
                !humanTalking
                  ? botTalking || loading
                    ? 'icon-button-disabled'
                    : 'icon-button'
                  : 'icon-button-clicked'
              } `}
            >
              <IconMicrophone ref={microphoneRef} />
            </button>
            <button
              disabled={!botTalking}
              onClick={() => setBotTalking(false)}
              className={`text-white m-5 rounded-full p-5 hover:cursor-pointer hover:opacity-80 ${
                !botTalking ? 'icon-button-disabled' : 'icon-button'
              } `}
            >
              <IconPlayerPause ref={microphoneRef} />
            </button>
          </Center>
        </Center>
      </Layout>
    </>
  );
};

export default AvatarBot;
