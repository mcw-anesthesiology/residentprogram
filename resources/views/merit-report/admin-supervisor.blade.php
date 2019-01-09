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

	<div class="container body-block">
		<h2>Create checklist</h2>
		<form @submit="createUserReport">
			<div class="form-group">
				<label class="containing-label">
					Checklist period
					<academic-year-selector v-model="createDates"></academic-year-selector>
				</label>
			</div>
			<div class="form-group">
				<label class="containing-label">
					User
					<select-two v-model="userToCreateReport"
						:options="usersWithoutReportsOptions"
					></select-two>
				</label>
			</div>

			<button type="submit" class="btn btn-primary"
				:disabled="!userToCreateReport"
			>
				Create report
			</button>
		</form>
	</div>
</div>
