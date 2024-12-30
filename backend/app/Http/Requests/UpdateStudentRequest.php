<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:students,email,' . $this->student->id],
            'unit_id' => ['required', 'integer', 'exists:units,id'],
            'section_id' => ['required', 'integer', 'exists:sections,id'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'student name',
            'email' => 'student email',
            'unit_id' => 'unit',
            'section_id' => 'section',
        ];
    }
}
