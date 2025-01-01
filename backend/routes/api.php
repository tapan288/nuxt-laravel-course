<?php

use Illuminate\Http\Request;
use App\Http\Middleware\AuthGates;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;

Route::group(['middleware' => ['auth:sanctum', AuthGates::class]], function () {
    Route::get('/user', function (Request $request) {
        return UserResource::make($request->user());
    });

    Route::apiResource('students', StudentController::class);
    Route::get('units', UnitController::class);
    Route::get('sections', SectionController::class);
});
