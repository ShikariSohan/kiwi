import {
    Paper,
    Title,
    Center,
    Card,
    Modal,
    Select,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  import { Button } from 'flowbite-react';
  import axios from 'axios';
  import ButtonPrimary from '../misc/ButtonPrimary';
  export default function UpdateProfile({
    opened,
    setOpened,
    profile,
  }: {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    profile: any;
  }) {
    const form = useForm({
      initialValues: { age: profile.age, profilename: profile.name, gender: profile.gender },
      validate: {
        age: (value) =>
          value < 2 || value > 9
            ? 'The app runs best for kids between 2-12 years old'
            : null,
      },
    });
  
    const onSubmit = async (values: {
      age: number;
      profilename: string;
      gender: string;
    }) => {
     
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
        } else {
          const res = await axios.put(
            '/api/profiles',
            {
              name: values.profilename,
              age: values.age,
              gender: values.gender,
                id: profile.id
            },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          window.location.href = '/profiles';
        }
      } catch (err) {
        alert('Error');
        console.log(err);
      }
    };
  
    return (
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          centered
  
        >
          <Center style={{ height: '100%' }}>
            <Card p="xl" color="orange.1">
              <Title align="center" className="text-title">
                Update profile
              </Title>
              <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <Paper p={30} mt={30} radius="md">
                  <input
                    type="text"
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    placeholder="Profile name"
                    required
                    {...form.getInputProps('profilename')}
                  />
                  <input
                    type="text"
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    placeholder="Profile name"
                    required
                    {...form.getInputProps('age')}
                  />
                  <Select
                    placeholder="Select Gender"
                    defaultValue="male"
                    data={['male', 'female']}
                    {...form.getInputProps('gender')}
                  />
                  <Center className="mt-5">
                    <ButtonPrimary type="submit">Update</ButtonPrimary>
                  </Center>
                </Paper>
              </form>
            </Card>
          </Center>
        </Modal>
      </>
    );
  }
  