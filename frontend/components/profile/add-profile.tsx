// import { Center } from '@mantine/core';
// import { Button } from 'flowbite-react';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

// export default function AddCard({setOpened}:{
//   setOpened:React.Dispatch<React.SetStateAction<boolean>>
// }) {
//   const router = useRouter();

//   return (
//     <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 aspect-square m-5">
//       <img className="rounded-t-lg max-w-40 max-h-40" src="add.gif" alt="" />
//       <Center>
//         <Button className="text-base text-white h-10 mb-5" onClick={onClick}>
//           Add Profile
//         </Button>
//       </Center>
//     </div>
//   );
// }

import { Center } from '@mantine/core';

export default function SingleCard({
  setOpened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpened(true);
  };
  return (
    <div
      className="bg-white dark:bg-neutral-700 mb-20 block rounded-lg"
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
            src="/avatars/add-icon.png"
            alt=""
          />
          <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
            Add a new User
          </h5>
        </Center>
      </div>
    </div>
  );
}
