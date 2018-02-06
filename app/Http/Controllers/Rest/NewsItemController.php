<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Auth;

use Carbon\Carbon;

use App\NewsItem;
use App\UserNewsItem;

class NewsItemController extends RestController
{

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')
			->except([
				'unseen',
				'dismiss',
				'temporarilyDismiss'
			]);
	}

	protected $model = \App\NewsItem::class;

	public function unseen() {
		$user = Auth::user();
		$now = Carbon::now();

		return NewsItem::where(function ($query) use ($user) {
				$query->whereNull('audience')->orWhereIn('audience', [
					'all',
					$user->type,
					$user->specific_type
				]);
			})->whereDoesntHave('userNewsItems', function ($query) use ($user, $now) {
				$query->where('user_id', $user->id)
					->whereNotNull('dismissed_at')
					->orWhere('temporarily_dismiss_until', '<', $now);
			})->get();
	}

	public function dismiss($id) {
		$newsItem = NewsItem::findOrFail($id);

		$userNewsItem = UserNewsItem::updateOrCreate([
			'user_id' => Auth::id(),
			'news_item_id' => $id
		], [
			'dismissed_at' => Carbon::now()
		]);

		return 'success';
	}

	public function temporarilyDismiss($id) {
		$newsItem = NewsItem::findOrFail($id);

		$userNewsItem = UserNewsItem::updateOrCreate([
			'user_id' => Auth::id(),
			'news_item_id' => $id
		], [
			// FIXME: Make this customizable
			'temporarily_dismiss_until' => Carbon::now()->addHours(6)
		]);

		return 'success';
	}
}
