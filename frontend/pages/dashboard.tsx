import Sidebar from '@/components/Layout/Sidebar';
import PdfCard from '@/components/PdfCard';
import { useDebouncedValue } from '@mantine/hooks';
import { Center, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProfileCard from '@/components/profile/ProfileCard';
import UpdateProfile from '@/components/profile/update-profile';
import { set } from 'lodash';
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
  const [filterpdf, setFilterpdf] = useState<PdfData[]>([]); 
  const [profile, setProfile] = useState<any>({
    name: 'Loading...',
    age: 'Loading...',
    gender: 'Loading...',
    id: 'Loading...',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    let profile = localStorage.getItem('profile') as any;

    if (profile) {
      setProfile(JSON.parse(profile));
      profile = JSON.parse(profile);
    }
    else {
      window.location.href = '/login';
    }
    const getPdfs = async () => {
      const res = await fetch(`api/pdfs?userId=${profile.id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      console.log({data});
      setPdfs(data);
      setFilterpdf(data);
    };
    try {
      getPdfs();
    }
    catch (err) {
      console.log(err);
    }
    
  }, []);

  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    console.log({ debounced });
    setFilterpdf(
      pdfs.filter((pdf) => {
        return pdf.title.toLowerCase().includes(debounced.toLowerCase()) || pdf.description.toLowerCase().includes(debounced.toLowerCase());
      })
    );
  }, [debounced]);

  return (
    <>
      <Head>
        <title>Dashboard | Kiwi</title>
      </Head>
      <div
        className="flex h-screen flex-col"
        style={{
          backgroundImage: 'url("/dashboard/background.gif")', // Your background image URL
          backgroundSize: 'auto 20%', // Auto width, full height
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right bottom',
        }}
      >
        <div className="flex">
          <Sidebar />
          <div className="custom-scrollbar bg-white h-full w-full flex-grow overflow-y-auto p-4">
            <Center className="w-full flex-col">
              <ProfileCard
                profile={profile}
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              {pdfs && (
                <TextInput
                  label="Search Story"
                  placeholder="Enter search term..."
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                  className="w-full max-w-md"
                />
              )}
              <div className="flex w-full flex-col items-center justify-center">
                {filterpdf &&
                  filterpdf.map((pdf, index) => (
                    <PdfCard pdf={pdf} self={true} key={index} />
                  ))}
              </div>
            </Center>

            {/* End centering */}
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
