import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Icon } from '@/components/ui/icon';
import type { EmptyBlockProps } from '@/types';

export default function EmptyBlock({
  title,
  description,
  iconName,
  children,
}: EmptyBlockProps) {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon name={iconName as never} size={24} weight="fill" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="xl" asChild>
          {children}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
