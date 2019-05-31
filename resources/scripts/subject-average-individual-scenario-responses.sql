select
	subject_id as trainee_id,
	last_name,
	first_name,
	users.training_level,
	avg(scenario_responses.value) as scenario_avg,
	avg(case when scenario_difficulty='BEGINNER' then scenario_responses.value else null end) as basic_scenario_response_avg,
	avg(case when scenario_difficulty='ADVANCED' then scenario_responses.value else null end) as advanced_scenario_response_avg,
	avg(beyond_milestones.professionalism_responses.value) as professionalism_response_avg,
	avg(case when competencies.id is not null then responses.response else null end) as overall_competency_avg,
	avg(case when competencies.id=1 then responses.response else null end) as systems_based_practice_avg,
	avg(case when competencies.id=2 then responses.response else null end) as practice_based_learning_avg,
	avg(case when competencies.id=3 then responses.response else null end) as professionalism_avg,
	avg(case when competencies.id=4 then responses.response else null end) as medical_knowledge_avg,
	avg(case when competencies.id=5 then responses.response else null end) as patient_care_avg,
	avg(case when competencies.id=6 then responses.response else null end) as communication_avg,
	count(distinct evaluations.id) as num_evaluations
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
