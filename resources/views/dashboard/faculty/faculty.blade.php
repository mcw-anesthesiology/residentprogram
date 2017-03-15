<div id="user-faculty-evals" class="container body-block">
	<alert-list v-model="alerts"></alert-list>
@if($noEvaluations)
	<h2>You have no faculty evaluations</h2>
@else
	<h2 class="sub-header">Your Faculty Evaluations</h2>
	<evaluation-data-table :thead="facultyEvalsThead"
		:config="facultyEvalsConfig"></evaluation-data-table>
@endif
</div>

@if($user->usesFeature('FACULTY_EVALS'))
<div id="anonymous-faculty-evals" class="container body-block">
	<alert-list v-model="alerts"></alert-list>
	<h2 class="sub-header">All Faculty Evaluations</h2>
	<evaluation-data-table :thead="anonymousFacultyEvalsThead"
		:config="anonymousFacultyEvalsConfig"></evaluation-data-table>
</div>
@endif

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!}
		};
		
		createFacultyFacultyDashboard('#user-faculty-evals', propsData);
		createAnonymousFacultyDashboard('#anonymous-faculty-evals');
	</script>
@endpush
