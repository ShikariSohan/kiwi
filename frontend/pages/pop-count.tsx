import Head from 'next/head';
import React from "react";
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import BubbleGame from '@/components/BubbleGame';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function Home() {
  const [profile, setProfile] = useState({
    bubble:"10.01",
    puzzle:"70"
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    let profile = localStorage.getItem('profile');
    if (!token) {
      window.location.href = '/login';
    }
    if(profile){
      setProfile(JSON.parse(profile));
    }
  }, []);
  return (
    <div>
    <Head>
      <title>Pop Count | Kiwi</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
      <Header />
      <div 
      style={{
        backgroundColor: '#EEEFF2',
        height: '95vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <BubbleGame profile={profile}/>
      </div>
     
      <Footer />
    

  
  </div>
  );
}
