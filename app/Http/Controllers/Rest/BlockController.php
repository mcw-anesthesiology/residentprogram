<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;


class BlockController extends RestController
{

	protected $relationships = [];

	protected $attributes = [
		'year',
		'block_number',
		'block_name',
		'start_date',
		'end_date'
	];

	protected $model = \App\Block::class;

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->except(['index', 'show']);
	}
}
