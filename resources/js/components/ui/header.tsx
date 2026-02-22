import React from 'react';

type HeaderProps = {
  title: string,
    children: React.ReactNode;
}

export default function Header({ title, children }: HeaderProps)  {
    return (
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] leading-[120%] tracking-normal font-bold">{title}</h1>
        {children}
      </div>
    );

}
