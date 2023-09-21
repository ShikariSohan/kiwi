import AddCard from '@/components/profile/add-profile';
import SingleCard from '@/components/profile/card';
import { Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileModal from '@/components/profile/profile-modal';
export default function Profile() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    else{
      const getData = async () => {
        try {
          const res = await axios.get("/api/profiles",
          {
            headers: {
              Authorization: `${token}`,
            },
          } 
          );
          const profiles = res.data;
          console.log(profiles);
          setProfiles(profiles);
        }
       
        catch(err){
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
      getData();
    }
  }, []);
  const [opened, setOpened] = useState(false);
  return (
    <Center style={{ height: '100vh' }}>
      <AddCard setOpened={setOpened} />
      <SingleCard />
    {opened && <ProfileModal opened={opened} setOpened={setOpened} />}
    </Center>
  );
}
