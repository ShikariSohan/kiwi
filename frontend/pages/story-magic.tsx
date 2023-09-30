import Head from 'next/head';
import StoryEditor from '@/components/StoryEditor';
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
    <div>
      <Head>
        <title>Magical Story | Kiwi</title>
      </Head>
      <Layout>
        <div style={{ minHeight: '89vh', width: '100%', paddingTop: '100px' }}>
          <Center
            style={{
              backgroundImage: 'url("/assets/story.gif")', // Your background image URL
              backgroundSize: 'auto 25%', // Auto width, full height
              backgroundRepeat: 'repeat-x ',
              backgroundPosition: 'center top',
              // margin: '90px',
            }}
          >
            <StoryEditor />
          </Center>
        </div>
      </Layout>
    </div>
  );
}
