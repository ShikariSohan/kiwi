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
        <Center style={{ height: '89vh' }}>
          <StoryEditor />
        </Center>
      </Layout>
    </div>
  );
}
