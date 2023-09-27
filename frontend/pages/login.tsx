import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React,{useEffect} from 'react';

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
        if(token){
          window.location.href = '/profiles';
        } 
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);
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
        <div className="bg-color-lite p-5 rounded-lg shadow-lg">
          <p className="text-title text-center mt-5">Login to your account</p>
          <p className="text-dimmed text-sm text-center text-color mt-5">
            Do not have an account yet?{' '}
            <button
              className="text-orange-500"
              onClick={() => router.push('/signup')}
            >
              Create account
            </button>
          </p>
          <form onSubmit={(values) => onSubmit(values)}>
            <div className="p-6 rounded-md">
              <label className="text-color text-sm font-semibold mb-2">
                Email
              </label>
              <br />
              <input
                type="email"
                className="w-full input-border-color rounded-md py-2 px-3 text-color mb-4"
                placeholder="you@gmail.com"
                required
              />
              <br />
              <label className="text-color text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full input-border-color rounded-md py-2 px-3 text-color mb-4"
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
    </>
  );
}
