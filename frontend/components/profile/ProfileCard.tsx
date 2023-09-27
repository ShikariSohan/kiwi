
import { Center } from '@mantine/core';
import ButtonPrimary from '../misc/ButtonPrimary';
export default function ProfileCard({profile,modalOpened,setModalOpened}: {profile:any,modalOpened:any,setModalOpened:any}) {
 
  return (
    <div
    style={{
        backgroundColor: '#F1FAEE',
        borderRadius: "10px",
        marginRight: "10%",
    }}
    >
        <Center style={{ flexDirection: 'column' }}>
            <img
                className="rounded-t-lg p-4"
                style={{ width: '120px', height: '120px' }}
                src={`/avatars/${profile.avatar}.png`}
                alt=""
            />
            <h5>
                Name: {profile.name}
            </h5>
            <h5>
                Age: {profile.age}
            </h5>
            <h5>
                Gender: {profile.gender}
            </h5>
        </Center>
       <ButtonPrimary
       onClick={() => {
        setModalOpened(true);
       }}
       >Edit Profile</ButtonPrimary>
    </div>
  );
}
