SELECT 
	evaluations.id as EvaluationID,
	subject_id as StudentID,
	evaluator_id as FacultyID,
	complete_date as DOS,
	evaluation_date_start as EvaluationPeriodStartDate,
	evaluation_date_end as EvaluationPeriodEndDate,
	'' as ResidencyStart,

	ob_b.response_avg as OBbas,
	ob_a.response_avg as OBadv,
	raaps_b.response_avg as RAAPSbas,
	raaps_a.response_avg as RAAPSadv,
	trauma_b.response_avg as TRAUMAbas,
	trauma_a.response_avg as TRAUMAadv,
	icu_b.response_avg as ICUbas,
	icu_a.response_avg as ICUadv,
	general_b.response_avg as GENERALbas,
	general_a.response_avg as GENERALadv,
	neuro_b.response_avg as NEURObas,
	neuro_a.response_avg as NEUROadv,
	peds_b.response_avg as PEDSbas,
	peds_a.response_avg as PEDSadv,

	c1.response_avg as Communication1,
	c2.response_avg as Communication2,
	c3.response_avg as Communication3,
	sbp1.response_avg as SystemsBasedPractice1,
	sbp2.response_avg as SystemsBasedPractice2,
	mk1.response_avg as MedicalKnowledge1,
	pro1.response_avg as Professionalism1,
	pro2.response_avg as Professionalism2,
	pro3.response_avg as Professionalism3,
	pro4.response_avg as Professionalism4,
	pro5.response_avg as Professionalism5,
	handoffs.response_avg as Handoffs,
	pbl3.response_avg as PracticeBasedLearning3,
	pbl4.response_avg as PracticeBasedLearning4,
	pc1a.response_avg as PatientCare1a,
	pc1b.response_avg as PatientCare1b,
	pc2.response_avg as PatientCare2,
	pc3.response_avg as PatientCare3,
	pc4.response_avg as PatientCare4,
	pc5.response_avg as PatientCare5,
	pc6.response_avg as PatientCare6,
	pc7.response_avg as PatientCare7,
	pc8a.response_avg as PatientCare8a,
	pc8b.response_avg as PatientCare8b,
	pc9a.response_avg as PatientCare9a,
	pc9b.response_avg as PatientCare9b,
	pc10a.response_avg as PatientCare10a
from evaluations
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 21
		group by evaluation_id
	) c1 on evaluations.id = c1.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 22
		group by evaluation_id
	) c2 on evaluations.id = c2.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 23
		group by evaluation_id
	) c3 on evaluations.id = c3.evaluation_id


	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 28
		group by evaluation_id
	) sbp1 on evaluations.id = sbp1.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 29
		group by evaluation_id
	) sbp2 on evaluations.id = sbp2.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 15
		group by evaluation_id
	) mk1 on evaluations.id = mk1.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 16
		group by evaluation_id
	) pro1 on evaluations.id = pro1.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 17
		group by evaluation_id
	) pro2 on evaluations.id = pro2.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 18
		group by evaluation_id
	) pro3 on evaluations.id = pro3.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 19
		group by evaluation_id
	) pro4 on evaluations.id = pro4.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 20
		group by evaluation_id
	) pro5 on evaluations.id = pro5.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 36
		group by evaluation_id
	) handoffs on evaluations.id = handoffs.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 26
		group by evaluation_id
	) pbl3 on evaluations.id = pbl3.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 27
		group by evaluation_id
	) pbl4 on evaluations.id = pbl4.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 3
		group by evaluation_id
	) pc1a on evaluations.id = pc1a.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 6
		group by evaluation_id
	) pc2 on evaluations.id = pc2.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 4
		group by evaluation_id
	) pc3 on evaluations.id = pc3.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 5
		group by evaluation_id
	) pc4 on evaluations.id = pc4.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 2
		group by evaluation_id
	) pc5 on evaluations.id = pc5.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 10
		group by evaluation_id
	) pc6 on evaluations.id = pc6.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 7
		group by evaluation_id
	) pc7 on evaluations.id = pc7.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 9
		group by evaluation_id
	) pc1b on evaluations.id = pc1b.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 8
		group by evaluation_id
	) pc8a on evaluations.id = pc8a.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 1
		group by evaluation_id
	) pc8b on evaluations.id = pc8b.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 11
		group by evaluation_id
	) pc9a on evaluations.id = pc9a.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 12
		group by evaluation_id
	) pc9b on evaluations.id = pc9b.evaluation_id
	left join (	
		select evaluation_id, avg(response) as response_avg
		from responses
			join evaluations on responses.evaluation_id = evaluations.id
			join milestones_questions on milestones_questions.question_id = responses.question_id
				and milestones_questions.form_id = evaluations.form_id
		where responses.evaluation_id  = evaluations.id
			and milestone_id = 13
		group by evaluation_id
	) pc10a on evaluations.id = pc10a.evaluation_id

	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 1
		group by evaluation_id
	) ob_b on evaluations.id = ob_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 2
		group by evaluation_id
	) ob_a on evaluations.id = ob_a.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 13
		group by evaluation_id
	) raaps_b on evaluations.id = raaps_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 14
		group by evaluation_id
	) raaps_a on evaluations.id = raaps_a.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 7
		group by evaluation_id
	) trauma_b on evaluations.id = trauma_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 8
		group by evaluation_id
	) trauma_a on evaluations.id = trauma_a.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 3
		group by evaluation_id
	) icu_b on evaluations.id = icu_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 4
		group by evaluation_id
	) icu_a on evaluations.id = icu_a.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 10
		group by evaluation_id
	) general_b on evaluations.id = general_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 11
		group by evaluation_id
	) general_a on evaluations.id = general_a.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 5
		group by evaluation_id
	) neuro_b on evaluations.id = neuro_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 6
		group by evaluation_id
	) neuro_a on evaluations.id = neuro_a.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 9
		group by evaluation_id
	) peds_b on evaluations.id = peds_b.evaluation_id
	left join (
		select evaluation_id, avg(value) as response_avg
		from beyond_milestones.scenario_responses sr
		where scenario_id = 10
		group by evaluation_id
	) peds_a on evaluations.id = peds_a.evaluation_id
where evaluations.status = 'complete'
	and exists (select 1 from beyond_milestones.scenario_responses sr where sr.evaluation_id = evaluations.id)
group by evaluations.id
