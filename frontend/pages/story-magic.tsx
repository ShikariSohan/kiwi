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
        <Center
          style={{
            height: '89vh',
            backgroundImage: 'url("/assets/story.gif")', // Your background image URL
            backgroundSize: 'auto 10%', // Auto width, full height
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'left top',
            gap: '10px',
            margin: '90px',
          }}
        >
          <StoryEditor />
        </Center>
      </Layout>
    </div>
  );
}
