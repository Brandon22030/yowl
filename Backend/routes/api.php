<?php

// use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CategoriesController as ControllersCategoriesController;
use App\Http\Controllers\CommentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Authentification routes

// Public routes
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/users', [UserController::class, 'index']);

Route::post('/users', [UserController::class, 'store']);

Route:: get('/users/{id}/posts', [UserController::class, 'showUserPosts']);


// Authentification routes
Route::get('/categories', [ControllersCategoriesController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'show']);
    
Route::put('/users/{id}', [UserController::class, 'update']);

Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/users/{id}/posts', [UserController::class, 'showUserPosts']);

Route::get('/users/{id}/comments', [UserController::class, 'getCommentsByUser']);

Route::get('/categories/{id}', [ControllersCategoriesController::class, 'show']);

Route::get('/categories/{id}/posts', [ControllersCategoriesController::class, 'showPosts']);

Route::post('/categories', [ControllersCategoriesController::class, 'store']);

Route::put('/categories/{id}', [ControllersCategoriesController::class, 'update']);

Route::delete('/categories/{id}', [ControllersCategoriesController::class, 'destroy']);

// Posts CRUD routes

Route::get('/posts', [PostsController::class, 'index']);

Route::get('/posts/{id}', [PostsController::class, 'showpost']);

Route::post('/posts', [PostsController::class, 'storepost']);

Route::get('/posts/{id}/comments', [PostsController::class, 'getCommentByPost']);

Route::post('/posts/{id}', [PostsController::class, 'updatepost']);

Route::delete('/posts/{id}', [PostsController::class, 'destroypost']);

// Comments CRUD routes

Route::get('/comments', [CommentsController::class, 'index']);

// Route::get('posts/{id}/comments', [CommentsController::class, 'show']);

Route::post('/comments', [CommentsController::class, 'store']);

Route::put('/comments/{id}', [CommentsController::class, 'update']);

Route::delete('/comments/{id}', [CommentsController::class, 'destroy']);


// Private routes

Route::group(["middleware" => ['auth:sanctum']], function () {
    

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('verified')->name('logout');

    // Email Verification Notice Route 
    Route::get('/email/verify', [AuthController::class, 'verifyNotice'])->name('verification.notice');

    // Email Verification Handler Route 
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware('signed')->name('verification.verify');

    // Resending The Verification Email Route
    Route::post('/email/verification-notification', [AuthController::class, 'verifyHandler'])->middleware('throttle:6,1')->name('verification.send');



    

});