<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Posts;
use Carbon\Carbon;
use App\Models\Comments;
use Illuminate\Support\Facades\Storage;


class PostsController extends Controller
{

    protected function uploadImages($file, $path)
    {
        $date = Carbon::now();

        $filePath = $path . "/$date->year";

        $filename = $date->timestamp . '_' . $file->getClientOriginalName();

        return $file->storeAs(

            $filePath,
            $filename,
            'public'

        );
    }

    //Post's CRUD
    public function index()

    {
        return Posts::all();

        // return response()->json($posts);
    }

    public function storepost(Request $request)
    {

        $imageUrl = $this->uploadImages($request->file('image'), '/images');

        $posts = new Posts();

        $posts->title = $request->title;

        $posts->image = $imageUrl;

        $posts->content = $request->content;

        $posts->linked_url = $request->linked_url;

        $posts->categories_id = $request->categories_id;

        $posts->user_id = $request->user_id;

        $posts->save();

        return response()->json('You have successfully upload image.');

        return response()->json('File not found');
    }

    public function showpost($id)
    {
        $post = Posts::find($id);
        if (!empty($post)) {
            $post->views++;
            $post->save();
            return $post;

        } else {
            return response()->json(["message" => "Post not found"], 404);
        }
    }

    public function getCommentByPost($id)
    {
        $post = Posts::with('Comments')->findOrFail($id);

        return $post->Comments;
    }

    public function updatepost(Request $request, $id)
    {

        $imageUrl = $this->uploadImages($request->file('image'), '/images');

        if (Posts::where('id', $id)->exists()) {
            
            $post = Posts::find($id);
            
            $post->title = is_null($request->title) ? $post->title : $request->title;
            
            $post->image = is_null($request->image) ? $post->image : $imageUrl;
            
            $post->content = is_null($request->content) ? $post->content : $request->content;
            
            $post->linked_url = is_null($request->linked_url) ? $post->linked_url : $request->linked_url;
            
            $post->categories_id = is_null($request->categories_id) ? $post->categories_id : $request->categories_id;
            
            $post->user_id = is_null($request->user_id) ? $post->user_id : $request->user_id;
            
            $post->save();
            
            return response()->json([
            
                "message" => "Post updated."
            
            ], 201);
        
        } else {
        
            return response()->json([
        
                "message" => "Post not found."
        
            ], 404);
        
        }
    
    }

    public function destroypost($id)
    {
        if (Posts::where('id', $id)->exists()) {
            $posts = Posts::find($id);
            $posts->delete();

            return response()->json([
                "message" => "Post deleted."
            ], 202);
        } else {
            return response()->json([
                "message" => "Post deleted."
            ], 404);
        }
    }
}