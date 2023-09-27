import Head from 'next/head';
import React from "react";
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import FunnyImage from '@/components/FunnyImage';
import BubbleGame from '@/components/BubbleGame';
export default function Home() {



  return (
    <div className="mx-auto my-8 flex min-h-screen max-w-5xl flex-col px-4 sm:my-16">
      <Head>
        <title>Kiwi - Animations</title>
       
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
      </Head>
    
      <BubbleGame />
    

    
    
      
    </div>
  );
}
