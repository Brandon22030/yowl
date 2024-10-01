<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Posts;

class Categories extends Model
{
    use HasFactory;

    protected $categories = 'categories';

    protected $fillable = [

        'name',
        'image',
        'user_id'

    ];

    public function user() {

        return $this->belongsTo(User::class);

    }

    public function posts() {

        return $this->hasMany(posts::class);

    }

}
