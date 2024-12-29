<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;
use App\Http\Requests\StoreStudentRequest;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::paginate(10);

        return StudentResource::collection($students);
    }

    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());

        return response()->json([
            'message' => 'Student created successfully',
        ], 201);
    }
}
