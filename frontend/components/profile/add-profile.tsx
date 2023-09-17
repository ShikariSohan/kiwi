import { Center } from '@mantine/core';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AddCard({setOpened}:{
  setOpened:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter();
  
  const onClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpened(true);
  };

  return (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 aspect-square m-5">
      <img className="rounded-t-lg max-w-40 max-h-40" src="add.gif" alt="" />
      <Center>
        <Button className="text-base text-white h-10 mb-5" onClick={onClick}>
          Add Profile
        </Button>
      </Center>
    </div>
  );
}
