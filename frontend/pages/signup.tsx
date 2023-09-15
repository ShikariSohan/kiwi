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
  Button,
  BackgroundImage,
  Center,
  Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import React from 'react';

export default function AuthenticationTitle() {
  const form = useForm({
    initialValues: { password: '', email: '', username: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      username: (value) =>
        value.length === 0 ? 'Please fill up the field' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Passeord not valid' : null),
    },
  });

  const onSubmit = (values: { password: string; email: string }) => {
    console.log({ values });
    //redirect to otp/[id] route after that
  };
  return (
    <BackgroundImage src="bg.jpg" style={{ height: '100vh', width: '100vw' }}>
      <Center style={{ height: '100%' }}>
        <Card p="xl" color="orange.1">
          <Title align="center" sx={(theme) => ({ fontFamily: `Caveat` })}>
            Kiwi
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Paper p={30} mt={30} radius="md">
              <TextInput
                label="Username"
                placeholder="your name"
                required
                {...form.getInputProps('username')}
              />
              <TextInput
                label="Email"
                placeholder="you@gmail.com"
                required
                mt="md"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps('password')}
              />
              <Group position="apart" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </Paper>
          </form>
        </Card>
      </Center>
    </BackgroundImage>
  );
}
