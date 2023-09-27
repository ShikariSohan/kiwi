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
import Head from 'next/head';
import router from 'next/router';
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

  const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [username, email, password] = event.target as any;
    const values = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    try {
      const res = await axios.post('/api/register', values);
      window.location.href = `/otp/${res.data.id}`;
    } catch (err) {
      alert('Error');
      console.log(err);
    }

    //redirect to otp/[id] route after that
  };
  return (
    <>
    <Head>
    <title>Sign In | Kiwi</title>
   </Head>
    <Layout>
      <div
        className="flex items-center justify-center"
        style={{ height: '95vh' }}
      >
        <div className="bg-color-lite p-10 mt-5 rounded-lg shadow-lg">
          <p className="text-title text-center mt-5">Create a new account</p>
          <form onSubmit={(values) => onSubmit(values)}>
            <div className="p-6 rounded-md">
              <label className="text-color text-sm font-semibold mb-2">
                Username
              </label>
              <br />
              <input
                type="text"
                className="w-full input-border-color rounded-md py-2 px-3 text-color mb-4"
                placeholder="your name"
                required
                {...form.getInputProps('username')}
              />

              <label className="text-color text-sm font-semibold mb-2">
                Email
              </label>
              <br />
              <input
                type="email"
                className="w-full input-border-color rounded-md py-2 px-3 text-color mb-4"
                placeholder="you@gmail.com"
                required
                {...form.getInputProps('email')}
              />

              <label className="text-color text-sm font-semibold mb-2">
                Password
              </label>
              <br />
              <input
                type="password"
                className="w-full input-border-color rounded-md py-2 px-3 text-color mb-4"
                placeholder="Your password"
                required
                {...form.getInputProps('password')}
              />
              <Center mt="lg">
                <ButtonPrimary type="submit">Create</ButtonPrimary>
              </Center>
            </div>
          </form>
        </div>
      </div>
    </Layout>
    </>
  );
}
