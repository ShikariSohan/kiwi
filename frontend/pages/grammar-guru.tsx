import Head from 'next/head';
import ContentEditor from '@/components/ContentEditor';
import Layout from '@/components/Layout/Layout';
import { Center } from '@mantine/core';

export default function Home() {
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
        <Center style={{ height: '90vh' }}>
          <ContentEditor />
        </Center>
      </Layout>
    </>
  );
}
