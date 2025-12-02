import { getInitials } from '@/lib/utils';
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarPrimitive,
} from '@radix-ui/react-avatar';
import { ComponentProps } from 'react';

interface AvatarProps extends ComponentProps<typeof AvatarPrimitive> {
  src?: string;
  alt: string;
  fallback: string;
}
export default function Avatar({ src, alt, fallback, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive {...props}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-beige-100 text-grey-900">
        {getInitials(fallback)}
      </AvatarFallback>
    </AvatarPrimitive>
  );
}
