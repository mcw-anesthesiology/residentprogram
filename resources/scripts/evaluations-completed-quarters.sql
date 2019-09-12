select last_name, first_name,
(
	select count(evaluations.id) from evaluations
	join users as subjects on subjects.id = evaluations.subject_id
	where evaluator_id=users.id and subjects.type = 'resident' and evaluations.training_level in ('intern', 'ca-1', 'ca-2', 'ca-3')
	and evaluations.complete_date >= '2019-01-01' and evaluations.complete_date < '2019-04-01'
) as `Evaluations Jan-May 2019`,
(
	select count(evaluations.id) from evaluations
	join users as subjects on subjects.id = evaluations.subject_id
	where evaluator_id=users.id and subjects.type = 'resident' and evaluations.training_level in ('intern', 'ca-1', 'ca-2', 'ca-3')
	and evaluations.complete_date >= '2019-04-01' and evaluations.complete_date < '2019-07-01'
) as `Evaluations Apr-Jun 2019`,
(
	select count(evaluations.id) from evaluations
	join users as subjects on subjects.id = evaluations.subject_id
	where evaluator_id=users.id and subjects.type = 'resident' and evaluations.training_level in ('intern', 'ca-1', 'ca-2', 'ca-3')
	and evaluations.complete_date >= '2019-07-01' and evaluations.complete_date < '2019-10-01'
) as `Evaluations July-Sep 2019`
from users where status = 'active' and type='faculty';

