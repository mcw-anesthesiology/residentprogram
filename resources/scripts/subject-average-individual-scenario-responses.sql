select
	subject_id,
	last_name,
	first_name,
	scenario_difficulty,
	avg(scenario_responses.value) as scenario_response_avg,
	count(scenario_responses.value) as num_responses
from
	evaluations
join users
	on evaluations.subject_id = users.id
join beyond_milestones.scenario_responses
	on beyond_milestones.scenario_responses.evaluation_id = evaluations.id
join beyond_milestones.scenarios
	on beyond_milestones.scenarios.id = beyond_milestones.scenario_responses.scenario_id
where beyond_milestones.scenario_responses.deleted_at is null
group by subject_id, scenario_difficulty
order by last_name, first_name asc