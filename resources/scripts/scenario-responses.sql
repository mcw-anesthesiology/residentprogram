select
	subject_id as "Trainee ID",
	last_name as "Last name",
	first_name as "First name",
	users.training_level as "Training level",
	scenario_responses.value as "IPA score response",
	UNIX_TIMESTAMP(evaluations.complete_date) as "Evaluation completion timestamp"
from
	evaluations
join users
	on evaluations.subject_id = users.id
join beyond_milestones.scenario_responses
	on beyond_milestones.scenario_responses.evaluation_id = evaluations.id
join beyond_milestones.scenarios
	on beyond_milestones.scenarios.id = beyond_milestones.scenario_responses.scenario_id

where evaluations.status = 'complete'
	and beyond_milestones.scenario_responses.deleted_at is null
order by last_name, first_name
