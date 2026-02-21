import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({ children }: AuthLayoutProps) {
  const { name } = usePage().props;

  return (
    <div className="grid h-screen lg:grid-cols-2 xl:grid-cols-[560px_1fr]">
      <div className="m-5 hidden rounded-lg bg-grey-900 p-10 text-white lg:flex lg:flex-col lg:content-between dark:border-r">
        <Link href={home()} className="flex items-center text-lg font-medium">
          <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
          {name}
        </Link>

        <AppLogo className="my-auto w-full" />

        <div className="space-y-6">
          <h2 className="text-[32px] leading-[1.2] font-bold tracking-normal">
            Keep track of your money and save for your future
          </h2>
          <p className="text-sm leading-[150%] tracking-normal">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <div className="">
        <header className="rounded-b-lg bg-grey-900 px-10 py-6 text-center text-3xl font-bold text-white lg:hidden">
          {name}
        </header>
        <div className="flex h-full w-full items-center justify-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
