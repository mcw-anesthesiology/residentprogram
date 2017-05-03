<div class="container body-block">

	<div v-if="usersWithReports">
		<component-list :fields="['full_name']" :items="usersWithReports"
				:paginate="false">
			<template scope="user">
				<user-with-merit-report-list-item v-bind="user">
				</user-with-merit-report-list-item>
			</template>
		</component-list>
	</div>

	<alert-list v-model="alerts"></alert-list>
</div>


@push('scripts')
	<script>
		createAdminSupervisorMeritReports('main', propsData);
	</script>
@endpush
