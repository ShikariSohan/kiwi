import { Center } from '@mantine/core';
import ButtonPrimary from '../misc/ButtonPrimary';
import { IconEdit, IconTrash } from '@tabler/icons-react';
export default function ProfileCard({
  profile,
  modalOpened,
  setModalOpened,
}: {
  profile: any;
  modalOpened: any;
  setModalOpened: any;
}) {
  return (
    <div
      className="hover:cursor-pointer hover:opacity-80"
      style={{ maxWidth: '150px' }}
      onClick={() => setModalOpened(true)}
    >
      <Center className="m-2 justify-center">
        <div className="flex items-center justify-center ">
          <div className="mr-auto flex flex-col items-center">
            {/* Icon and Name on the Left */}
            <img
              className="h-20 w-20 rounded-full"
              src={`/avatars/${profile.avatar}.png`}
              alt=""
            />
            <h5
              className="text-title"
              style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '19px' }}
            >
              {profile.name}
            </h5>
          </div>
        </div>
      </Center>
    </div>
  );
}
