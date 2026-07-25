<?php

namespace App\Http\Requests;

use App\Models\Transfer;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTransferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Transfer::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from_account_id' => ['required', 'different:to_account_id', Rule::exists('accounts', 'id')->where('user_id', $this->user()->id)],
            'to_account_id' => ['required', Rule::exists('accounts', 'id')->where('user_id', $this->user()->id)],
            'amount' => ['required', 'numeric', 'gt:0'],
            'date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ];
    }
}
