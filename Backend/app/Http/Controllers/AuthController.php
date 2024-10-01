<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use PersonalAccessToken;


class Authcontroller extends Controller
{

    public function register(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'birthdate' => 'required|numeric',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            'password' => Hash::make($request->password)
        ]);

        Auth::login($user);

        event(new Registered($user));

        return response()->json(["user" => $user], 201);
    }


    // Email Verification Notice Route 
    public function verifyNotice(){

        return view('auth.verify-email');

    }

    // Email Verification Handler Route 
    public function verifyEmail(EmailVerificationRequest $request) {
        $request->fulfill();

        return redirect()->route('logout');
    }


    // Resending The Verification Email Route
    public function verifyHandler(Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('message', 'Verification link sent!');
    }


    // LOGIN FUNCTIION
    public function login(Request $request)
    {
        
        $user = User::where('email',  $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
        
            return response()->json([
                // "success" => $user->hasVerifiedEmail(),
                'message' => ['Username or password incorrect'],
        
            ]);


        
        }

        $user->tokens()->delete();

        $user->markEmailAsVerified();

        return response()->json([

            // "success" => $user->hasVerifiedEmail(),

            'status' => 'success',

            'message' => 'User logged in successfully',

            'user' => $user,

            'token' => $user->createToken('auth_token')->plainTextToken,

        ]);

    }

    // LOGOUT FUNCTION
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(

            [

                'status' => 'success',

                'message' => 'User logged out successfully'

            ]

        );
    }
}