import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon as PhosphorIconType, IconProps } from "@phosphor-icons/react";

type IconName = Extract<keyof typeof PhosphorIcons, string>;

interface DynamicIconProps extends IconProps {
    name: string;
    fallback?: PhosphorIconType;
}

function isValidIconName(name: string): name is IconName {
    return name in PhosphorIcons;
}

export function DynamicIcon({
                                name,
                                fallback = PhosphorIcons.QuestionIcon,
                                ...iconProps
                            }: DynamicIconProps) {
    const IconComponent = isValidIconName(name)
        ? (PhosphorIcons[name] as PhosphorIconType)
        : fallback;

    return <IconComponent {...iconProps} />;
}
