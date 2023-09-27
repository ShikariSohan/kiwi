import Sidebar from '@/components/Layout/Sidebar';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
    <Head>
      <title>Dashboard | Kiwi</title>
    </Head>
    <div
      className="flex-container h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
      style={{ backgroundImage: 'url("/assets/background.png")' }}
    >
      {/* Sidebar */}
      <Sidebar />
    </div>
    </>
  );
};

export default Home;
