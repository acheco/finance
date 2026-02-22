<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'target_amount' => $this->target_amount,
            'total_amount' => $this->total_amount,
            'theme' => $this->theme,
            'percentage' => $this->target_amount > 0 ? ($this->total_amount / $this->target_amount) * 100 : 0,
        ];
    }
}
