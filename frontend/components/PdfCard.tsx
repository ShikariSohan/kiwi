import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {
  IconArrowDown,
  IconPlayerPause,
  IconPlayerPlay,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function PdfCard({
  pdf,
  self = false,
}: {
  pdf: any;
  self?: boolean;
}) {
  const imgno = Math.floor(Math.random() * 15) + 1;
  const [playing, setPlaying] = useState(false);
  const synth = window.speechSynthesis;
  console.log({ pdf });
  const play = () => {
    setPlaying(true);

    const u = new SpeechSynthesisUtterance(pdf.description);
    u.voice = synth
      .getVoices()
      .find((voice) =>
        voice.name.includes('Microsoft Zira - English (United States)')
      );
    u.pitch = 1;
    u.rate = 0.7;
    synth.speak(u);
  };
  const pause = () => {
    synth.cancel();
    setPlaying(false);
  };
  const deletePdf = async (id: string) => {
    try {
      const res = await fetch('/api/pdfs?pdfId=' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        },
      });
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card
      radius="md"
      style={{
        width: '70%',
        height: '10vh',
        margin: '1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e2ece9',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={`/avatars/${imgno}.png`} style={{ height: '50px' }} />
        <Text fw={500} style={{ marginLeft: '40px' }}>
          {pdf.title}
        </Text>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
        {self && (
          <button onClick={()=>{
            deletePdf(pdf.id);
          }}>
            <IconTrash className="text-white icon-button right-0 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:opacity-80" />
          </button>
        )}
        <button
          onClick={() => {
            window.open(pdf.url, '_blank');
          }}
        >
          <IconArrowDown className="text-white icon-button right-3 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:opacity-80" />
        </button>
        {!playing ? (
          <button onClick={play}>
            <IconPlayerPlay className="text-white icon-button right-12 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:opacity-80" />
          </button>
        ) : (
          <button onClick={pause}>
            <IconPlayerPause className="text-white icon-button right-12 h-8 w-8 rounded-full p-1 hover:cursor-pointer hover:opacity-80" />
          </button>
        )}
      </div>
    </Card>
  );
}
