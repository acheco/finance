<?php

namespace App\Models;

use Database\Factories\TransactionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
  /** @use HasFactory<TransactionFactory> */
  use HasFactory;

  protected $fillable = [
    'name',
    'amount',
    'type',
    'date',
    'category_id',
    'is_recurring',
  ];

  protected $casts = [
    'date' => 'date',
    'amount' => 'float',
    'is_recurring' => 'boolean',
  ];

  /**
   * Register a model event listener for the `creating` event.
   * Ensures that the `amount` attribute is always stored as a negative value
   * for transactions of type 'expense' and as a positive value for other types.
   */
  protected static function booted(): void
  {
    static::creating(function (Transaction $transaction) {
      if ($transaction->type === 'expense') {
        $transaction->amount = -abs($transaction->amount);
      } else {
        $transaction->amount = abs($transaction->amount);
      }
    });
  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
