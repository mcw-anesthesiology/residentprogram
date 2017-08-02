<template>
	<div>
		<div v-if="usersWithMerits" class="container body-block">
			<component-list :fields="['full_name']"
					:items="usersWithMerits"
					:paginate="false"
					reloadable
					@reload="fetchUsersWithMerits">
				<template scope="meritUser">
					<user-with-merit-publications-list-item
						v-bind="meritUser" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import ComponentList from 'vue-components/ComponentList.vue';
import UserWithMeritPublicationsListItem from 'vue-components/MeritCompensation/UserWithMeritPublicationsListItem.vue';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	data() {
		return {
			usersWithMerits: null
		};
	},

	mounted() {
		this.fetchUsersWithMerits();
	},

	methods: {
		fetchUsersWithMerits() {
			fetch('/merits/by-user', {
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(usersWithMerits => {
				this.usersWithMerits = usersWithMerits;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching merits'
				});
			});
		}
	},

	components: {
		ComponentList,
		UserWithMeritPublicationsListItem
	}
};
</script>
