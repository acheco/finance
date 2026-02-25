import React from 'react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  title: string;
  children: React.ReactNode;
  classname?: string;
}

export default function Header({ title, classname ,children }: HeaderProps)  {
    return (
      <div className={cn("flex items-center justify-between", classname)}>
        <h1 className="text-[32px] leading-[120%] tracking-normal font-bold">{title}</h1>
        {children}
      </div>
    );

}
