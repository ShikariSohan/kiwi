import Head from 'next/head';
import React from "react";
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import BubbleGame from '@/components/BubbleGame';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function Home() {



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
      <BubbleGame />
      </div>
     
      <Footer />
    

  
  </div>
  );
}
