import { Head, Link, usePage } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  ChartBarIcon,
  ChartDonutIcon,
} from '@phosphor-icons/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
  canRegister = true,
}: {
  canRegister?: boolean;
}) {
  const { auth } = usePage().props;

  const { name } = usePage().props;

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-beige-100 pt-4 lg:justify-center">
        <header className="mb-6 w-full px-2 text-sm not-has-[nav]:hidden md:max-w-xl lg:max-w-4xl">
          <nav className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <AppLogoIcon />
              <h1 className="text-2xl font-bold md:text-4xl dark:text-grey-900">
                {name}
              </h1>
            </div>
            {auth?.user ? (
              <Link
                href={dashboard()}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                {canRegister && (
                  <Link
                    href={register()}
                    className="inline-block rounded-sm bg-grey-900 px-5 py-1.5 text-sm font-medium text-white hover:bg-black"
                  >
                    Get Stared
                  </Link>
                )}
              </div>
            )}
          </nav>
        </header>
        <div className="flex w-full justify-center lg:grow">
          <main className="px-8 xl:max-w-7xl xl:px-0">
            <div className="flex flex-col items-center justify-center gap-4 space-y-6 px-4 sm:py-20">
              <h2 className="text-center text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-6xl xl:text-7xl">
                Master your money <br /> with confidence
              </h2>
              <p className="max-w-lg text-center text-lg leading-8 text-beige-500 md:text-xl lg:text-2xl xl:text-2xl">
                Track expenses, save for goals, and invest wisely with our
                all-in-one personal finance platform designed for modern life.
              </p>
              {!auth?.user && (
                <Link
                  href={login()}
                  className="text-md inline-block rounded-full bg-grey-900 px-5 py-3 font-medium text-white hover:bg-black md:text-lg"
                >
                  Start Your Journey
                </Link>
              )}
            </div>
            <div className="mt-24 grid gap-6 px-4 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-3xl bg-grey-900 p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-beige-100 shadow-sm dark:bg-muted">
                  <ArrowsDownUpIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-medium text-white">
                  Track Transactions
                </h3>
                <p className="leading-relaxed text-beige-500">
                  Monitor every dollar in real-time. See exactly where your
                  money goes and make smarter decisions with instant insights
                  into your spending patterns.
                </p>
                <div className="absolute right-0 bottom-0 opacity-10 transition-opacity group-hover:opacity-20">
                  <ArrowsDownUpIcon className="-mr-8 -mb-8 h-32 w-32 text-beige-100" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl bg-grey-900 p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-beige-100 shadow-sm dark:bg-muted">
                  <ChartDonutIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-medium text-white">
                  Smart Budgets
                </h3>
                <p className="leading-relaxed text-beige-500">
                  Set limits that work for you. Create custom budgets for
                  different categories and get alerts before you overspend. Stay
                  in control, stress-free.
                </p>
                <div className="absolute right-0 bottom-0 opacity-10 transition-opacity group-hover:opacity-20">
                  <ChartDonutIcon className="-mr-8 -mb-8 h-32 w-32 text-beige-100" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl bg-grey-900 p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-beige-100 shadow-sm dark:bg-muted">
                  <ChartBarIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-medium text-white">
                  Savings Pots
                </h3>
                <p className="leading-relaxed text-beige-500">
                  Build your future, one pot at a time. Create dedicated savings
                  goals for vacations, emergencies, or dreams. Watch your money
                  grow with purpose.
                </p>
                <div className="absolute right-0 bottom-0 opacity-10 transition-opacity group-hover:opacity-20">
                  <ChartBarIcon className="-mr-8 -mb-8 h-32 w-32 text-beige-100" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
