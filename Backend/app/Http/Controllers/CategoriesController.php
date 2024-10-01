<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use App\Models\Posts;
use Carbon\Carbon;
use Faker\Provider\Image;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
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

    public function index()
    {

        return Categories::all();
    }

    public function showPosts($id)
    {

        $category = Categories::withCount('Posts')->findOrFail($id);

        return response()->json([

            $category,

            "PostCount" => $category->posts_count

        ]);
    }

    public function store(Request $request)
    {

        $request->validate([

            'name' => 'required',

        ]);


        $imageUrl = $this->uploadImages($request->file('image'), '/images');

        $categories = new Categories();

        $categories->name = $request->name;

        $categories->image = $imageUrl;

        $categories->user_id = $request->user_id;

        $categories->save();

        return response()->json('You have successfully upload image.');


        return response()->json('File not found');
    }

    public function show($id)
    {

        $category = Categories::find($id);

        if (!empty($category)) {

            return response()->json($category);
        } else {

            return response()->json([

                "message" => "Category not found."

            ], 404);
        }
    }

    public function update(Request $request, $id)
    {

        if (Categories::where('id', $id)->exists()) {

            $request->validate([

                'name' => 'required',

                'image' => 'required'

            ]);

            $category = Categories::find($id);

            $category->update([

                'name' => $request->name,

                'image' => $request->image,

                'user_id' => auth()->id()

            ]);

            return response()->json([

                "message" => "Category Udpated."

            ], 404);
        } else {

            return response()->json([

                "message" => "Book Not Found."

            ], 404);
        }
    }

    public function destroy($id)
    {

        if (Categories::where('id', $id)->exists()) {

            $category = Categories::find($id);

            $category->delete();

            return response()->json([

                "message" => "Category deleted."

            ], 404);

            $category->delete();
        } else {

            return response()->json([

                "message" => "Category not found."

            ], 404);
        }
    }
}
