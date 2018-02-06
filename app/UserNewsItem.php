<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserNewsItem extends Model
{
    protected $table = 'user_news_items';

	protected $fillable = [
		'user_id',
		'news_item_id',
		'dismissed_at',
		'temporarily_dismissed_at'
	];

	protected $casts = [
		'id' => 'integer',
		'user_id' => 'integer',
		'news_item_id' => 'integer'
	];

	protected $dates = [
		'dismissed_at',
		'temporarily_dismissed_at'
	];

	public function newsItem() {
		return $this->belongsTo('App\NewsItem');
	}

	public function user() {
		return $this->belongsTo('App\User');
	}
}
