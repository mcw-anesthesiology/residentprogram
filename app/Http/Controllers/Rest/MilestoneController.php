<?php

namespace App\Http\Controllers\Rest;

class MilestoneController extends RestController
{

	protected $relationships = [
		"milestonesQuestions",
		"levels",
		"forms"
	];

	protected $attributes = [
		"id",
		"title",
		"description"
	];

	protected $model = \App\Milestone::class;
}
