<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Mentorship;

class MentorshipController extends RestController
{

	protected $relationships = [
		"mentor",
		"mentee"
	];

	protected $attributes = [
		"id",
		"mentor_id",
		"mentee_id",
		"status"
	];

	protected $model = \App\Mentorship::class;

}
