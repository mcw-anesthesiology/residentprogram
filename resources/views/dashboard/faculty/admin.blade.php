<div class="container body-block">
	<h2 class="sub-header">Faculty Evaluations</h2>
	<academic-year-evaluation-data-table :thead="facultyEvalsThead"
		:config="facultyEvalsConfig"></academic-year-evaluation-data-table>
</div>

@push('scripts')
	<script>
		createAdminFacultyDashboard('main');
	</script>
@endpush
