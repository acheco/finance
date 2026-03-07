<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
      'amount' => $this->amount,
      'category' => (new CategoryResource($this->whenLoaded('category')))->resolve(),
      'date' => $this->date->format('d M Y'),
    ];
  }
}
