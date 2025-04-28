<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::POST('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::POST('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
Route::get('/user', [App\Http\Controllers\AuthController::class, 'getUser']);

Route::prefix('form-schema')->group(function () {
    Route::get('/fasum', [App\Http\Controllers\AdminFasumController::class, 'getFormSchema']);
});

Route::prefix('get')->name('get.')->group(function () {
    Route::GET('/jenis', [App\Http\Controllers\HomeController::class, 'getJenis']);
    Route::GET('/fasum/paginate', [App\Http\Controllers\HomeController::class, 'getFasumWithPaginate']);
    Route::GET('/count/fasum', [App\Http\Controllers\HomeController::class, 'countTempatPerJenis']);
});

Route::prefix('fasum')->name('fasum.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminFasumController::class, 'json']);
    Route::POST('/store', [App\Http\Controllers\AdminFasumController::class, 'store']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminFasumController::class, 'update']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminFasumController::class, 'delete']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminFasumController::class, 'find']);
});

Route::prefix('map')->name('map.')->group(function () {
    Route::GET('/get/fasum', [App\Http\Controllers\MapPublicController::class, 'getFasumAll']);
    Route::GET('/filter/jenis/{:id}', [App\Http\Controllers\MapPublicController::class, 'getFilteredFasum']);
    Route::GET('/calculate/time', [App\Http\Controllers\MapPublicController::class, 'calculateTravelTime']);
    Route::GET('/calculate/route', [App\Http\Controllers\MapPublicController::class, 'calculateAstar']);

});
