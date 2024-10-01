<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comments;

class Posts extends Model
{
    use HasFactory;

    protected $posts = 'posts';

    protected $fillable = [

        'title',
        'image',
        'content',
        'linked_url',
        'category_id',
        'user_id'


    ];

    public function category()
    {

        return $this->belongsTo(Categories::class);
    }

    public function comments()
    {

        return $this->hasMany(comments::class);
    }

    public function user()
    {

        return $this->belongsTo(User::class);
    }

}
