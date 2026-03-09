<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'type' => 'required|in:expense,income',
      'name' => 'required|string|max:255',
      'amount' => 'required|numeric|min:0.1',
      'category_id' => 'required|exists:categories,id',
      'date' => 'required|date',
    ];
  }
}
