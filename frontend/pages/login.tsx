import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AuthenticationTitle() {
  const router = useRouter();
  const form = useForm({
    initialValues: { password: '', email: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Passeord not valid' : null),
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = event.target as any;
    const values = {
      email: email.value,
      password: password.value,
    };
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
  useEffect(() => {
    const func = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          window.location.href = '/profiles';
        }
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);
  return (
    <Layout>
      <div
        className="flex items-center justify-center"
        style={{ height: '95vh' }}
      >
        <div className="bg-color-lite rounded-lg p-5 shadow-lg">
          <p className="text-title mt-5 text-center">Login to your account</p>
          <p className="text-dimmed text-color mt-5 text-center text-sm">
            Do not have an account yet?{' '}
            <button
              className="text-orange-500"
              onClick={() => router.push('/signup')}
            >
              Create account
            </button>
          </p>
          <form onSubmit={(values) => onSubmit(values)}>
            <div className="rounded-md p-6">
              <label className="text-color mb-2 text-sm font-semibold">
                Email
              </label>
              <br />
              <input
                type="email"
                className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                placeholder="you@gmail.com"
                required
              />
              <br />
              <label className="text-color mb-2 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                placeholder="Your password"
                required
              />
              <Center mt="lg">
                <ButtonPrimary type="submit">Log in</ButtonPrimary>
              </Center>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
