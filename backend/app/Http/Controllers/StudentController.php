<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\StudentResource;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('student_list');

        $students = Student::search($request);

        return StudentResource::collection(
            $students->paginate(10),
        );
    }

    public function store(StoreStudentRequest $request)
    {
        Gate::authorize('student_create');

        Student::create($request->validated());

        return response()->json([
            'message' => 'Student created successfully',
        ], 201);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        Gate::authorize('student_edit');

        $student->update($request->validated());

        return response()->json([
            'message' => 'Student details updated successfully',
        ], 200);
    }

    public function show(Student $student)
    {
        Gate::authorize('student_show');

        return StudentResource::make($student);
    }

    public function destroy(Student $student)
    {
        Gate::authorize('student_delete');

        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully',
        ], 200);
    }
}
