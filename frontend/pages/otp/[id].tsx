import { useForm } from '@mantine/form';
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
  const onSubmit = (values: {
    i1: string;
    i2: string;
    i3: string;
    i4: string;
  }) => {
    const otp = values.i1 + values.i2 + values.i3 + values.i4;
    const { id } = router.query;
    console.log({ otp, id });
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email.</p>
            </div>
          </div>

          <div>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      required
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      {...form.getInputProps('i1')}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      required
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      {...form.getInputProps('i2')}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      required
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      {...form.getInputProps('i3')}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      required
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      {...form.getInputProps('i4')}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      type="submit"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{' '}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
