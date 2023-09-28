import Sidebar from '@/components/Layout/Sidebar';
import PdfCard from '@/components/PdfCard';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProfileCard from '@/components/profile/ProfileCard';
import UpdateProfile from '@/components/profile/update-profile';
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
  const [profile, setProfile] = useState<any>( {
    name: 'Loading...',
    age:"Loading...",
    gender:"Loading...",
    id:"Loading...",
  })
 
  useEffect(()=>{
    setProfile(JSON.parse(localStorage.getItem('profile')||"")||
    {
      name: 'Loading...',
      age:"Loading...",
      gender:"Loading...",
      id:"Loading...",
    });
  },[])


  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.description.toLowerCase().includes(debounced.toLowerCase()) ||
      pdf.title.toLowerCase().includes(debounced.toLowerCase())
  );

  const [modalOpened, setModalOpened] = useState(false);

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
    <>
    <Head>
      <title>Dashboard | Kiwi</title>
      </Head>
    <div className="flex h-screen flex-col">
      <div className="flex">
        <Sidebar />
        <div className="custom-scrollbar bg-white flex-grow overflow-y-auto p-4">
         <ProfileCard profile={profile} modalOpened={modalOpened} setModalOpened={setModalOpened} />
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
            <PdfCard pdf={pdf} key={pdf.id} self={true} />
          ))}
        </div>
      </div>
      {modalOpened && (
        <UpdateProfile
          profile={profile}
          opened={modalOpened}
        setOpened={setModalOpened}
        />
      )} 
    </div>
    </>
  );
};

export default Dashboard;
