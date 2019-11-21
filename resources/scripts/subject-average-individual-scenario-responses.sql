select
	subject_id as "Trainee ID",
	last_name as "Last name",
	first_name as "First name",
	users.training_level as "Training level",
	avg(scenario_responses.value) as "IPA score average",
	avg(case when scenario_difficulty='BEGINNER' then scenario_responses.value else null end) as "Basic IPA score average",
	avg(case when scenario_difficulty='ADVANCED' then scenario_responses.value else null end) as "Advanced IPA score average",
	avg(beyond_milestones.professionalism_responses.value) as "Professionalism response average",
	avg(case when competencies.id is not null then responses.response else null end) as "Overall Milestone average",
	avg(case when competencies.id=1 then responses.response else null end) as "Systems Based Practice average",
	avg(case when competencies.id=2 then responses.response else null end) as "Practice Based Learning average",
	avg(case when competencies.id=3 then responses.response else null end) as "Professionalism average",
	avg(case when competencies.id=4 then responses.response else null end) as "Medical Knowledge average",
	avg(case when competencies.id=5 then responses.response else null end) as "Patient Care average",
	avg(case when competencies.id=6 then responses.response else null end) as "Communication average",
	count(distinct evaluations.id) as "# evaluations"
from
	evaluations
join users
	on evaluations.subject_id = users.id
join beyond_milestones.scenario_responses
	on beyond_milestones.scenario_responses.evaluation_id = evaluations.id
join beyond_milestones.scenarios
	on beyond_milestones.scenarios.id = beyond_milestones.scenario_responses.scenario_id
join beyond_milestones.professionalism_responses
	on professionalism_responses.evaluation_id = evaluations.id

join forms on evaluations.form_id = forms.id
join responses on responses.evaluation_id = evaluations.id
join competencies_questions on competencies_questions.form_id = forms.id and competencies_questions.question_id = responses.question_id
join competencies on competencies.id = competencies_questions.competency_id

where beyond_milestones.scenario_responses.deleted_at is null
group by subject_id
order by last_name, first_name asc
