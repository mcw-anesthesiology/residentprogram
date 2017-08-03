<template>
	<div class="container body-block">
		<div class="controls-row row">
			<div class="col-sm-4 col-sm-offset-3">
				<label class="containing-label">
					Academic year
					<academic-year-selector v-model="dates"
						:min-date="meritsReleaseDate" />
				</label>
			</div>
			<div v-show="usersWithMerits" class="col-sm-3">
				<button type="button" class="labelless-button btn btn-default"
						@click="getCsv">
					Export CSV
				</button>
			</div>
		</div>

		<div v-if="usersWithMerit">
			<component-list :fields="['full_name']"
					:items="usersWithMerit"
					:paginate="false"
					reloadable
					@reload="fetchUsersWithMerits">
				<template scope="meritUser">
					<user-with-scholarly-activity-list-item
						v-bind="meritUser" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import UsersWithMeritReport from './UsersWithMeritReport.vue';
import UserWithScholarlyActivityListItem from 'vue-components/MeritCompensation/UserWithScholarlyActivityListItem.vue';



export default {
	extends: UsersWithMeritReport,

	methods: {
		getCsv() {
			// TODO
			alert('TODO');
		}
	},

	components: {
		UserWithScholarlyActivityListItem
	}
};
</script>
