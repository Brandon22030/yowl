<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;


    protected $fillable = [

        'content',
        'user_id',
        'post_id'

    ];

    public function post() {

        return $this->belongsTo(posts::class);

    }

    // public function interactions() {

    //     return $this->hasMany(interactions::class);

    // }
}
