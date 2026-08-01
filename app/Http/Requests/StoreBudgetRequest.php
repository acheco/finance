<?php

namespace App\Http\Requests;

use App\Models\Budget;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Budget::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'exists:users,id',
            'category_id' => 'required|exists:categories,id|unique:budgets,category_id,NULL,id,user_id,'.$this->user()->id,
            'maximum' => 'required|numeric|gt:0',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.unique' => 'This budget already exists for the selected category. Please choose a different category.',
        ];
    }
}
