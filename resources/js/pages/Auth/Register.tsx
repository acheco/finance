import AuthLayout from "@/layouts/auth-layout";
import {Form, Link} from "@inertiajs/react";
import {store} from "@/routes/register";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import InputError from "@/components/input-error";
import Spinner from "@/components/ui/Spinner";
import {login} from "@/routes";

export default function Register() {
  return (
    <AuthLayout>
      <h1 className="font-bold text-3xl mb-6 leading-1.2">Sign Up</h1>
      <Form {...store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            resetOnError={['password', 'password_confirmation']}
            disableWhileProcessing

      >
        {({errors, processing}) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  name="name"
                  placeholder="Full Name"
                />
                <InputError message={errors.name} className="mt-2"/>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  name="email"
                  placeholder="jdoe@finance.com"
                />
                <InputError message={errors.email} className="mt-2"/>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  tabIndex={3}
                  name="password"
                  placeholder="Password"
                />
                <InputError message={errors.password} className="mt-2"/>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Password Confirmation</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  required
                  tabIndex={4}
                  name="password_confirmation"
                  placeholder="Confirm Password"
                />
                <InputError message={errors.password_confirmation} className="mt-2"/>
              </div>

              <button className="bg-grey-900 text-white font-bold text-sm rounded-md p-4 cursor-pointer">
                {processing && <Spinner/>}
                Create Account
              </button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-beige-500">Already have an account?</span>
                <Link href={login()} className="underline font-bold text-sm">Login</Link>
              </div>

            </div>
          </>
        )}


      </Form>
    </AuthLayout>
  )
}
