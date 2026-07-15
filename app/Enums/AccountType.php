<?php

namespace App\Enums;

enum AccountType: string
{
    case Cash = 'cash';
    case Bank = 'bank';
    case Credit = 'credit_card';
    case Debit = 'debit_card';
    case Investment = 'investment';

    public function label(): string
    {
        return match ($this) {
            self::Cash => 'Cash',
            self::Bank => 'Bank',
            self::Credit => 'Credit Card',
            self::Debit => 'Debit Card',
            self::Investment => 'Investment',
        };
    }
}
