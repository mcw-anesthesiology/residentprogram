<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    protected $table = 'news_items';

	protected $casts = [
		'id' => 'integer'
	];

	protected $fillable = [
		'heading',
		'body',
		'audience'
	];

	public function userNewsItems() {
		return $this->hasMany('App\UserNewsItem');
	}
}
