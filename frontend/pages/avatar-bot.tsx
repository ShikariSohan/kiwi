import { Message } from '@/types';
import { Center, Loader } from '@mantine/core';
import { IconLockPause, IconMicrophone } from '@tabler/icons-react';
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
  const [botScript, setBotScript] = useState('');
  const [botVideos, setBotVideos] = useState(
    Math.floor(Math.random() * 2) === 1
      ? { type: 'monkey', phase: 3 }
      : { type: 'baby', phase: 4 }
  );
  // const [botVideos, setBotVideos] = useState(  
  //        { type: 'monkey', phase: 3 }
  //   );

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
      const u = new SpeechSynthesisUtterance(botScript);
      const voices = synth.getVoices();
      const dimitri = synth.getVoices().find(voice => voice.name.includes('Dmitry'));
      ;
      const child = synth.getVoices().find(voice => voice.name.includes('Nabanita'));

      if(botVideos.type === 'baby')
      {
        u.voice = child || voices[0];
        u.pitch = 1.5;
        u.rate = 0.9;
      }
      else {
        u.voice = dimitri || voices[0];
        u.pitch = .9;
        u.rate = 1;
      }
      

      synth.speak(u);
      videoRef.current?.play();
      resetTranscript();
      u.onend = () => {
        setBotTalking(false);
      }
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

      videoRef.current?.play();
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
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <video
        ref={videoRef}
        autoPlay={true}
        id="v0"
        preload="preload"
        className=" p-3 sticky top-0"
        muted
        loop
        style={{ filter: 'grayscale(0.3)', maxWidth: '70%' }}
      >
        <source
          type="video/mp4"
          src={`${botVideos.type}-silent-1.mp4`}
        ></source>
      </video>
      <Center>
        {loading && <Loader />}
        <button
          onClick={handleBotListen}
          disabled={botTalking || loading}
          className={`${
            !humanTalking
              ? botTalking || loading
                ? 'bg-red-300'
                : 'bg-blue-500'
              : 'bg-red-500'
          } `}
        >
          <IconMicrophone
            size={50}
            ref={microphoneRef}
            className={`hover:cursor-pointer rounded-full m-10 p-2 text-white hover:opacity-80`}
          />
        </button>
        <button
          disabled={!botTalking}
          onClick={() => setBotTalking(false)}
          className={`${botTalking ? 'bg-cyan-500' : 'bg-red-300'} `}
        >
          <IconLockPause
            size={50}
            ref={microphoneRef}
            className={`hover:cursor-pointer rounded-full m-10 p-2 text-white hover:opacity-80`}
          />
        </button>
      </Center>
    </Center>
  );
};

export default AvatarBot;
