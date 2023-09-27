import Head from 'next/head';
import Feature from '../components/Feature';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';

export default function Home() {
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
