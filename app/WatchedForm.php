<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WatchedForm extends Model
{
    protected $table = 'watched_forms';

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'form_id' => 'integer'
    ];

    protected $fillable = ['user_id', 'form_id'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function form(){
        return $this->belongsTo('App\Form');
    }
}
