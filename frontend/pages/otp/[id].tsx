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
        style={{
          height: '89vh',
          backgroundImage: 'url("/assets/otp.gif")', // Your background image URL
          backgroundSize: 'auto 50%', // Auto width, full height
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px bottom',
        }}
      >
        <div
          className="rounded-lg p-10 shadow-lg"
          style={{ backgroundColor: '#FFF' }}
        >
          <p className="text-title mt-10 text-center">Email Verification</p>
          <Center>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email.</p>
            </div>
          </Center>

          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <div className="mt-10 flex flex-col space-y-16">
              <div className="mx-auto flex w-full flex-row items-center justify-between">
                <div className="mx-5 h-16 w-16">
                  <input
                    required
                    className="input-border-color bg-white flex h-full w-full flex-col items-center justify-center rounded-xl px-5 text-center text-lg outline-none"
                    {...form.getInputProps('i1')}
                  />
                </div>
                <div className="mx-5 h-16 w-16">
                  <input
                    required
                    className="input-border-color bg-white flex h-full w-full flex-col items-center justify-center rounded-xl px-5 text-center text-lg outline-none"
                    {...form.getInputProps('i2')}
                  />
                </div>
                <div className="mx-5 h-16 w-16">
                  <input
                    required
                    className="input-border-color bg-white flex h-full w-full flex-col items-center justify-center rounded-xl px-5 text-center text-lg outline-none"
                    {...form.getInputProps('i3')}
                  />
                </div>
                <div className="mx-5 h-16 w-16">
                  <input
                    required
                    className="input-border-color bg-white flex h-full w-full flex-col items-center justify-center rounded-xl px-5 text-center text-lg outline-none"
                    {...form.getInputProps('i4')}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <Center>
                  <ButtonPrimary type="submit">Verify Account</ButtonPrimary>
                </Center>

                <p className="text-dimmed text-color mt-5 text-center text-sm">
                  Did not receive the code?{' '}
                  <button className="text-orange-500" onClick={resendCode}>
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
