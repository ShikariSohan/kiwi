import Feature from '../components/Feature';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';

export default function Home() {
  return (
    <div>
      <Layout>
        <div style={{ backgroundColor: '#ffffff' }}>
          <Hero />
          <Feature />
        </div>
      </Layout>
    </div>
  );
}
