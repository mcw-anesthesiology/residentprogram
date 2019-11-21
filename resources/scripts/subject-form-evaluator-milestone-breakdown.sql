select
	forms.title as "Evaluation form",
	concat(users.last_name, ", ", users.first_name) as "Trainee",
	users.training_level as "Current training level",
	concat("Faculty #", evaluator_id) as "Evaluator",
	milestones.title as "Milestone",
	count(DISTINCT responses.id) as "Number of responses",
	avg(responses.response) as "Milestone average",
	avg(beyond_milestones.scenario_responses.value) as "Overall IPA score average",
	avg(case when scenario_difficulty='BEGINNER' then scenario_responses.value else null end) as "Basic IPA score average",
	avg(case when scenario_difficulty='ADVANCED' then scenario_responses.value else null end) as "Advanced IPA score average"
from
	evaluations
join forms on evaluations.form_id = forms.id
join users on users.id = evaluations.subject_id
join beyond_milestones.scenario_responses
	on beyond_milestones.scenario_responses.evaluation_id = evaluations.id
join beyond_milestones.scenarios
	on beyond_milestones.scenarios.id = beyond_milestones.scenario_responses.scenario_id
join milestones_questions on forms.id = milestones_questions.form_id
join milestones on milestones.id = milestones_questions.milestone_id
join responses on responses.evaluation_id = evaluations.id and responses.question_id=milestones_questions.question_id
where evaluations.status = 'complete'
group by users.id, forms.id, milestones.id, evaluator_id
order by forms.title, users.last_name, users.first_name, evaluator_id, milestones.title
