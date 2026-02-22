<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pot extends Model
{
    protected $fillable = [
        'theme',
        'name',
        'target_amount',
        'total_amount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo('User');
    }
}
