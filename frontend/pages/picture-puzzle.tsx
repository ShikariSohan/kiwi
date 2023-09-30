import Head from 'next/head';
import React from 'react';
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import PicturePuzzle from '@/components/PicturePuzzle';
import Layout from '@/components/Layout/Layout';
export default function Home() {
  const [profile, setProfile] = useState({
    bubble:"10.01",
    puzzle:"70"
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    let profile = localStorage.getItem('profile');
    if(profile){
      setProfile(JSON.parse(profile));
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Picture Puzzle | Kiwi</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
      <PicturePuzzle profile={profile}/>
      </Layout>
    </div>
  );
}
