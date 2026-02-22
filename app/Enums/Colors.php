<?php

namespace App\Enums;

enum Colors: string
{
    case GREEN = '#277C78';
    case YELLOW = '#F2CDAC';
    case CYAN = '#82C9D7';
    case NAVY = '#626070';
    case RED = '#C94736';
    case PURPLE = '#826CB0';
    case LIGHT_PINK = '#AF81BA';
    case ORANGE = '#F2994A';
    case TURQUOISE = '#597C7C';
    case BROWN = '#93674F';
    case MAGENTA = '#934F6F';
    case ARMY_GREEN = '#7F9161';
    case GOLDENROD = '#CAB361';
    case KHAKI = '#F2C94C';
    case TEAL = '#619393';
    case VIOLET = '#936F93';
    case OLIVE_GREEN = '#939361';
    case LIGHT_PURPLE = '#936193';
    case SANDY_BROWN = '#C99361';
    case LIGHT_BLUE = '#6193C9';
    case LIME_GREEN = '#93C961';
    case PINK = '#C96193';
    case SEA_GREEN = '#93C993';
    case YELLOW_GREEN = '#C9C961';
    case MAGENTA_PINK = '#C961C9';
    case TURQUOISE_BLUE = '#61C9C9';
    case BEIGE = '#C9C993';
    case SILVER = '#C9C9C9';
    case GRAY = '#616161';
    case CRIMSON = '#E63946';
    case STEEL_BLUE = '#457B9D';
    case POWDER_BLUE = '#A8DADC';
    case SANDY_ORANGE = '#F4A261';
    case BURNT_SIENNA = '#E76F51';
    case PERSIAN_GREEN = '#2A9D8F';
    case SAFFRON = '#E9C46A';
    case CHARCOAL = '#264653';
    case COPPER = '#8B5A3C';
    case ROYAL_PURPLE = '#6A4C93';
    case CORAL = '#FF6B6B';
    case AQUAMARINE = '#4ECDC4';
    case MUSTARD = '#FFE66D';
    case MINT = '#95E1D3';
    case LIGHT_CORAL = '#F38181';
    case LAVENDER = '#AA96DA';
    case BUBBLEGUM = '#FCBAD3';
    case SEAFOAM = '#A8E6CF';
    case PEACH = '#FFD3B6';
    case SALMON = '#FFAAA5';
    case ROSE = '#FF8B94';

    public static function list(): array
    {
        return array_map(fn ($case) => [
            'name' => $case->label(),
            'hex_code' => $case->value,
        ], self::cases());
    }

    public function label(): string
    {
        return match ($this) {
            self::GREEN => 'Green',
            self::YELLOW => 'Yellow',
            self::CYAN => 'Cyan',
            self::NAVY => 'Navy',
            self::RED => 'Red',
            self::PURPLE => 'Purple',
            self::LIGHT_PINK => 'Light Pink',
            self::ORANGE => 'Orange',
            self::TURQUOISE => 'Turquoise',
            self::BROWN => 'Brown',
            self::MAGENTA => 'Magenta',
            self::ARMY_GREEN => 'Army Green',
            self::GOLDENROD => 'Goldenrod',
            self::KHAKI => 'Khaki',
            self::TEAL => 'Teal',
            self::VIOLET => 'Violet',
            self::OLIVE_GREEN => 'Olive Green',
            self::LIGHT_PURPLE => 'Light Purple',
            self::SANDY_BROWN => 'Sandy Brown',
            self::LIGHT_BLUE => 'Light Blue',
            self::LIME_GREEN => 'Lime Green',
            self::PINK => 'Pink',
            self::SEA_GREEN => 'Sea Green',
            self::YELLOW_GREEN => 'Yellow Green',
            self::MAGENTA_PINK => 'Magenta Pink',
            self::TURQUOISE_BLUE => 'Turquoise Blue',
            self::BEIGE => 'Beige',
            self::SILVER => 'Silver',
            self::GRAY => 'Gray',
            self::CRIMSON => 'Crimson',
            self::STEEL_BLUE => 'Steel Blue',
            self::POWDER_BLUE => 'Powder Blue',
            self::SANDY_ORANGE => 'Sandy Orange',
            self::BURNT_SIENNA => 'Burnt Sienna',
            self::PERSIAN_GREEN => 'Persian Green',
            self::SAFFRON => 'Saffron',
            self::CHARCOAL => 'Charcoal',
            self::COPPER => 'Copper',
            self::ROYAL_PURPLE => 'Royal Purple',
            self::CORAL => 'Coral',
            self::AQUAMARINE => 'Aquamarine',
            self::MUSTARD => 'Mustard',
            self::MINT => 'Mint',
            self::LIGHT_CORAL => 'Light Coral',
            self::LAVENDER => 'Lavender',
            self::BUBBLEGUM => 'Bubblegum',
            self::SEAFOAM => 'Seafoam',
            self::PEACH => 'Peach',
            self::SALMON => 'Salmon',
            self::ROSE => 'Rose',
        };
    }
}
