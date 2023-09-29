import Head from 'next/head';
import React from 'react';
import AnimationCanvas from '@/components/AnimationCanvas';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import FunnyImage from '@/components/FunnyImage';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Layout from '@/components/Layout/Layout';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Fun Cam | Kiwi</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Layout>
        <div
          style={{
            backgroundColor: '#EEEFF2',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '5%',
          }}
        >
          <FunnyImage />
        </div>
      </Layout>
    </div>
  );
}
