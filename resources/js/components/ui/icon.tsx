import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';
import type React from 'react';

type IconName = keyof typeof PhosphorIcons;

type IconWeight = 'thin' | 'light' | 'regular' | 'fill' | 'bold' | 'duotone'

interface IconProps {
  name: IconName;
  size?: string | number;
  color?: string;
  weight?: IconWeight;
  mirrored?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 24, color, weight = 'bold', mirrored = false, className, style }: IconProps) {

  const IconComponent = PhosphorIcons[name] as PhosphorIcon;

  if (!IconComponent) {

    console.warn(`Icon "${name}" not found in Phosphor Icons`);

    const QuestionIcon = PhosphorIcons.QuestionIcon;

    return (
      <QuestionIcon
        size={size}
        color={color || '#999'}
        weight={weight}
        mirrored={mirrored}
        className={className}
        style={style}
      />
    );
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
