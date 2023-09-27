import Sidebar from '@/components/Layout/Sidebar';
<<<<<<< HEAD
import PdfCard from '@/components/PdfCard';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
type PdfData = {
  description: string;
  id: string;
  title: string;
  url: string;
  userId: string;
};
const Dashboard = () => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200, { leading: true });
  const [pdfs, setPdfs] = useState<PdfData[]>([]);
=======
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
>>>>>>> 4a056fec5893b6df4e033338f61eee351f59dcfd

  // Filter PDFs based on description containing the search query
  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.description.toLowerCase().includes(debounced.toLowerCase()) ||
      pdf.title.toLowerCase().includes(debounced.toLowerCase())
  );

  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch('/api/pdfs');
        const data = await res.json();
        setPdfs(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch('/api/pdfs');
        const data = await res.json();
        setPdfs(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);

  return (
<<<<<<< HEAD
    <div className="flex h-screen flex-col">
      <div className="flex">
        <Sidebar />
        <div className="custom-scrollbar bg-white flex-grow overflow-y-auto p-4">
          {pdfs && (
            <div className="flex justify-end">
              <TextInput
                label="Search Story"
                placeholder="Enter search term..."
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                style={{ maxWidth: '600px', marginRight: '350px' }}
              />
            </div>
          )}
          {filteredPdfs.map((pdf, index) => (
            <PdfCard pdf={pdf} key={pdf.id} />
          ))}
        </div>
      </div>
=======
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
>>>>>>> 4a056fec5893b6df4e033338f61eee351f59dcfd
    </div>
    </>
  );
};

export default Dashboard;
