<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-inbox"></span>
		Requests
	</h2>
	<evaluation-data-table range="allTime"
		:thead="pendingSubjectThead"
		:config="pendingSubjectConfig">
	</evaluation-data-table>
</div>

<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-check"></span>
		Completed evaluations
	</h2>
	<evaluation-data-table :thead="completeThead"
		:config="completeConfig">
	</evaluation-data-table>
</div>

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!}
		};

		createAPPDashboard('main', propsData);
	</script>
@endpush
