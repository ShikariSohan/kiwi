import Head from 'next/head';
import ContentEditor from '@/components/ContentEditor';
import Layout from '@/components/Layout/Layout';
import { Center } from '@mantine/core';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);
  return (
    <>
      <Head>
        <title>Grammar Guru | Kiwi</title>
        <meta
          name="description"
          content="An easy to use app to fix your grammar"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Center
          style={{
            height: '89vh',
            backgroundImage: 'url("/assets/grammar.gif")', // Your background image URL
            backgroundSize: 'auto 40%', // Auto width, full height
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
          }}
        >
          <ContentEditor />
        </Center>
      </Layout>
    </>
  );
}
