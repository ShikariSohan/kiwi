import PdfCard from '@/components/PdfCard';
import Head from 'next/head';
import { useEffect, useState } from 'react';
export default function Home() {
  const [pdfs, setPdfs] = useState([]) as any[];
  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch("/api/pdfs");
        const data = await res.json();
        setPdfs(data);
        console.log(data);
      }
      catch (err) {
        console.log(err);
      }
    }
    func();
  }, [])
  return (
    <div className="mx-auto my-8 flex min-h-screen max-w-5xl flex-col px-4 sm:my-16">
      <Head>
        <title>Kiwi - PDFS</title>
       
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
      </Head>
      <h1>PDFS</h1>
      <div style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-around",
        marginTop:"20px",
        marginBottom:"20px"
      }}>
        {pdfs.map((pdf:any) => (
          <PdfCard pdf={pdf} />
        ))}
      </div>
     
      
    </div>
  );
}
