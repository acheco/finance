import InputError from '@/components/input-error';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Spinner from '@/components/ui/Spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { Form, Head, Link } from '@inertiajs/react';

export default function Login({}) {
  return (
    <AuthLayout title="Login">
      <Head title="Logi" />

      <Form
        {...store.form()}
        resetOnSuccess={['password']}
        resetOnError={['password']}
        className="flex flex-col gap-6"
      >
        {({ errors, processing }) => (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoFocus
                tabIndex={1}
                autoComplete="email"
                name="email"
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoFocus
                tabIndex={1}
                autoComplete="password"
                name="password"
              />
            </div>

            <button
              disabled={processing}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-grey-900 p-4 text-sm font-bold text-white"
            >
              {processing && <Spinner />}
              Login
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-beige-500">
                Need to create an account?
              </span>
              <Link href={register()} className="text-sm font-bold underline">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  );
}
