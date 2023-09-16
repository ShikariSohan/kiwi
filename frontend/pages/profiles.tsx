import AddCard from '@/components/profile/add-profile';
import SingleCard from '@/components/profile/card';
import { Center } from '@mantine/core';

export default function Profile() {
  return (
    <Center style={{ height: '100vh' }}>
      <AddCard />
      <SingleCard />
    </Center>
  );
}
