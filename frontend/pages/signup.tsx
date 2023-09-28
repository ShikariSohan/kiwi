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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
          style={{
            height: '89vh',
            backgroundImage: 'url("/assets/signup.gif")', // Your background image URL
            backgroundSize: 'auto 80%', // Auto width, full height
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
          }}
        >
          <div
            className="mt-5 rounded-lg p-10 shadow-lg"
            style={{ backgroundColor: '#FFF' }}
          >
            <p className="text-title mt-5 text-center">Create a new account</p>
            <form onSubmit={(values) => onSubmit(values)}>
              <div className="rounded-md p-6">
                <label className="text-color mb-2 text-sm font-semibold">
                  Username
                </label>
                <br />
                <input
                  type="text"
                  className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                  placeholder="your name"
                  required
                  {...form.getInputProps('username')}
                />

                <label className="text-color mb-2 text-sm font-semibold">
                  Email
                </label>
                <br />
                <input
                  type="email"
                  className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                  placeholder="you@gmail.com"
                  required
                  {...form.getInputProps('email')}
                />

                <label className="text-color mb-2 text-sm font-semibold">
                  Password
                </label>
                <br />
                <input
                  type="password"
                  className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
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
