import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

export default function SingleCard({ name,profile }: { name: string,profile:any }) {
  const router = useRouter();
  const imgno = Math.floor(Math.random() * 15) + 1;
  const onClick = () => {
    profile.avatar = imgno;
    localStorage.setItem('profile', JSON.stringify(profile));

    router.push('/dashboard');
  };
 
  return (
    <div
      className="bg-white dark:bg-neutral-700 block rounded-lg"
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <Center style={{ flexDirection: 'column' }}>
          <img
            className="rounded-t-lg p-4"
            style={{ width: '120px', height: '120px' }}
            src={`/avatars/${imgno}.png`}
            alt=""
          />
          <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
            {name}
          </h5>
        </Center>
      </div>
    </div>
  );
}
