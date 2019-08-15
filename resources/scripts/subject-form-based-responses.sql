select
	form_id, forms.title,
	users.id, users.last_name, users.first_name,
	count(DISTINCT evaluations.id) as num_evals,
	avg(responses.response) as response_avg,
	avg(beyond_milestones.scenario_responses.value) as scenario_avg,
	avg(case when scenario_difficulty='BEGINNER' then scenario_responses.value else null end) as basic_scenario_response_avg,
	avg(case when scenario_difficulty='ADVANCED' then scenario_responses.value else null end) as advanced_scenario_response_avg,
from
	evaluations
join responses on responses.evaluation_id = evaluations.id
join forms on evaluations.form_id = forms.id
join users on users.id = evaluations.subject_id
join beyond_milestones.scenario_responses
	on beyond_milestones.scenario_responses.evaluation_id = evaluations.id
join beyond_milestones.scenarios
	on beyond_milestones.scenarios.id = beyond_milestones.scenario_responses.scenario_id
where evaluations.status = 'complete'
group by users.id, forms.id
order by forms.title asc
