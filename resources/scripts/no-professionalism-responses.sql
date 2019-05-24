select subjects.first_name as subject_first, subjects.last_name as subject_last, evaluators.first_name as evaluators_first, evaluators.last_name as evaluators_last, evaluation_id, 'No' as response, text
from beyond_milestones.professionalism_responses
join beyond_milestones.professionalism_questions on professionalism_questions.id = professionalism_responses.question_id
join evaluations on professionalism_responses.evaluation_id = evaluations.id
join users as subjects on subjects.id = evaluations.subject_id
join users as evaluators on evaluators.id = evaluations.evaluator_id
where value = '0'
