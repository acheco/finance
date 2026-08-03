<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRecurringBillRequest extends FormRequest
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
            'account_id' => [
                'required',
                Rule::exists('accounts', 'id')->where('user_id', $this->user()->id),
            ],
            'category_id' => [
                'nullable',
                Rule::exists('categories', 'id')->where(function ($query) {
                    $query->where('user_id', $this->user()->id)->orWhereNull('user_id');
                }),
            ],
            'name' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'frequency' => ['required', Rule::in(['weekly', 'monthly', 'yearly'])],
            'due_day' => [
                'nullable',
                'integer',
                Rule::when($this->input('frequency') === 'weekly', ['min:1', 'max:7']),
                Rule::when($this->input('frequency') === 'monthly', ['min:1', 'max:31']),
            ],
        ];
    }
}
