<div id="admin-supervisor-merit-reports-container">
	<div class="container body-block">
		<h2>All merit reports</h2>
		<div v-if="usersWithReports">
			<component-list :fields="['full_name']"
					:items="usersWithReports"
					:paginate="false"
					reloadable
					@reload="fetchUsersWithReports">
				<template scope="reportUser">
					<user-with-merit-report-list-item v-bind="reportUser"
						:user="user" @change="fetchUsersWithReports"
						@view-report="$emit('view-report', ...arguments)">
					</user-with-merit-report-list-item>
				</template>
			</component-list>
		</div>

		<alert-list v-model="alerts"></alert-list>
	</div>

</div>
