<div class="container">
	<alert-list v-model="alerts"></alert-list>
</div>

<div id="user-faculty-evals">
	<div class="container body-block">
		<h2 class="sub-header">Your Faculty Evaluations</h2>
		<academic-year-evaluation-data-table :start-date="user.created_at"
			:thead="facultyEvalsThead" :config="facultyEvalsConfig">
		</academic-year-evaluation-data-table>
	</div>
	<div class="container body-block">
		<h2 class="sub-header">Your Faculty 360 Evaluations</h2>
		<academic-year-evaluation-data-table :start-date="user.created_at"
			:thead="faculty360Thead" :config="faculty360Config">
		</academic-year-evaluation-data-table>
	</div>
</div>

@if($user->usesFeature('FACULTY_EVALS'))
<div id="anonymous-faculty-evals">
	<div class="container body-block">
		<h2 class="sub-header">All Faculty Evaluations</h2>
		<academic-year-evaluation-data-table :start-date="user.created_at"
			:thead="anonymousFacultyEvalsThead"
			:config="anonymousFacultyEvalsConfig">
		</academic-year-evaluation-data-table>
	</div>

	<div class="container body-block">
		<h2 class="sub-header">All Faculty 360 Evaluations</h2>
		<academic-year-evaluation-data-table :start-date="user.created_at"
			:thead="anonymousFaculty360Thead"
			:config="anonymousFaculty360Config">
		</academic-year-evaluation-data-table>

	</div>
</div>
@endif

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!}
		};

		createFacultyFacultyDashboard('#user-faculty-evals', propsData);

@if($user->usesFeature('FACULTY_EVALS'))
		createAnonymousFacultyDashboard('#anonymous-faculty-evals', propsData);
@endif
	</script>
@endpush
