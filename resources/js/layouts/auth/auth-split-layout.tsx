import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import AuthImage from '@/components/AuthImage';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <div className="flex items-center justify-center rounded-b-lg bg-grey-900 px-10 py-6 lg:hidden">
                <AppLogoIcon />
            </div>
            <div className="relative grid h-dvh grid-cols-1 flex-col items-center justify-center bg-beige-100 px-4 sm:px-0 lg:max-w-none lg:grid-cols-[450px_1fr] lg:px-0 xl:grid-cols-[600px_1fr]">
                <div className="relative hidden h-full max-w-150 flex-col bg-muted p-15 text-white lg:flex dark:border-r">
                    <div className="absolute inset-5 overflow-hidden rounded-md bg-grey-900">
                        <AuthImage />
                    </div>

                    <Link
                        href={home()}
                        className="relative z-20 flex items-center text-lg font-medium"
                    >
                        <AppLogoIcon className="mr-2 fill-current text-white" />
                    </Link>

                    <div className="relative z-20 mt-auto">
                        <div className="space-y-6">
                            <p className="preset-1 text-white">
                                Keep track of your money and save for your
                                future
                            </p>
                            <p className="preset-4 text-white">
                                Personal finance app puts you in control of your
                                spending. Track transactions, set budgets, and
                                add to savings pots easily.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:px-10 lg:px-0">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-140 lg:w-112.5 xl:w-140">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
