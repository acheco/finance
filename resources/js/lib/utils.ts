import type { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
  return typeof url === 'string' ? url : url.url;
}

export function isSameUrl(
  url1: NonNullable<InertiaLinkProps['href']>,
  url2: NonNullable<InertiaLinkProps['href']>,
) {
  return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
  return typeof url === 'string' ? url : url.url;
}

export function currencyFormat(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // Si hay 5 o menos páginas, muéstralas todas
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  // Si estás cerca del inicio (ej. página 1, 2 o 3)
  if (currentPage <= 2) {
    return [0, 1, 2, '...', totalPages - 1];
  }

  if (currentPage >= totalPages - 3) {
    return [0, '...', totalPages - 3, totalPages - 2, totalPages - 1];
  }

  return [
    0,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages - 1,
  ];
};

export const generateFixedPagination = (
  currentPage: number,
  totalPages: number,
) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const firstPage = 0;
  const lastPage = totalPages - 1;

  if (currentPage < totalPages / 2) {
    const dynamicPage = currentPage <= 1 ? 1 : currentPage;
    return [firstPage, dynamicPage, '...', lastPage];
  } else {
    const dynamicPage =
      currentPage >= lastPage - 1 ? lastPage - 1 : currentPage;
    return [firstPage, '...', dynamicPage, lastPage];
  }
};

export const generateResponsivePagination = (
  currentPage: number,
  totalPages: number,
  maxVisible: number,
) => {
  // Si caben todas las páginas en la pantalla actual, las mostramos todas sin puntos
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const firstPage = 0;
  const lastPage = totalPages - 1;

  const dynamicSlots = maxVisible - 3;

  if (currentPage < totalPages / 2) {
    const startDynamic = Math.max(1, currentPage);
    const dynamicPages = Array.from(
      { length: dynamicSlots },
      (_, i) => startDynamic + i,
    );

    return [firstPage, ...dynamicPages, '...', lastPage];
  } else {
    const endDynamic = Math.min(lastPage - 1, currentPage);
    const startDynamic = endDynamic - dynamicSlots + 1;
    const dynamicPages = Array.from(
      { length: dynamicSlots },
      (_, i) => startDynamic + i,
    );

    return [firstPage, '...', ...dynamicPages, lastPage];
  }
};
