<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Auth;
use Log;
use Setting;

use App\MeritReport;
use App\MeritReportForm;

class CreateMyMeritChecklist
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $args The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
		$meritReportTypeForms = Setting::get('reportTypeForms');
		$formName = $meritReportTypeForms['faculty_yearly'];

		$meritForm = MeritReportForm::where('name', $formName)->orderBy('version', 'desc')->firstOrFail();
		$dates = MeritReport::getCurrentYear();

		$mr = MeritReport::firstOrCreate(
			[
				'user_id' => Auth::id(),
				'form_id' => $meritForm->id,
				'period_start' => $dates['startDate'],
				'period_end' => $dates['endDate']
			],
			[
				'status' => 'PENDING'
			]
		);

		Log::debug('Merit report', (array)$mr);

		return $mr;
    }
}
