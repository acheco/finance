import AuthLayout from "@/layouts/auth-layout";
import {Form, Head, Link} from "@inertiajs/react";
import {store} from "@/routes/login";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import InputError from "@/components/input-error";
import Spinner from "@/components/ui/Spinner";
import {register} from "@/routes";

export default function Login({}) {
  return (
    <AuthLayout title="Login">

      <Head title="Logi"/>

      <Form {...store.form()}
            resetOnSuccess={['password']}
            resetOnError={['password']}
            className="flex flex-col gap-6"
      >
        {({errors, processing}) => (
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
              <InputError message={errors.email} className="mt-2"/>
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
              <InputError message={errors.email} className="mt-2"/>
            </div>

            <button
              disabled={processing}
              className="bg-grey-900 flex items-center justify-center gap-2 text-white font-bold text-sm rounded-md p-4 cursor-pointer"
            >
              {processing && <Spinner/>}
              Login
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-beige-500">Need to create an account?</span>
              <Link href={register()} className="underline font-bold text-sm">Sign Up</Link>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
