import AddCard from '@/components/profile/add-profile';
import SingleCard from '@/components/profile/card';
import { Center, Grid, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileModal from '@/components/profile/profile-modal';
import Layout from '@/components/Layout/Layout';
export default function Profile() {
  const [profiles, setProfiles] = useState<{ name: string }[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      const getData = async () => {
        try {
          const res = await axios.get('/api/profiles', {
            headers: {
              Authorization: `${token}`,
            },
          });
          const profiles = res.data;
          console.log(profiles);
          setProfiles(profiles);
        } catch (err) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      };
      getData();
    }
  }, []);
  const [opened, setOpened] = useState(false);
  return (
    <Layout>
      <div
        style={{
          height: '89vh',
          width: '100vw',
          marginTop: '5%',
          flexDirection: 'column',
          alignContent: 'center',
          justifyItems: 'center',
          justifySelf: 'center',
          alignItems: 'center',
        }}
      >
        <Grid style={{ minWidth: '100%' }}>
          <Grid.Col span={2}>
            <AddCard setOpened={setOpened} />
          </Grid.Col>
          {profiles &&
            profiles.map((profile, key) => (
              <Grid.Col span={2} key={key}>
                <SingleCard name={profile.name} />
              </Grid.Col>
            ))}

          {/* <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" /> */}
        </Grid>

        {opened && <ProfileModal opened={opened} setOpened={setOpened} />}
      </div>
    </Layout>
  );
}
