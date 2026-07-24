import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
    headerAction,
}: {
    breadcrumbs?: BreadcrumbItemType[];
    headerAction?: ReactNode;
}) {
    return (
        <header className="flex h-16 max-w-265 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-between gap-2">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex items-center [&_li]:w-fit [&>ul]:w-fit">
                    <NavUser className="justify-between lg:hidden" />
                    {headerAction}
                </div>
            </div>
        </header>
    );
}
