import Head from 'next/head';
import React from 'react';
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import PicturePuzzle from '@/components/PicturePuzzle';
export default function Home() {
  const [image, setImage] = useState('');
  const [action, setAction] = useState('');

  return (
    <div>
      <Head>
        <title>Kiwi - Animations</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* <AnimationCanvas image={image} action={action} /> */}
      <PicturePuzzle />
    </div>
  );
}
