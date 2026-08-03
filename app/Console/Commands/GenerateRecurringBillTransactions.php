<?php

namespace App\Console\Commands;

use App\Models\RecurringBill;
use App\Models\Transaction;
use App\Services\RecurringBillDateCalculator;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

#[Signature('bills:generate')]
#[Description('Command description')]
class GenerateRecurringBillTransactions extends Command
{
    protected $signature = 'bills:generate';

    protected $description = 'Generate recurring bill transactions';

    public function __construct(
        private readonly RecurringBillDateCalculator $dateCalculator,
    ) {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $processed = 0;

        RecurringBill::query()
            ->where('next_due_date', '<=', now()->toDateString())
            ->chunkById(100, function ($bills) use (&$processed) {
                foreach ($bills as $bill) {
                    DB::transaction(function () use ($bill) {
                        Transaction::create([
                            'user_id' => $bill->user_id,
                            'account_id' => $bill->account_id,
                            'category_id' => $bill->category_id,
                            'recurring_bill_id' => $bill->id,
                            'recipient' => $bill->name,
                            'amount' => $bill->amount,
                            'type' => 'expense',
                            'date' => $bill->next_due_date,
                        ]);

                        $bill->update([
                            'next_due_date' => $this->dateCalculator->next(
                                $bill->next_due_date,
                                $bill->frequency,
                                $bill->due_day
                            ),
                        ]);
                    });

                    $processed++;
                }
            });

        $this->info("Processed {$processed} recurring bills.");

        return self::SUCCESS;
    }
}
