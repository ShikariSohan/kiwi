import Sidebar from '@/components/Layout/Sidebar';
import PdfCard from '@/components/PdfCard';
import { useDebouncedValue } from '@mantine/hooks';
import { Center, TextInput } from '@mantine/core';
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
  const [profile, setProfile] = useState<any>({
    name: 'Loading...',
    age: 'Loading...',
    gender: 'Loading...',
    id: 'Loading...',
  });

  useEffect(() => {
    const prof = localStorage.getItem('profile');
    return prof
      ? setProfile(JSON.parse(prof))
      : setProfile({
          name: 'Loading...',
          age: 'Loading...',
          gender: 'Loading...',
          id: 'Loading...',
        });
  }, []);

  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.description.toLowerCase().includes(debounced.toLowerCase()) ||
      pdf.title.toLowerCase().includes(debounced.toLowerCase())
  );

  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const func = async () => {
      try {
        let profile = JSON.parse(localStorage.getItem('profile') || '{}');
        let userId = profile.id;
        const res = await fetch('/api/pdfs?userId=' + userId,{
          headers: {
             'Authorization': localStorage.getItem('token') || ''},
        });
        const data = await res.json();
        setPdfs(data);
        console.log(data);
      } catch (err) {
        console.log(err);
        setPdfs([]);
      }
    };
    func();
  }, []);


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
                {filteredPdfs.map((pdf, index) => (
                  <PdfCard pdf={pdf} key={pdf.id} self={true} />
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
