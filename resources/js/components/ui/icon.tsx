import * as PhosphorIcons from '@phosphor-icons/react';
import type React from 'react';

type IconName = keyof typeof PhosphorIcons;

type IconWeight = 'thin' | 'light' | 'regular' | 'fill' | 'bold' | 'duotone'

interface IconProps {
  name: string;
  size?: string | number;
  color?: string;
  weight?: IconWeight;
  mirrored?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 24, color, weight = 'bold', mirrored = false, className, style }: IconProps) {

  // const IconComponent = PhosphorIcons[name] as PhosphorIcon | undefined;

  const IconComponent = (PhosphorIcons as any)[name];

  if (!IconComponent) {
    console.error(`Icon not found: ${name}`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      weight={weight}
      mirrored={mirrored}
      className={className}
      style={style}
    />
  );

}

