import Sidebar from '@/components/Layout/Sidebar';
import PdfCard from '@/components/PdfCard';
import { useDebouncedValue } from '@mantine/hooks';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { Grid, TextInput } from '@mantine/core';
import Link from 'next/link';
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
          {filteredPdfs.map((pdf: any) => (
            <PdfCard pdf={pdf} key={pdf.id} self={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
