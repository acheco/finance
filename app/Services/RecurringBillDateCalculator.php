<?php

namespace App\Services;

use Carbon\CarbonImmutable;
use InvalidArgumentException;

class RecurringBillDateCalculator
{
    public function __construct()
    {
        //
    }

    /**
     * Calcula la primera fecha de vencimiento al crear una factura recurrente.
     */
    public function first(CarbonImmutable $createdAt, string $frequency, ?int $dueDay): CarbonImmutable
    {
        return match ($frequency) {
            'weekly' => $this->nextWeekly($createdAt, $dueDay),
            'monthly' => $this->nextMonthly($createdAt, $dueDay),
            'yearly' => $this->nextYearly($createdAt),
            default => throw new InvalidArgumentException("Invalid frequency: {$frequency}"),
        };
    }

    private function nextWeekly(CarbonImmutable $from, ?int $dueDay): CarbonImmutable
    {
        if ($dueDay === null) {
            return $from->addWeek();
        }

        $date = $from->startOfWeek()->addDays($dueDay - 1);
        if ($date->lessThanOrEqualTo($from)) {
            $date = $date->addWeek();
        }

        return $date;
    }

    private function nextMonthly(CarbonImmutable $from, ?int $dueDay): CarbonImmutable
    {
        $day = $dueDay ?? $from->day;
        $date = $from->day(min($day, $from->daysInMonth));

        if ($date->lessThanOrEqualTo($from)) {
            $date = $this->addMonthClamped($from, $day);
        }

        return $date;
    }

    private function addMonthClamped(CarbonImmutable $from, ?int $dueDay): CarbonImmutable
    {
        $day = $dueDay ?? $from->day;
        $next = $from->addMonthNoOverflow();

        return $next->day(min($day, $next->daysInMonth));
    }

    private function nextYearly(CarbonImmutable $from): CarbonImmutable
    {
        return $from->lessThanOrEqualTo(now()) ? $from->addYear() : $from;
    }

    /**
     * Calcula la siguiente fecha de vencimiento a partir de la última generada.
     */
    public function next(CarbonImmutable $from, string $frequency, ?int $dueDay): CarbonImmutable
    {
        return match ($frequency) {
            'weekly' => $from->addWeek(),
            'monthly' => $this->addMonthClamped($from, $dueDay),
            'yearly' => $from->addYear(),
            default => throw new InvalidArgumentException("Invalid frequency: {$frequency}"),
        };
    }
}
