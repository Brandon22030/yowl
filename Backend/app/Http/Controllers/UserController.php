<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Posts;

class UserController extends Controller
{
    public function index() {
        
        $users = User::all();
        
        return response()->json($users);
    
    }

    public function showUserPosts($id){

        $user = User::with('Posts')->findOrFail($id);

        return $user->Posts;

    }
    
    public function store(Request $request)
    {
    
        $user = new User;
    
        $user->name = $request->name;
    
        $user->email = $request->email;
    
        $user->password = Hash::make($request->password);
    
        $user->save();
    
        return response()->json([
    
            "message" => "User created sucessfully."
    
        ], 201);
    
    }
    
    public function getPostByUser($id){

        $user = User::with('Posts')->findOrFail($id);

        return $user->Posts;

    }

    public function getCommentsByUser($id){

        $user = User::with('Comments')->findOrFail($id);

        return $user->Comments;

    }

    public function show($id)
    {
        $user = User::find($id);
        if(!empty($user))
        {
            return response()->json($user);
        }
        else
        {
            return response()->json([
                "message" => "User not found."
            ], 404);
        }
    }
    public function update(Request $request, $id)
    {
        if (User::where('id', $id)->exists()){
            $user = User::find($id);
            $user->name = is_null($request->name) ? $user->name : $request->name;
            $user->email = is_null($request->email) ? $user->email : $request->email;
            $user->password = is_null($request->password) ? $user->password : $request->password;
            $user->save();
            return response()->json([
                "message" => "User Updated."
            ], 404); 
        }else{
            return response()->json([
                "message" => "User not found."
            ], 404); 
        }
    }
    public function destroy($id)
    {
        if(User::where('id', $id)->exists()) {
            $user = User::find($id);
            $user->delete();
            return response()->json([
                "message" => "User deleted sucessfully."
            ], 202); 
        } else {
            return response()->json([
                "message" => "User not found."
            ], 404); 
        }
    } 
}
