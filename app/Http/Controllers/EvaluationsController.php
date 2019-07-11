<?php

namespace App\Http\Controllers;

use App\Evaluation;
use Illuminate\Http\Request;

class EvaluationsController extends Controller
{
	const FIELDS = [
		'form:id,title,type,visibility',
		'subject:id,first_name,last_name,type,training_level,secondary_training_level',
		'evaluator:id,first_name,last_name,type,training_level,secondary_training_level',
		'requestor:id,first_name,last_name,type,training_level,secondary_training_level'
	];

	public function __construct() {
		$this->middleware(['auth', 'type:admin']);
	}
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
		return Evaluation::with(self::FIELDS)->between($request->input('startDate'), $request->input('endDate'))->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Evaluation  $evaluation
     * @return \Illuminate\Http\Response
     */
    public function show(Evaluation $evaluation)
    {
		$evaluation->load(self::FIELDS);

		return $evaluation;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Evaluation  $evaluation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Evaluation $evaluation)
    {
		if (
			$request->has('status') && in_array($request->input('status'), [
				'complete',
				'pending',
				'canceled by admin',
				'disabled'
			])
		) {
			$evaluation->status = $request->input('status');
		}

		if (
			$request->has('visibility') && in_array($request->input('visibility'), [
				'default',
				'visible',
				'anonymous',
				'hidden',
				'under faculty threshold'
			])
		) {
			switch ($request->input('visibility')) {
			case 'default':
				$evaluation->visibility = null;
				break;
			case 'under faculty threshold':
				if ($evaluation->type == 'faculty') {
					$evaluation->visibility = $request->input('visibility');
				}
				break;
			default:
				$evaluation->visibility = $request->input('visibility');
				break;
			}
		}

		if ($request->has('evaluation_date_start')) {
			$evaluation->evaluation_date_start = $request->input('evaluation_date_start');
		}
		if ($request->has('evaluation_date_end')) {
			$evaluation->evaluation_date_end = $request->input('evaluation_date_end');
		}

		$evaluation->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Evaluation  $evaluation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evaluation $evaluation)
    {
        //
    }
}
