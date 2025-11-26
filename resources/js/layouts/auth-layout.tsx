import {Link, usePage} from "@inertiajs/react";
import AppLogoIcon from "@/components/app-logo-icon";
import {SharedData} from "@/types";
import {home} from "@/routes";

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({title, children}: AuthLayoutProps) {

  const {name} = usePage<SharedData>().props;

  return (
    <div
      className="relative grid h-dvh flex-col bg-beige-100 items-start lg:items-center sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <header
        className="flex items-center justify-center h-16 bg-grey-900 text-white font-bold text-3xl rounded-b-lg lg:hidden">
        <h1>Finance</h1>
      </header>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900"/>
        <Link
          href={home()}
          className="relative z-20 flex items-center text-lg font-medium"
        >
          <AppLogoIcon className="mr-2 size-8 fill-current text-white"/>
          {name}
        </Link>

        <div className="z-20 flex h-full items-center justify-center">
          <img src="/logo.svg" alt="Spendova Logo Icon"/>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-3xl font-bold">
              Keep track of your money and save for your future
            </p>
            <footer className="text-sm text-neutral-300">
              <p>
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </footer>
          </blockquote>
        </div>
      </div>

      <main className="w-[343px] sm:w-[425px] mx-auto ">
        <div className="w-full flex-1 p-8 bg-white rounded-lg">
          <h1 className="font-bold text-3xl mb-6 leading-1.2">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  )
}
