import { Link } from '@inertiajs/react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import type { PaginationResponse } from '@/types';

interface PaginationProps {
  table: PaginationResponse<unknown>;
}

export default function Pagination({ table }: PaginationProps) {
  const currentPage = table.meta.current_page;
  const lastPage = table.meta.last_page;

  // Generar páginas a mostrar en móvil
  const getMobilePages = () => {
    const pages = new Set<number | string>();

    // Siempre mostrar primera página
    pages.add(1);

    // Siempre mostrar página actual
    pages.add(currentPage);

    // Siempre mostrar última página
    pages.add(lastPage);

    // Convertir a array y ordenar
    const pagesArray = Array.from(pages).sort((a, b) => Number(a) - Number(b));

    // Insertar ellipsis donde haya gaps
    const result: (number | string)[] = [];
    pagesArray.forEach((page, index) => {
      if (index > 0 && Number(page) - Number(pagesArray[index - 1]) > 1) {
        result.push('...');
      }
      result.push(page);
    });

    return result;
  };

  const mobilePages = getMobilePages();

  return (
    <div className="mt-6 flex items-center justify-between gap-1 sm:gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={!table.links.prev}
        asChild={!!table.links.prev}
        className="border-beige-500"
      >
        {table.links.prev ? (
          <Link
            href={table.links.prev}
            className="flex items-center gap-1 text-grey-500 sm:gap-2"
            preserveState
            preserveScroll
          >
            <CaretLeftIcon weight="fill" className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        ) : (
          <span className="flex items-center gap-1 text-grey-500 sm:gap-2">
            <CaretLeftIcon weight="fill" className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </span>
        )}
      </Button>

      {/* Page Numbers - Mobile (solo actual, primera, última) */}
      <div className="flex items-center gap-1 sm:hidden">
        {mobilePages.map((page, index) => {
          if (page === '...') {
            return (
              <Button
                variant="outline"
                size="icon"
                key={`ellipsis-${index}`}
                className="rounded-md border border-beige-500 px-2 text-grey-500"
              >
                ...
              </Button>
            );
          }

          const pageNumber = Number(page);
          const isActive = pageNumber === currentPage;
          const url = table.meta.links.find(
            (link) => link.label === String(pageNumber),
          )?.url;

          return (
            <Button
              key={pageNumber}
              variant={isActive ? 'default' : 'outline'}
              size="icon"
              asChild={!!url && !isActive}
              className="min-w-10 border-beige-500"
            >
              {url && !isActive ? (
                <Link href={url} preserveState preserveScroll>
                  {pageNumber}
                </Link>
              ) : (
                <span>{pageNumber}</span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Page Numbers - Desktop (todos) */}
      <div className="hidden items-center gap-2 sm:flex">
        {table.meta.links.map((link, index) => {
          // Saltar Previous y Next
          if (index === 0 || index === table.meta.links.length - 1) {
            return null;
          }

          // Manejar ellipsis
          if (link.label === '...') {
            return (
              <Button
                key={`ellipsis-${index}`}
                size="icon"
                variant="outline"
                className="rounded-md border border-beige-500 px-3 py-0.75 text-center text-grey-500"
              >
                ...
              </Button>
            );
          }

          return (
            <Button
              key={index}
              variant={link.active ? 'default' : 'outline'}
              size="icon"
              asChild={!!link.url && !link.active}
              className="border-beige-500"
            >
              {link.url && !link.active ? (
                <Link href={link.url} preserveState preserveScroll>
                  {link.label}
                </Link>
              ) : (
                <span>{link.label}</span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={!table.links.next}
        asChild={!!table.links.next}
        className="border-beige-500"
      >
        {table.links.next ? (
          <Link
            href={table.links.next}
            className="flex items-center gap-1 text-grey-500 sm:gap-2"
            preserveState
            preserveScroll
          >
            <span className="hidden sm:inline">Next</span>
            <CaretRightIcon weight="fill" className="h-4 w-4" />
          </Link>
        ) : (
          <span className="flex items-center gap-1 text-grey-500 sm:gap-2">
            <span className="hidden sm:inline">Next</span>
            <CaretRightIcon weight="fill" className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}
