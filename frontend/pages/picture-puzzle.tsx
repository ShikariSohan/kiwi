import Head from 'next/head';
import React from 'react';
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import PicturePuzzle from '@/components/PicturePuzzle';
import Layout from '@/components/Layout/Layout';
export default function Home() {
  const [image, setImage] = useState('');
  const [action, setAction] = useState('');

  return (
    <div>
      <Head>
        <title>Picture Puzzle | Kiwi</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
      <PicturePuzzle />
      </Layout>
    </div>
  );
}
