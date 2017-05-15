<div id="admin-supervisor-merit-reports-container">
	<div class="container body-block">

		<div v-if="usersWithReports">
			<component-list :fields="['full_name']"
					:items="usersWithReports"
					:paginate="false"
					reloadable
					@reload="fetchUsersWithReports">
				<template scope="user">
					<user-with-merit-report-list-item v-bind="user">
					</user-with-merit-report-list-item>
				</template>
			</component-list>
		</div>

		<alert-list v-model="alerts"></alert-list>
	</div>

</div>

@push('scripts')
	<script>
		createAdminSupervisorMeritReports(
			'#admin-supervisor-merit-reports-container',
			propsData
		);
	</script>
@endpush
