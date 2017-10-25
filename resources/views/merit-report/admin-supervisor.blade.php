<div id="admin-supervisor-merit-reports-container">
	<div class="container body-block">
		<h2>All merit reports</h2>
		<div v-if="usersWithReports">
			<component-list :fields="['full_name']"
					:items="usersWithReports"
					:paginate="false"
					reloadable
					@reload="handleReload">
				<template slot-scope="reportUser">
					<user-with-merit-report-list-item v-bind="reportUser"
						:user="user"
						@change="handleReload"
						@close="handleClose"
						@view-report="viewReport(arguments[0])"
						@view-summary="viewReportSummary(arguments[0])">
					</user-with-merit-report-list-item>
				</template>
			</component-list>
		</div>

		<alert-list v-model="alerts"></alert-list>
	</div>

</div>
