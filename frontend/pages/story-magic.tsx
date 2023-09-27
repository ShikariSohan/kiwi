import Head from 'next/head';
import StoryEditor from '@/components/StoryEditor';
import Layout from '@/components/Layout/Layout';
import { Center } from '@mantine/core';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Story Magic | Kiwi</title>
      </Head>
      <Layout>
        <div style={{ height: '100%', width: '100%', paddingTop: '200px' }}>
          <Center
            style={{
              height: '70vh',
              backgroundImage: 'url("/assets/story.gif")', // Your background image URL
              backgroundSize: 'auto 12%', // Auto width, full height
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
