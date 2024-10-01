<?php

namespace App\Http\Controllers;
use App\Models\Comments;
use Illuminate\Http\Request;
use Carbon\Carbon;


class CommentsController extends Controller
{
    public function index()
    {
       return Comments::all();
        
    }

    public function store(Request $request){
        $comments=new Comments;
        $comments->content=$request->content;
        $comments->user_id=$request->user_id;
        $comments->posts_id=$request->posts_id;

        $comments->save();
        return response()->json([
            'message'=>'Comment Added.',
            'comment' => $comments,
            "minutes"=> $comments->created_at->diffForHumans(),
        ],201);
    }

    public function show($id){
        $comments=Comments::find($id);
        if(!empty($comments))
        {
            return response()->json($comments);
        }
        else
        {
            return response()->json([
                "message"=>"Comment not found"
            ],404);
        }
    }
    public function update(Request $request, $id){
        if(Comments::where('id',$id)->exists()){
            $comments=Comments::find($id);
            $comments->content=is_null($request->content) ? $comments->content : $request->content;
            $comments->save();
            return response()->json([
                "message"=>"Comment Added"
            ],400);
        }else{
            return response()->json([
                "message"=>"Comment not found"
            ],404);
        }
    }
    public function destroy($id){
        if(Comments::where('id',$id)->exists()){
            $comments=Comments::find($id);
            $comments->delete();
            
            return response()->json([
                "message"=>"Comment delete."
            ],202);
        }else{
            return response()->json([
                "message"=>"Comment not found"
            ],404);
        }
    }
}
