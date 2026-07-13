import { Link } from '@inertiajs/react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { PaginationMeta } from '@/types/pagination';

type Props = {
    pagination?: PaginationMeta;
    className?: string;
};

export default function DataTablePagination({ pagination, className }: Props) {
    if (!pagination) {
        return null;
    }

    const links = pagination.links;
    const prevLink = links[0];
    const nextLink = links[links.length - 1];
    const numberLinks = links.slice(1, -1);

    const linkClass = (link: (typeof links)[number]) =>
        cn(
            'relative inline-flex items-center justify-center rounded-md bg-white px-4 py-2 preset-4 text-gray-900 ring-1 ring-beige-500 ring-inset hover:bg-beige-500 hover:text-white',
            link.active
                ? 'z-10 bg-grey-900 text-white ring-grey-900 hover:bg-grey-900'
                : 'hover:bg-none',
            !link.url && 'cursor-not-allowed opacity-50',
        );

    const handleClick =
        (link: (typeof links)[number]) => (e: React.MouseEvent) => {
            if (!link.url) {
                e.preventDefault();
            }
        };

    return (
        <div
            className={cn(
                'mx-auto flex w-full items-center justify-between gap-4',
                className,
            )}
            aria-label="Pagination"
            role="navigation"
        >
            {/* Previous */}
            <Link
                href={prevLink.url || '#'}
                preserveState
                preserveScroll
                onClick={handleClick(prevLink)}
                className={cn(linkClass(prevLink), 'group')}
                disabled={!prevLink.url}
            >
                <span className="preset-4 group-hover:text-white">Prev</span>
                <CaretLeftIcon
                    className="h-4 w-4 text-grey-500 group-hover:text-white"
                    weight="fill"
                />
            </Link>

            {/* Grouped numbers */}
            <ul className="flex items-center gap-2">
                {numberLinks.map((link, index) => (
                    <li key={`${link.label}-${index}`}>
                        <Link
                            href={link.url || '#'}
                            preserveState
                            preserveScroll
                            onClick={handleClick(link)}
                            className={linkClass(link)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>

            {/* Next */}
            <Link
                href={nextLink.url || '#'}
                preserveState
                preserveScroll
                onClick={handleClick(nextLink)}
                className={cn(linkClass(nextLink), 'group')}
            >
                <span className="preset-4 group-hover:text-white">Next</span>
                <CaretRightIcon
                    className="h-4 w-4 text-grey-500 group-hover:text-white"
                    weight="fill"
                />
            </Link>
        </div>
    );
}
