<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('employee', EmployeeController::class)->only(['index', 'show', 'store', 'update', 'destroy', 'count']);

Route::post('register', [AuthController::class, 'register']);
Route::post('count', [AuthController::class, 'count']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Route::get('/', function () {
//     return "API";
// });

