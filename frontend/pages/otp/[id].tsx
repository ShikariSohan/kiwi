import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function OTP() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      i1: '',
      i2: '',
      i3: '',
      i4: '',
    },
  });
  const onSubmit = async (values: {
    i1: string;
    i2: string;
    i3: string;
    i4: string;
  }) => {
    const otp = values.i1 + values.i2 + values.i3 + values.i4;
    const { id } = router.query;
    try {
      const res = await axios.post('/api/verify', { code: otp, id });
      window.location.href = '/login';
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };
  const resendCode = async () => {
    const { id } = router.query;
    try {
      const res = await axios.post('/api/resend', { id });
      alert('Code sent');
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };
  return (
    <Layout>
      <div
        className="flex items-center justify-center"
        style={{ height: '90vh' }}
      >
        <div className="bg-color-lite p-10 rounded-lg shadow-lg">
          <p className="text-title text-center mt-10">Email Verification</p>
          <Center>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email.</p>
            </div>
          </Center>

          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <div className="flex flex-col space-y-16 mt-10">
              <div className="flex flex-row items-center justify-between mx-auto w-full">
                <div className="w-16 h-16 mx-5">
                  <input
                    required
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl input-border-color text-lg bg-white"
                    {...form.getInputProps('i1')}
                  />
                </div>
                <div className="w-16 h-16 mx-5">
                  <input
                    required
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl input-border-color text-lg bg-white"
                    {...form.getInputProps('i2')}
                  />
                </div>
                <div className="w-16 h-16 mx-5">
                  <input
                    required
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl input-border-color text-lg bg-white"
                    {...form.getInputProps('i3')}
                  />
                </div>
                <div className="w-16 h-16 mx-5">
                  <input
                    required
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl input-border-color text-lg bg-white"
                    {...form.getInputProps('i4')}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <Center>
                  <ButtonPrimary type="submit">Verify Account</ButtonPrimary>
                </Center>

                <p className="text-dimmed text-sm text-center text-color mt-5">
                  Did not receive the code?{' '}
                  <button
                    className="text-orange-500"
                    onClick={resendCode}
                  >
                    Resend code
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
