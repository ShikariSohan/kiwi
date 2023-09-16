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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from 'flowbite-react';

import React from 'react';

export default function ProfileForm() {
  const form = useForm({
    initialValues: { age: 2, profilename: '' },
    validate: {
      age: (value) =>
        value < 2 || value > 8
          ? 'The app runs best for kids between 2-8 years old'
          : null,
    },
  });

  const onSubmit = (values: { age: number; profilename: string }) => {
    console.log({ values });
    //redirect to otp/[id] route after that
  };
  return (
    <BackgroundImage src="bg.jpg" style={{ height: '100vh', width: '100vw' }}>
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
    </BackgroundImage>
  );
}
