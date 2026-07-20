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

    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;
    const pageLinks = numberLinks.filter((link) => link.page != null);

    const mobileNumberLinks: ((typeof numberLinks)[number] | null)[] = (() => {
        if (lastPage <= 3) {
            return pageLinks;
        }

        const leftPages =
            currentPage <= 2 ? [1, 2] : [currentPage - 1, currentPage];
        const pageNumbers = Array.from(new Set([...leftPages, lastPage])).sort(
            (a, b) => a - b,
        );

        return pageNumbers.reduce<((typeof numberLinks)[number] | null)[]>(
            (result, page, index) => {
                if (index > 0 && page - pageNumbers[index - 1] > 1) {
                    result.push(null);
                }

                const link = pageLinks.find((l) => l.page === page);

                if (link) {
                    result.push(link);
                }

                return result;
            },
            [],
        );
    })();

    const linkClass = (link: (typeof links)[number]) =>
        cn(
            'relative inline-flex h-10 w-10 items-center justify-center rounded-md preset-4 text-gray-900 ring-1 ring-beige-500 ring-inset hover:bg-beige-500 hover:text-white',
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
                'gap-auto mx-auto flex w-full items-center justify-between',
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
                className={cn(
                    linkClass(prevLink),
                    'group items-center md:w-24 md:justify-evenly',
                )}
                disabled={!prevLink.url}
            >
                <CaretLeftIcon
                    className="h-4 w-4 text-grey-500 group-hover:text-white"
                    weight="fill"
                />
                <span className="hidden preset-4 group-hover:text-white md:block">
                    Prev
                </span>
            </Link>

            {/* Grouped numbers (desktop) */}
            <ul className="hidden items-center gap-2 sm:flex">
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

            {/* Grouped numbers (mobile, truncated) */}
            <ul className="flex items-center gap-2 sm:hidden">
                {mobileNumberLinks.map((link, index) =>
                    link === null ? (
                        <li key={`ellipsis-${index}`}>
                            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm preset-4 text-gray-900 ring-1 ring-beige-500">
                                ...
                            </span>
                        </li>
                    ) : (
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
                    ),
                )}
            </ul>

            {/* Next */}
            <Link
                href={nextLink.url || '#'}
                preserveState
                preserveScroll
                onClick={handleClick(nextLink)}
                className={cn(
                    linkClass(nextLink),
                    'group items-center justify-evenly md:w-24',
                )}
            >
                <span className="hidden preset-4 group-hover:text-white md:block">
                    Next
                </span>
                <CaretRightIcon
                    className="h-4 w-4 text-grey-500 group-hover:text-white"
                    weight="fill"
                />
            </Link>
        </div>
    );
}
