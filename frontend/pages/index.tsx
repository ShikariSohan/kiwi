import Head from 'next/head';
import Feature from '../components/Feature';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/profiles';
    }
  }, []);
  return (
    <>
   <Head>
    <title>Kiwi | AI powered Playground</title>
   </Head>
    <div>
      <Layout>
        <div style={{ backgroundColor: '#ffffff' }}>
          <Hero />
          <Feature />
        </div>
      </Layout>
    </div>
    </>
  );
}
