import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    BackgroundImage,
    Center,
    Card,
    Modal
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  import { Button } from 'flowbite-react';
  import axios from 'axios';
export default function ProfileModal({
    opened,
    setOpened,
}:{
    opened:boolean,
    setOpened:React.Dispatch<React.SetStateAction<boolean>>
}) {
    const form = useForm({
        initialValues: { age: 2, profilename: '' },
        validate: {
          age: (value) =>
            value < 2 || value > 12
              ? 'The app runs best for kids between 2-12 years old'
              : null,
        },
      });
    
      const onSubmit =  async (values: { age: number; profilename: string }) => {
        console.log({ values });
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            window.location.href = '/login';
          }
          else{
            const res = await axios.post("/api/profiles", {
                name: values.profilename,
                age: values.age
            },
            {
              headers: {
                Authorization: `${token}`,
              },
            } 
            );
            window.location.href = "/profiles";
          }
        }
        catch(err){
          alert("Error");
          console.log(err);
        }
      
       
      };
  
  return (
    <>
      <Modal opened={opened} onClose={()=>{
        setOpened(false);
      }} title="Profile" centered>
       <Center style={{ height: '100%' }}>
        <Card p="xl" color="orange.1">
          <Title align="center" sx={(theme) => ({ fontFamily: `Caveat` })}>
            Add profile
          </Title>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Paper p={30} mt={30} radius="md">
              <TextInput
                label="Profile name"
                placeholder="kiwi"
                required
                {...form.getInputProps('profilename')}
              />
              <TextInput
                label="Age"
                placeholder="2"
                required
                mt="md"
                {...form.getInputProps('age')}
              />
              <Button type="submit" className="w-full mt-5">
                Create
              </Button>
            </Paper>
          </form>
        </Card>
      </Center>
      </Modal>

    
    </>
  );
}