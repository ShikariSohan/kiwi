import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
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
import axios from 'axios';
import React from 'react';

export default function AuthenticationTitle() {
  const form = useForm({
    initialValues: { password: '', email: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Passeord not valid' : null),
    },
  });

  const onSubmit = async (values: { password: string; email: string }) => {
    try {
      const res = await axios.post('/api/login', values);
      const { token } = res.data;
      localStorage.setItem('token', token);
      window.location.href = '/profiles';
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };
  return (
    <Layout>
      <Center style={{ height: '100%' }} className="bg-color">
        <Card p="xl" color="orange.1">
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Paper p={30} mt={30} radius="md">
              <TextInput
                label="Email"
                placeholder="you@gmail.com"
                required
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
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <ButtonPrimary type="submit">Sign in</ButtonPrimary>
            </Paper>
          </form>
        </Card>
      </Center>
    </Layout>
  );
}
